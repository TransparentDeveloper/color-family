# color-family &middot; [![Latest Version](https://img.shields.io/badge/latest_version-0.1.10-orange.svg)](https://github.com/TransparentDeveloper/color-family/tree/main-0.1.10) [![MIT License](https://img.shields.io/badge/License-MIT-orange.svg)](https://github.com/TransparentDeveloper/color-family/blob/main/LICENSE)

🖍️ We will find the color you want.

> _* This document supports [English](https://github.com/TransparentDeveloper/color-family?tab=readme-ov-file#%EF%B8%8F-english) and [Korean](https://github.com/TransparentDeveloper/color-family?tab=readme-ov-file#%EF%B8%8F-한국어)._

<br/>

#### 🏷️ English:

## Introduction

- `color-family` is a JavaScript package.
- You can generate hex codes for various color families such as pastel, neon, and more.
- You can either provide a base color manually or generate a random color, and then transform it into a specific color family.

<br/>

## Installation

To install the color-family package, run the following command:

```bash
npm install color-family
```

<br/>

## Supported Environments

- **JavaScript**: _ES Modules and CommonJS_
- **TypeScript**: _Type definitions provided for ES Modules and CommonJS_

<br/>

## Usage

### ① - Using a Base Color [<span style="color:#ff0000">◼︎</span> <span style="color:#efb9b9">◼︎</span> <span style="color:#f63c3c">◼︎</span>]

```ts
import { ColorFamily } from 'color-family';

/* Register with a base color */
const red = new ColorFamily('red');
console.log(red.getHexCode()) // ✅ Expected output: "#ff0000"

/* Convert to pastel */
const pastelRed = red.pastel();
console.log(pastelRed.getHexCode()); // ✅ Expected output: "#efb9b9"

/* Convert to neon */
const neonRed = red.neon()
console.log(neonRed.getHexCode()) // ✅ Expected output: "#f63c3c"
```

### ② - Generate a Random Color and Transform It [<span style="color:#0a9788">◼︎</span> <span style="color:#acece5">◼︎</span> <span style="color:#3df5e1">◼︎</span>]
```ts
import { ColorFamily } from 'color-family';

/* Generate a random color */
const random = new ColorFamily()
console.log(random.getHexCode()) // ✅ Expected output: "#0a9788"

/* Convert to pastel */
const pastelRandom = random.pastel()
console.log(pastelRandom.getHexCode()) // ✅ Expected output: "#acece5" 

/* Convert to neon */
const neonRandom = random.neon()
console.log(neonRandom.getHexCode()) // ✅ Expected output: "#3df5e1"
```

### ③ - Custom Color [<span style="color:#ed7402">◼︎</span> <span style="color:#e9c6a5">◼︎</span> <span style="color:#f79436">◼︎</span>]
```ts
import { ColorFamily } from 'color-family';

/* Use a custom color */
const custom = new ColorFamily('#ed7402')
console.log(custom.getHexCode()) // ✅ Expected output: "#ed7402"

/* Convert to pastel */
const pastelCustom = custom.pastel()
console.log(pastelCustom.getHexCode()) // ✅ Expected output: "#e9c6a5"

/* Convert to neon */
const neonCustom = custom.neon()
console.log(neonCustom.getHexCode()) // ✅ Expected output: "#f79436"
```

<br/>

### Color Families

`color-family` provides three main color families:

1. **pastel** - Soft and bright colors.
2. **vivid** - Saturated and vibrant colors.
3. **neon** - Bright and glowing colors.

<br/>

### Key Methods

- `.pastel()` 
  - Transforms the color into a pastel tone.
- `.vivid()` 
  - Transforms the color into a vivid tone.
- `.neon()` 
  - Transforms the color into a neon tone.
- `.getHexCode([codeFormat])` 
  - Returns the hex code of the color.
  - The `codeFormat` can be either `"hexCode6"` (default) or `"hexCode8"`.

<br/>
<br/>
<br/>

#### 🏷️ 한국어:

## 소개

- `color-family` 는 자바스크립트 패키지입니다. 
- 파스텔 색상, 네온 색상 등 다양한 색상 계열의 hex code를 생성할 수 있습니다. 
- 직접 기준 색상을 등록하거나 무작위 색상을 추첨받아, 특정 색상 계열로 변환해보세요.

<br/>

## 설치

color-family 패키지를 설치하려면, 다음 명령어를 실행해주세요.

```bash
npm install color-family
```

<br/>

## 지원 환경

- **JavaScript**: _ES 모듈 및 CommonJS 환경에서 사용 가능_
- **TypeScript**: _ES 모듈과 CommonJS용 타입 정의 제공_

<br/>

## 사용법

### ① - 기본 색상 활용 [<span style="color:#ff0000">◼︎</span> <span style="color:#efb9b9">◼︎</span> <span style="color:#f63c3c">◼︎</span>]

```ts
import { ColorFamily } from 'color-family';

/* 기본 색상으로 최초 등록 */
const red = new ColorFamily('red');
console.log(red.getHexCode()) // ✅ 출력 예: "#ff0000"

/* 파스텔 색상으로 변환 */
const pastelRed = red.pastel();
console.log(pastelRed.getHexCode()); // ✅ 출력 예: "#efb9b9"

/* 네온 색상으로 변환 */
const neonRed = red.neon()
console.log(neonRed.getHexCode()) // ✅ 출력 예: "#f63c3c"
```

### ② - 무작위 색상 추첨 후, 변환 [<span style="color:#0a9788">◼︎</span> <span style="color:#acece5">◼︎</span> <span style="color:#3df5e1">◼︎</span>] 
```ts
import { ColorFamily } from 'color-family';

/* 무작위 색상 지정 */
const random = new ColorFamily()
console.log(random.getHexCode()) // ✅ 출력 예: "#0a9788"

/* 파스텔 색상으로 변환 */
const pastelRandom = random.pastel()
console.log(pastelRandom.getHexCode()) // ✅ 출력 예: "#acece5" 

/* 네온 색상으로 변환 */
const neonRandom = random.neon()
console.log(neonRandom.getHexCode()) // ✅ 출력 예: "#3df5e1"
```


### ③ - 사용자 지정 [<span style="color:#ed7402">◼︎</span> <span style="color:#e9c6a5">◼︎</span> <span style="color:#f79436">◼︎</span>] 
```ts
import { ColorFamily } from 'color-family';

/* 무작위 색상 지정 */
const custom = new ColorFamily('#ed7402')
console.log(custom.getHexCode()) // ✅ 출력 예: "#ed7402"

/* 파스텔 색상으로 변환 */
const pastelCustom = custom.pastel()
console.log(pastelCustom.getHexCode()) // ✅ 출력 예: "#e9c6a5"

/* 네온 색상으로 변환 */
const neonCustom = custom.neon()
console.log(neonCustom.getHexCode()) // ✅ 출력 예: "#f79436"
```

<br/>

## 색상 계열

`color-family` 는 세 가지 주요 색상 계열을 제공합니다:

1. **pastel(파스텔)** - 부드럽고 밝은 색상.
2. **vivid(비비드)** - 선명하고 포화된 색상.
3. **neon(네온)** - 밝고 빛나는 색상.

<br/>

## 주요 메서드

- `.pastel()` 
  - pastel(파스텔) 색상으로 변환합니다.
- `.vivid()` 
  - vivid(비비드) 색상으로 변환합니다.
- `.neon()` 
  - neon(네온) 색상으로 변환합니다.
- `.getHexCode([codeFormat])` 
  - 색상의 hex code를 반환합니다.
  - `codeFormat` 은 `"hexCode6"`(기본값) 또는 `"hexCode8"` 으로 입력할 수 있습니다.

