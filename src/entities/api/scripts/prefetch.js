// prefetch/index.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()
const ROOT_URL = process.env.NUXT_PUBLIC_API_BASE

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXPORT_PATH = path.join(
  __dirname,
  '..',
  '..',
  '/api/data',
)

const LANGS = [
  'ja',
  'en',
]
const ENDPOINTS = [
  '/rcms-api/3/home',
]

const ALL_LIST_ENDPOINTS = LANGS.flatMap(lang => ENDPOINTS.map(endpoint => ({
  lang,
  endpoint: `${endpoint}?_lang=${lang}`,
  saveAs: `${endpoint.replaceAll(
    '/',
    '_',
  )}_${lang}`,
})))

const createExportPath = async () => {
  try {
    await fs.access(EXPORT_PATH)
  }
  catch (error) {
    console.error(
      'fetching error:',
      error,
    )
    await fs.mkdir(
      EXPORT_PATH,
      { recursive: true },
    )
  }
}

const headers = {
  'x-rcms-api-access-token': process.env.NUXT_PUBLIC_STATIC_TOKEN,
}

async function fetchAll(endpoint) {
  const initialData = await fetch(
    `${ROOT_URL}${endpoint}`,
    { headers },
  ).then(res => res.json())
  const { list, pageInfo } = initialData
  const totalPageCnt = pageInfo.totalPageCnt

  const promises = []
  for (let i = 2; i <= totalPageCnt; i++) {
    promises.push(fetch(
      `${ROOT_URL}${endpoint}&pageID=${i}`,
      { headers },
    ).then(res => res.json()))
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

  await createExportPath()

  for (const { endpoint, saveAs } of ALL_LIST_ENDPOINTS) {
    const data = await fetchAll(endpoint)
    const filePath = path.join(
      EXPORT_PATH,
      `all${saveAs}.json`,
    )
    await fs.writeFile(
      filePath,
      JSON.stringify(
        data,
        null,
        2,
      ),
      'utf-8',
    )
    console.log(`データを保存しました: ${filePath}`)
  }

  console.log('全てのデータのプリフェッチが完了しました')
})()
