// prefetch/index.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { ENDPOINTS } from '../constants/endpoints.js'

dotenv.config()
const ROOT_URL = process.env.NUXT_PUBLIC_API_BASE

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXPORT_BASE_PATH = path.join(
  __dirname,
  '..', '..', '..', 'shared', 'i18n', 'locales',
)

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
  const { errors, messages, list, pageInfo } = initialData
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

  return {
    errors,
    messages,
    list: [
      ...list,
      ...allList,
    ],
    pageInfo,
  }
}

(async () => {
  console.log('データのプリフェッチを開始します')

  for (const lang of LANGS) {
    const EXPORT_PATH = await createExportPath(lang)
    for (const { endpoint, key } of ENDPOINTS) {
      const data = await fetchAll(`${endpoint}?_lang=${lang}`)
      const i18nData = { [key]: Array.isArray(data) ? data[0] : data }
      // 通常のjson出力
      const fileName = `${key}.json`
      const filePath = path.join(EXPORT_PATH, fileName)
      await fs.writeFile(
        filePath,
        JSON.stringify(i18nData, null, 2),
        'utf-8',
      )
      console.log(`データを保存しました: ${filePath}`)

      // postの場合はcontents_type_slugごとに分割jsonも出力
      if (endpoint.includes('/post')) {
        const list = i18nData[key].list || []
        // slugごとにグループ化
        const group = {}
        for (const item of list) {
          const slug = item.contents_type_slug || 'unknown'
          if (!group[slug]) group[slug] = []
          group[slug].push(item)
        }
        for (const slug in group) {
          const catList = group[slug]
          const totalCnt = catList.length
          const perPage = i18nData[key].pageInfo.perPage
          const totalPageCnt = Math.ceil(totalCnt / perPage)
          const pageInfo = {
            ...i18nData[key].pageInfo,
            totalCnt,
            totalPageCnt,
            firstIndex: 1,
            lastIndex: Math.min(perPage, totalCnt),
            pageNo: 1,
            startPageNo: 1,
            endPageNo: totalPageCnt,
          }
          const postData = {
            [key]: {
              ...i18nData[key],
              list: catList,
              pageInfo,
            },
          }
          const postFileName = `${key}-${slug}.json`
          const postFilePath = path.join(EXPORT_PATH, postFileName)
          await fs.writeFile(
            postFilePath,
            JSON.stringify(postData, null, 2),
            'utf-8',
          )
          console.log(`カテゴリ別データを保存しました: ${postFilePath}`)
        }
      }
    }
  }

  console.log('全てのデータのプリフェッチが完了しました')
})()
