import { BaseColor, HexCode, HexCode6, HexCode8 } from "..";

export const isUndefined = (input: unknown): input is undefined =>
  typeof input === "undefined"

export const isHexCode = (input: unknown): input is HexCode =>
  typeof input === 'string'
  && input[0].startsWith("#")

export const isHexCode6 = (input: unknown): input is HexCode6 => 
  isHexCode(input) && input.length === (1 + 6)

export const isHexCode8 = (input: unknown): input is HexCode8 => 
  isHexCode(input) && input.length === (1 + 8)

export const isBaseColor = (input: unknown): input is BaseColor =>
  typeof input === 'string'
  && ["red", "orange", "yellow", "green", "blue", "indigo", "purple"].includes(input);