// prefetch/index.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// 環境変数の読み込み
dotenv.config()
const ROOT_URL = process.env.NUXT_PUBLIC_API_BASE

// ファイルパスの設定
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXPORT_PATH = path.join(
  __dirname,
  '..',
  'assets',
  'data',
)

// ② 対応言語とエンドポイントを定義 → 拡張構造で準備
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

// エクスポート先ディレクトリの作成
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

// 共通ヘッダー
const headers = {
  'x-rcms-api-access-token': process.env.NUXT_PUBLIC_STATIC_TOKEN,
}

// APIデータを取得する関数
async function kurocoAPIAll(endpoint) {
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

// メイン処理
(async () => {
  console.log('データのプリフェッチを開始します')

  await createExportPath()

  // ③ 言語別にファイル保存処理
  for (const { endpoint, saveAs } of ALL_LIST_ENDPOINTS) {
    const data = await kurocoAPIAll(endpoint)
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
