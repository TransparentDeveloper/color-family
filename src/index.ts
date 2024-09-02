import { isBaseColor, isHexCode6, isHexCode8, isUndefined } from "./functions/type-guard";
import { convertHexCode6To8, convertHexToRGBA, convertHSLAToRGBA, convertRGBAToHex, convertRGBAToHSLA, generateRandomHexCode8, getMinimum } from "./functions/util";

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

const BASE_COLOR_CODE_MAP: Record<BaseColor, HexCode8> = {
  red: "#FF0000FF",    
  orange: "#FFA500FF",
  yellow: "#FFFF00FF",
  green: "#008000FF",  
  blue: "#0000FFFF",   
  indigo: "#4B0082FF", 
  purple: "#800080FF"
};


export class Color{
  _hexCode: HexCode8
  
  constructor(color?: BaseColor|HexCode6|HexCode8) {
    if (isUndefined(color))
      this._hexCode = generateRandomHexCode8()
    else if (isBaseColor(color))
      this._hexCode = BASE_COLOR_CODE_MAP[color]
    else if (isHexCode6(color))
      this._hexCode = convertHexCode6To8(color, "FF")
    else if (isHexCode8(color))
      this._hexCode = color
    else {
      throw new Error("Invalid color format provided.");
    }
  }
  // 인스턴스 메서드로 변경
  pastel(): HexCode8 {
    const rgba = convertHexToRGBA(this._hexCode);
    const hlsa = convertRGBAToHSLA(rgba);

    const sPastel = getMinimum([hlsa.s * 0.5, 100]);
    const lPastel = getMinimum([hlsa.l + 20, 100]);

    const rgbaPastel = convertHSLAToRGBA({
      ...hlsa,
      s: sPastel,
      l: lPastel,
    });
    return convertRGBAToHex(rgbaPastel);
  }
  // vivid(): HexCode8 {
  //   return this._hexCode; 
  // }
  // metallic(): HexCode8 {
  //   return this._hexCode; 
  // }
  // neon(): HexCode8 {
  //   return this._hexCode; 
  // }
  // monochrome(): HexCode8 {
  //   return this._hexCode; 
  // }
  // earthTone(): HexCode8{
  //   return this._hexCode;
  // }
  toString(): string {
    return this._hexCode;
  }
  static from(color?: BaseColor | HexCode6 | HexCode8): Color {
    return new Color(color);
  }
}