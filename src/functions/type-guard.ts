import { BaseColor, HexCode, HexCode6, HexCode8 } from '..'

export const isUndefined = (input: unknown): input is undefined =>
  typeof input === 'undefined'

export const isHexCode = (input: unknown): input is HexCode =>
  typeof input === 'string' && /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(input)

export const isHexCode6 = (input: unknown): input is HexCode6 =>
  isHexCode(input) && input.length === 1 + 6

export const isHexCode8 = (input: unknown): input is HexCode8 =>
  isHexCode(input) && input.length === 1 + 8

export const isBaseColor = (input: unknown): input is BaseColor => {
  const baseColors: Record<BaseColor, boolean> = {
    red: true,
    orange: true,
    yellow: true,
    green: true,
    blue: true,
    indigo: true,
    purple: true,
    white: true,
    black: true,
  }
  return typeof input === 'string' && input in baseColors
}
