#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT="$ROOT/dist/output"
OUTPUT_RESOURCE="$ROOT/dist/output_resource"

export CLIENT_BASE_PATH="${MIAODA_APP_ID:+/app/$MIAODA_APP_ID}"
export ASSETS_CDN_PATH="${MIAODA_RESOURCE_CDN_PREFIX:-./}"
export NODE_ENV="${NODE_ENV:-production}"

rm -rf "$ROOT/dist"
npx vite build --outDir "$ROOT/dist/client" --emptyOutDir

mkdir -p "$OUTPUT"
find "$ROOT/dist/client" -maxdepth 1 -name '*.html' -exec cp {} "$OUTPUT/" \;

if [ -d "$ROOT/dist/client/assets" ]; then
  mkdir -p "$OUTPUT_RESOURCE"
  cp -r "$ROOT/dist/client/assets" "$OUTPUT_RESOURCE/"
fi

rm -rf "$ROOT/dist/client"
echo "Build complete"
