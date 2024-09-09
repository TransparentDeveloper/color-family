cp dist/esm/index.js dist/esm/index.mjs
cp dist/cjs/index.js dist/cjs/index.cjs

rm -rf dist/esm/index.js dist/cjs/index.js


cp dist/esm/index.d.ts dist/esm/index.d.mts
cp dist/cjs/index.d.ts dist/cjs/index.d.cts

rm -rf dist/esm/index.d.ts dist/cjs/index.d.ts


echo '{"type": "commonjs"}' > dist/cjs/package.json