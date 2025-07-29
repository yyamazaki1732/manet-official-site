#!/bin/bash

INPUT_BASE=./src/shared/i18n/locales
OUTPUT_DIR=./src/entities/api/model

mkdir -p $OUTPUT_DIR

# endpoint名だけ抽出（about, home など）
TYPES=$(find $INPUT_BASE -type f -name "*.json" | sed -E 's/.*\/([a-z]+)\/([a-z]+)\.json/\2/' | sort | uniq)

for type in $TYPES
do
  # ja優先、なければen
  if [ -f "$INPUT_BASE/ja/$type.json" ]; then
    file="$INPUT_BASE/ja/$type.json"
  elif [ -f "$INPUT_BASE/en/$type.json" ]; then
    file="$INPUT_BASE/en/$type.json"
  else
    echo "No json file found for $type"
    continue
  fi

  capitalized=$(echo "${type:0:1}" | tr a-z A-Z)${type:1}
  typename="${capitalized}Item"

  echo "Generating $typename from $(basename "$file")"

  npx quicktype "$file" \
    -o "$OUTPUT_DIR/$type.d.ts" \
    -l ts \
    --just-types \
    --top-level "$typename"

  sed -i '' '1s/^/\/* eslint-disable *\/\n\n/' "$OUTPUT_DIR/$type.d.ts"
done