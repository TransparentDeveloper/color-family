export type HexCode6 = `#${string}`;
export type HexCode8 = `#${string}`;
export type HexCode = HexCode6 | HexCode8

export type BaseColor = "red" | "orange" | "yellow" | "green" | "blue" | "indigo" | "purple"
export type ColorFamily = "pastel" | "vivid" | "metallic" | "neon" | "monochrome" | "earth-tone"

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

export type FormatOptions = ""