import { HexCode, HexCode6, HexCode8, HSLA, RGBA } from "../type"
import { isHexCode6, isHexCode8 } from "./type-guard"

export const generateRandomHexCode8 = (): HexCode8 => {
  const randomInt = generateRandomInteger(0XFFFFFF).toString()
  const hexCode6 = ["#", randomInt.padStart(6, '0')].join() as HexCode6
  const hexCode8 = convertHexCode6To8(hexCode6, "FF")
  return hexCode8
}

export const convertHexCode8To6 = (hexCode8: HexCode8): HexCode6 => {
  if (!isHexCode8(hexCode8)) throw new Error("Invalid hexCode format provided.")
  const hexCode6 = hexCode8.slice(0, -2)
  return hexCode6 as HexCode6
}

export const convertHexCode6To8 = (hexCode6: HexCode6, alpha: string): HexCode8 => {
  if (!isHexCode6(hexCode6)) throw new Error("Invalid hexCode format provided.")
  const hexCode8 = [hexCode6, alpha].join() as HexCode8
  return hexCode8
}

export const convertHexToRGBA = (hexCode: HexCode): RGBA => {
  if (!isHexCode8(hexCode)) throw new Error("Invalid hexCode format provided.")
  
    const noSign = hexCode.slice(1)
    const r = parseInt(noSign.slice(0, 2), 16); 
    const g = parseInt(noSign.slice(2, 4), 16); 
    const b = parseInt(noSign.slice(4, 6), 16); 
    if (isHexCode6(hexCode)) return { r, g, b, a: 1 }

    const alphaValue = parseInt(noSign.slice(6), 16)
    const normalizedAlpha = normalize(alphaValue, 255)
    return {r,g,b, a:normalizedAlpha}
}

export const convertRGBAToHex = (rgba: RGBA): HexCode8 => {
  const r = clamp(rgba.r, 0, 255);
  const g = clamp(rgba.g, 0, 255);
  const b = clamp(rgba.b, 0, 255);
  const alphaValue = clamp(Math.round(rgba.a * 255), 0, 255);

  const hexCode8 = `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alphaValue)}`;
  return hexCode8 as HexCode8;
};


export const convertRGBAToHSLA = ({ r, g, b, a }: RGBA): HSLA => {
  r = normalize(r, 255);
  g = normalize(g, 255);
  b = normalize(b, 255); 

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const h = max === min ? 0 : (max === r ? (g - b) / (max - min) : (max === g ? (b - r) / (max - min) + 2 : (r - g) / (max - min) + 4)) * 60;
  const l = (max + min) / 2;
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
  
  return { h, l, s, a }
}

export const convertHSLAToRGBA = ({ h, s, l, a }: HSLA): RGBA => {
  
  const HueToRGB = (p: number, q: number, t: number) => {
    if (isLess(t, 0)) t += 1;
    if (isMore(t, 1)) t -= 1;
  
    if (isLess(t, 1/6)) return p + (q - p) * 6 * t;
    if (isLess(t, 1/2)) return q;
    if (isLess(t, 2/3)) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  if (s === 0) {
    const r = Math.round(l * 255) 
    const g = Math.round(l * 255) 
    const b = Math.round(l * 255) 
    return { r, g, b, a }
  }

  const q = isLess(l, 0.5) ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  const rFloat = HueToRGB(p, q, h + 1/3);
  const gFloat = HueToRGB(p, q, h);
  const bFloat = HueToRGB(p, q, h - 1 / 3);
  
  const [r, g, b] = [rFloat, gFloat, bFloat].map((float) => Math.round(float));

  return { r, g, b, a }
}


/* --------[Common]-------- */

export const toHex = (value: number) => value.toString(16).padStart(2, '0');

export const isEqual = <T>(target: T, to: T) => Object.is(target, to)
export const isLess = (target:number, than:number) => target < than
export const isMore = (target: number, than: number) => target > than

export const clamp = (value: number, max: number, min: number) => Math.min(Math.max(value, min), max);

export const generateRandomInteger = (max: number = 1, min: number = 0) => 
  Math.floor(Math.random() * (max - min + 1)) + min

export const normalize = (value: number, max: number, min: number = 0) => {
  if(max <= min) throw new Error("Maximum value must be greater than minimum value.")
  const delta = max - min
  return (value - min) / delta
}

export const getMinimum = (values: number[]): number => {
  if (values.length === 0) throw new Error("Array cannot be empty.")
  
  let minimum = Number.MAX_SAFE_INTEGER
  values.forEach((value) => { 
    if (minimum > value) 
      minimum = value
  })
  return minimum
}

export const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z0-9\s]/g, '');