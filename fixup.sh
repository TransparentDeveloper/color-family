cp dist/mjs/index.js dist/mjs/index.mjs
cp dist/cjs/index.js dist/cjs/index.cjs

rm -rf dist/mjs/index.js dist/cjs/index.js


cp dist/mjs/index.d.ts dist/mjs/index.d.mts
cp dist/cjs/index.d.ts dist/cjs/index.d.cts

rm -rf dist/mjs/index.d.ts dist/cjs/index.d.ts
