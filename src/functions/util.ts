import { CodeFormat, HexCode, HSLA, RGBA } from '..'
import {
  clamp,
  generateRandomInteger,
  getMaximum,
  getMinimum,
  isEqual,
  isEqualOrMore,
  isLess,
  isMore,
  isNegative,
  normalize,
} from './common.js'
import { isHexCode, isHexCode6 } from './type-guard.js'

export const generateRGBA = (
  r: number,
  g: number,
  b: number,
  a: number
): RGBA => {
  if (isLess(r, 0) && isMore(r, 255)) throw new Error()
  if (isLess(g, 0) && isMore(g, 255)) throw new Error()
  if (isLess(b, 0) && isMore(b, 255)) throw new Error()
  if (isLess(a, 0) && isMore(a, 1)) throw new Error()

  const rgba: RGBA = { r, g, b, a }
  return rgba
}

export const generateHSLA = (
  h: number,
  s: number,
  l: number,
  a: number
): HSLA => {
  if (isLess(h, 0) && isMore(h, 360)) throw new Error()
  if (isLess(s, 0) && isMore(s, 100)) throw new Error()
  if (isLess(l, 0) && isMore(l, 100)) throw new Error()
  if (isLess(a, 0) && isMore(a, 1)) throw new Error()

  const hsla: HSLA = { h, s, l, a }
  return hsla
}

export const initRGBAWithBlack = (): RGBA => {
  const rgba = generateRGBA(0, 0, 0, 1)
  return rgba
}

export const generateRandomRGBA = (): RGBA => {
  const rgba = generateRGBA(
    generateRandomInteger(255),
    generateRandomInteger(255),
    generateRandomInteger(255),
    1
  )
  return rgba
}

export const convertHexToRGBA = (hexCode: HexCode): RGBA => {
  if (!isHexCode(hexCode)) throw new Error('Invalid hexCode format provided.')

  const noSign = hexCode.slice(1)
  const r = parseInt(noSign.slice(0, 2), 16)
  const g = parseInt(noSign.slice(2, 4), 16)
  const b = parseInt(noSign.slice(4, 6), 16)
  if (isHexCode6(hexCode)) {
    const rgba = generateRGBA(r, g, b, 1)
    return rgba
  }

  let a = parseInt(noSign.slice(6), 16)
  a = normalize(a, 255)
  const rgba = generateRGBA(r, g, b, a)
  return rgba
}

export const convertRGBAToHex = (
  rgba: RGBA,
  codeFormat: CodeFormat
): HexCode => {
  const { r, g, b, a } = rgba

  if (isEqual(codeFormat, 'hexCode6'))
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`

  const clampedA = clamp(Math.round(a * 255), 0, 255)
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(clampedA)}`
}

export const convertRGBAToHSLA = (rgba: RGBA): HSLA => {
  const h = getHueFromRGBA(rgba)
  const s = getSaturationFromRGBA(rgba)
  const l = getLightnessFromRGBA(rgba)
  const { a } = rgba
  const hsla = generateHSLA(h, s, l, a)
  return hsla
}

export const getHueFromRGBA = (rgba: RGBA) => {
  const { r, g, b } = rgba
  const max = getMaximum([r, g, b])
  const min = getMinimum([r, g, b])
  const delta = max - min

  let h = 0
  if (isEqual(max, min)) h = 0
  else if (isEqual(max, r)) h = ((g - b) / delta) % 6
  else if (isEqual(max, g)) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = h * 60
  if (isNegative(h)) h += 360

  return h
}

export const getSaturationFromRGBA = (rgba: RGBA) => {
  const { r, g, b } = rgba
  const max = getMaximum([r, g, b])
  const min = getMinimum([r, g, b])

  const delta = max - min

  if (isEqual(max, min)) return 0

  const l = getLightnessFromRGBA(rgba)
  const s = delta / (1 - Math.abs(2 * l - 1))
  return s
}

export const getLightnessFromRGBA = (rgba: RGBA) => {
  const { r, g, b } = rgba
  const max = getMaximum([r, g, b])
  const min = getMinimum([r, g, b])
  const lightness = (max + min) / 2
  return lightness
}

export const convertHSLAToRGBA = (hsla: HSLA): RGBA => {
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

  const rgba = generateRGBA(r, g, b, a)
  return rgba
}

export const toHex = (value: number) => value.toString(16).padStart(2, '0')
