// prefetch/index.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()
const ROOT_URL = process.env.NUXT_PUBLIC_API_BASE

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXPORT_BASE_PATH = path.join(
  __dirname,
  '..', '..', '..', 'shared', 'i18n', 'locales',
)

const ENDPOINTS = [
  { endpoint: '/rcms-api/3/home', key: 'home' },
  { endpoint: '/rcms-api/3/about', key: 'about' },
]

const LANGS = ['ja', 'en']

const createExportPath = async (lang) => {
  const dir = path.join(EXPORT_BASE_PATH, lang)
  try {
    await fs.access(dir)
  }
  catch {
    await fs.mkdir(dir, { recursive: true })
  }
  return dir
}
const headers = {
  'x-rcms-api-access-token': process.env.NUXT_PUBLIC_STATIC_TOKEN,
}

async function fetchAll(endpoint) {
  const res = await fetch(
    `${ROOT_URL}${endpoint}`,
    { headers },
  )
  const text = await res.text()
  let initialData
  try {
    initialData = JSON.parse(text)
  }
  catch (e) {
    console.error('APIレスポンスがJSONではありません:', text)
    throw e
  }
  const { list, pageInfo } = initialData
  const totalPageCnt = pageInfo.totalPageCnt

  const promises = []
  for (let i = 2; i <= totalPageCnt; i++) {
    promises.push(
      fetch(
        `${ROOT_URL}${endpoint}&pageID=${i}`,
        { headers },
      ).then(async (res) => {
        const t = await res.text()
        try {
          return JSON.parse(t)
        }
        catch (e) {
          console.error('APIレスポンスがJSONではありません:', t)
          throw e
        }
      }),
    )
  }

  const allData = await Promise.all(promises)
  const allList = allData.map(data => data.list).flat()

  return [
    ...list,
    ...allList,
  ]
}

(async () => {
  console.log('データのプリフェッチを開始します')

  for (const lang of LANGS) {
    const EXPORT_PATH = await createExportPath(lang)
    for (const { endpoint, key } of ENDPOINTS) {
      const data = await fetchAll(`${endpoint}?_lang=${lang}`)
      const i18nData = { [key]: Array.isArray(data) ? data[0] : data }
      // ファイル名は about.json, home.json など
      const fileName = `${key}.json`
      const filePath = path.join(EXPORT_PATH, fileName)
      await fs.writeFile(
        filePath,
        JSON.stringify(i18nData, null, 2),
        'utf-8',
      )
      console.log(`データを保存しました: ${filePath}`)
    }
  }

  console.log('全てのデータのプリフェッチが完了しました')
})()
