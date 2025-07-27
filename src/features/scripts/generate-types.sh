#!/bin/bash

INPUT_DIR=./src/features/assets/data
OUTPUT_DIR=./src/features/types/data

mkdir -p $OUTPUT_DIR

FILES=$(ls $INPUT_DIR/*.json)

for file in $FILES
do
  filename=$(basename "$file" .json)

  # ファイル名から種類を抽出（例: top, news, location）
  type=$(echo "$filename" | sed -E 's/all_rcms-api_3_//' | sed -E 's/_(ja|en)$//')
  capitalized=$(echo "${type:0:1}" | tr a-z A-Z)${type:1}
  typename="${capitalized}Item" # 例: TopItem, NewsItem

  echo "Generating $typename from $filename.json"

  npx quicktype "$file" \
    -o "$OUTPUT_DIR/$type.d.ts" \
    -l ts \
    --just-types \
    --top-level "$typename"

  # eslint-disable コメントを先頭に追加
  sed -i '' '1s/^/\/\* eslint-disable \*\/\n\n/' "$OUTPUT_DIR/$type.d.ts"
done
