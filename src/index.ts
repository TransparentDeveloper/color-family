import { getRandomIntegerInRange, shallowCopy } from './functions/common.js'
import { isBaseColor, isHexCode, isUndefined } from './functions/type-guard.js'
import {
  convertHexToRGBA,
  convertHSLAToRGBA,
  convertRGBAToHex,
  convertRGBAToHSLA,
  generateHSLA,
  generateRandomRGBA,
  initRGBAWithBlack,
} from './functions/util.js'

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

const BASE_COLOR_CODE_MAP: Record<BaseColor, HexCode8> = {
  red: '#FF0000FF',
  orange: '#FFA500FF',
  yellow: '#FFFF00FF',
  green: '#008000FF',
  blue: '#0000FFFF',
  indigo: '#4B0082FF',
  purple: '#800080FF',
}

export class ColorFamily {
  private _rgba: RGBA
  private _hsla: HSLA

  constructor(color?: BaseColor | HexCode6 | HexCode8) {
    let rgba = initRGBAWithBlack()
    if (isUndefined(color)) rgba = generateRandomRGBA()
    else if (isBaseColor(color))
      rgba = convertHexToRGBA(BASE_COLOR_CODE_MAP[color])
    else if (isHexCode(color)) rgba = convertHexToRGBA(color)
    else throw new Error('Invalid color format provided.')

    this._rgba = rgba

    const hsla = convertRGBAToHSLA(rgba)
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

    const pastelHSLA = generateHSLA(pastelH, pastelS, pastelL, hsla.a)
    const pastelRGBA = convertHSLAToRGBA(pastelHSLA)

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

    const vividHSLA = generateHSLA(vividH, vividS, vividL, hsla.a)
    const vividRGBA = convertHSLAToRGBA(vividHSLA)

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

    const neonHSLA = generateHSLA(neonH, neonS, neonL, hsla.a)
    const neonRGBA = convertHSLAToRGBA(neonHSLA)

    this._hsla = neonHSLA
    this._rgba = neonRGBA

    return this
  }

  getHexCode(codeFormat: CodeFormat = 'hexCode6') {
    return convertRGBAToHex(this._rgba, codeFormat)
  }

  static from(color?: BaseColor | HexCode6 | HexCode8): ColorFamily {
    return new ColorFamily(color)
  }
}
