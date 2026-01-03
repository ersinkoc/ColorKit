import type { ColorInput, HslaColor, HsvaColor, HwbColor } from '../types.js'
import { ColorClass } from './color.js'
import { parseColor } from './parse.js'
import { hslToRgb } from '../conversion/hsl.js'
import { hsvToRgb } from '../conversion/hsv.js'
import { hwbToRgb } from '../conversion/hwb.js'
import { hexToRgb } from '../conversion/hex.js'
import { cmykToRgb } from '../conversion/cmyk.js'

/**
 * Create a color from any input format
 */
export function color(input: ColorInput): ColorClass {
  const c = parseColor(input)
  if (!c) throw new Error(`Invalid color: ${input}`)
  return c
}

/**
 * Create a color from RGB values
 */
export function rgb(r: number, g: number, b: number, a: number = 1): ColorClass {
  return new ColorClass(r, g, b, a)
}

/**
 * Create a color from HSL values
 */
export function hsl(h: number, s: number, l: number, a: number = 1): ColorClass {
  const hslaColor: HslaColor = { h, s, l, a }
  const rgbColor = hslToRgb(hslaColor)
  return new ColorClass(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a)
}

/**
 * Create a color from HSV values
 */
export function hsv(h: number, s: number, v: number, a: number = 1): ColorClass {
  const hsvaColor: HsvaColor = { h, s, v, a }
  const rgbColor = hsvToRgb(hsvaColor)
  return new ColorClass(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a)
}

/**
 * Create a color from HWB values
 */
export function hwb(h: number, w: number, bVal: number, a: number = 1): ColorClass {
  const hwbColor: HwbColor = { h, w, b: bVal, a }
  const rgbColor = hwbToRgb(hwbColor)
  return new ColorClass(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a)
}

/**
 * Create a color from HEX string
 */
export function hex(hexStr: string): ColorClass {
  const rgbColor = hexToRgb(hexStr)
  return new ColorClass(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a)
}

/**
 * Create a color from CMYK values
 */
export function cmyk(c: number, m: number, y: number, k: number): ColorClass {
  const rgbColor = cmykToRgb({ c, m, y, k })
  return new ColorClass(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a)
}
