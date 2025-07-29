#!/bin/bash

INPUT_DIR=./src/entities/api/data
OUTPUT_DIR=./src/entities/api/model

mkdir -p $OUTPUT_DIR

# endpoint名だけ抽出（home, about など）
TYPES=$(ls $INPUT_DIR/*.json | sed -E 's/.*\/([a-z]+)-(ja|en)\.json/\1/' | sort | uniq)

for type in $TYPES
do
  # どちらかの言語ファイルを型生成に使う（ja優先、なければen）
  if [ -f "$INPUT_DIR/$type-ja.json" ]; then
    file="$INPUT_DIR/$type-ja.json"
  else
    file="$INPUT_DIR/$type-en.json"
  fi

  capitalized=$(echo "${type:0:1}" | tr a-z A-Z)${type:1}
  typename="${capitalized}Item" # 例: HomeItem, AboutItem

  echo "Generating $typename from $(basename "$file")"

  npx quicktype "$file" \
    -o "$OUTPUT_DIR/$type.d.ts" \
    -l ts \
    --just-types \
    --top-level "$typename"

  # eslint-disable コメントを先頭に追加
  sed -i '' '1s/^/\/* eslint-disable *\/\n\n/' "$OUTPUT_DIR/$type.d.ts"
done