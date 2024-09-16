import {
  generateRandomInteger,
  getMaximum,
  getMinimum,
  getRandomIntegerInRange,
  isEqual,
  isEqualOrMore,
  isLess,
  isMore,
  isNegative,
  normalize,
  shallowCopy,
} from './functions/common.js'
import {
  isBaseColor,
  isHexCode,
  isHexCode6,
  isUndefined,
} from './functions/type-guard.js'

export type CodeFormat = 'hexCode6' | 'hexCode8'

export type HexCode6 = `#${string}`
export type HexCode8 = `#${string}`
export type HexCode = HexCode6 | HexCode8

export type BaseColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'

export type RGBA = {
  r: number
  g: number
  b: number
  a: number
}
export type HSLA = {
  h: number
  s: number
  l: number
  a: number
}

export class ColorFamily {
  /* ------------ [public variable] ------------ */

  static BASE_COLOR_CODE_MAP: Record<BaseColor, HexCode8> = {
    red: '#FF0000FF',
    orange: '#FFA500FF',
    yellow: '#FFFF00FF',
    green: '#008000FF',
    blue: '#0000FFFF',
    indigo: '#4B0082FF',
    purple: '#800080FF',
  } as const

  /* ------------ [private variable] ------------ */

  private _rgba: RGBA
  private _hsla: HSLA

  /* ------------ [public method] ------------ */

  constructor(color?: BaseColor | HexCode6 | HexCode8) {
    let rgba: RGBA = this._initRGBAWithBlack()

    if (isUndefined(color)) {
      rgba = this._generateRandomRGBA()
    } else if (isBaseColor(color)) {
      const hexCode = ColorFamily.BASE_COLOR_CODE_MAP[color]
      console.log(hexCode)
      rgba = this._convertHexToRGBA(hexCode)
    } else if (isHexCode(color)) {
      rgba = this._convertHexToRGBA(color)
    } else throw new Error('Invalid color format provided.')

    this._rgba = rgba

    const h = this._getHueFromRGBA(rgba)
    const s = this._getSaturationFromRGBA(rgba)
    const l = this._getLightnessFromRGBA(rgba)
    const a = rgba.a
    const hsla = this._generateHSLA(h, s, l, a)

    this._hsla = hsla
  }

  pastel() {
    const hsla = shallowCopy(this._hsla)

    const standardS = 60
    const standardL = 80
    const sOffset = 3
    const lOffset = 4

    const pastelH = hsla.h
    const pastelS = getRandomIntegerInRange(standardS, sOffset)
    const pastelL = getRandomIntegerInRange(standardL, lOffset)

    const pastelHSLA = this._generateHSLA(pastelH, pastelS, pastelL, hsla.a)
    const pastelRGBA = this._convertHSLAToRGBA(pastelHSLA)

    this._hsla = pastelHSLA
    this._rgba = pastelRGBA

    return this
  }
  vivid() {
    const hsla = shallowCopy(this._hsla)

    const standardS = 98
    const standardL = 50
    const sOffset = 2
    const lOffset = 2

    const vividH = hsla.h
    const vividS = getRandomIntegerInRange(standardS, sOffset)
    const vividL = getRandomIntegerInRange(standardL, lOffset)

    const vividHSLA = this._generateHSLA(vividH, vividS, vividL, hsla.a)
    const vividRGBA = this._convertHSLAToRGBA(vividHSLA)

    this._hsla = vividHSLA
    this._rgba = vividRGBA

    return this
  }
  neon() {
    const hsla = shallowCopy(this._hsla)

    const standardS = 92
    const standardL = 60
    const sOffset = 2
    const lOffset = 1

    const neonH = hsla.h
    const neonS = getRandomIntegerInRange(standardS, sOffset)
    const neonL = getRandomIntegerInRange(standardL, lOffset)

    const neonHSLA = this._generateHSLA(neonH, neonS, neonL, hsla.a)
    const neonRGBA = this._convertHSLAToRGBA(neonHSLA)

    this._hsla = neonHSLA
    this._rgba = neonRGBA

    return this
  }

  getHexCode(codeFormat: CodeFormat = 'hexCode6') {
    return this._convertRGBAToHex(this._rgba, codeFormat)
  }

  static from(color?: BaseColor | HexCode6 | HexCode8): ColorFamily {
    return new ColorFamily(color)
  }

  /* ------------ [private method] ------------ */

  private _initRGBAWithBlack() {
    const rgba: RGBA = {
      r: 0,
      b: 0,
      g: 0,
      a: 1,
    }
    return rgba
  }

  private _generateHSLA(h: number, s: number, l: number, a: number) {
    if (isLess(h, 0) && isMore(h, 360)) throw new Error()
    if (isLess(s, 0) && isMore(s, 100)) throw new Error()
    if (isLess(l, 0) && isMore(l, 100)) throw new Error()
    if (isLess(a, 0) && isMore(a, 1)) throw new Error()

    const hsla: HSLA = { h, s, l, a }
    return hsla
  }

  private _generateRandomRGBA(): RGBA {
    const rgba: RGBA = {
      r: generateRandomInteger(255),
      g: generateRandomInteger(255),
      b: generateRandomInteger(255),
      a: 1,
    }
    return rgba
  }

  private _convertHexToRGBA(hexCode: HexCode) {
    if (!isHexCode(hexCode)) throw new Error('Invalid hexCode format provided.')

    const noSign = hexCode.slice(1)
    const r = parseInt(noSign.slice(0, 2), 16)
    const g = parseInt(noSign.slice(2, 4), 16)
    const b = parseInt(noSign.slice(4, 6), 16)
    if (isHexCode6(hexCode)) {
      const rgba: RGBA = { r, g, b, a: 1 }
      return rgba
    }

    let a = parseInt(noSign.slice(6), 16)
    a = normalize(a, 255)
    const rgba: RGBA = { r, g, b, a }
    return rgba
  }

  private _convertHSLAToRGBA(hsla: HSLA): RGBA {
    const { h, s, l, a } = hsla
    const normalizedS = normalize(s, 100)
    const normalizedL = normalize(l, 100)

    const c = (1 - Math.abs(2 * normalizedL - 1)) * normalizedS
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = normalizedL - c / 2

    let r = 0,
      g = 0,
      b = 0

    if (isEqualOrMore(h, 0) && isLess(h, 60)) {
      r = c
      g = x
      b = 0
    } else if (isEqualOrMore(h, 60) && isLess(h, 120)) {
      r = x
      g = c
      b = 0
    } else if (isEqualOrMore(h, 120) && isLess(h, 180)) {
      r = 0
      g = c
      b = x
    } else if (isEqualOrMore(h, 180) && isLess(h, 240)) {
      r = 0
      g = x
      b = c
    } else if (isEqualOrMore(h, 240) && isLess(h, 300)) {
      r = x
      g = 0
      b = c
    } else if (isEqualOrMore(h, 300) && isLess(h, 360)) {
      r = c
      g = 0
      b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    const rgba: RGBA = {
      r,
      g,
      b,
      a,
    }

    return rgba
  }

  private _convertRGBAToHex(rgba: RGBA, codeFormat: CodeFormat): HexCode {
    const { r, g, b, a } = rgba

    const hexR = r.toString(16).padStart(2, '0')
    const hexG = g.toString(16).padStart(2, '0')
    const hexB = b.toString(16).padStart(2, '0')

    let result: HexCode = `#${hexR}${hexG}${hexB}`

    if (codeFormat === 'hexCode8') {
      const clampedA = Math.round(a * 255)
      const hexA = clampedA.toString(16).padStart(2, '0')

      result = (result + `${hexA}`) as HexCode
    }

    return result
  }

  private _getHueFromRGBA(rgba: RGBA) {
    const { r, g, b } = rgba
    const max = getMaximum(r, g, b)
    const min = getMinimum(r, g, b)
    const delta = max - min

    let hue = 0
    if (isEqual(max, min)) hue = 0
    else if (isEqual(max, r)) hue = ((g - b) / delta) % 6
    else if (isEqual(max, g)) hue = (b - r) / delta + 2
    else hue = (r - g) / delta + 4

    hue = hue * 60
    if (isNegative(hue)) hue += 360

    return hue
  }

  private _getSaturationFromRGBA(rgba: RGBA) {
    const { r, g, b } = rgba
    const max = getMaximum(r, g, b)
    const min = getMinimum(r, g, b)
    const delta = max - min

    if (isEqual(max, min)) return 0

    const lightness = (max + min) / 2
    const saturation = delta / (1 - Math.abs(2 * lightness - 1))
    return saturation
  }

  private _getLightnessFromRGBA(rgba: RGBA) {
    const { r, g, b } = rgba
    const max = getMaximum(r, g, b)
    const min = getMinimum(r, g, b)
    const lightness = (max + min) / 2
    return lightness
  }
}
