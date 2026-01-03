import type { ColorInput } from '../types.js'
import { ColorClass } from './color.js'
import { parseColor } from './parse.js'

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
  // Import here to avoid circular dependency
  const { hslToRgb } = require('../conversion/hsl.js')
  const rgb = hslToRgb({ h, s, l, a })
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Create a color from HSV values
 */
export function hsv(h: number, s: number, v: number, a: number = 1): ColorClass {
  const { hsvToRgb } = require('../conversion/hsv.js')
  const rgb = hsvToRgb({ h, s, v, a })
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Create a color from HWB values
 */
export function hwb(h: number, w: number, b: number, a: number = 1): ColorClass {
  const { hwbToRgb } = require('../conversion/hwb.js')
  const rgb = hwbToRgb({ h, w, b, a })
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Create a color from HEX string
 */
export function hex(hex: string): ColorClass {
  const { hexToRgb } = require('../conversion/hex.js')
  const rgb = hexToRgb(hex)
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Create a color from CMYK values
 */
export function cmyk(c: number, m: number, y: number, k: number): ColorClass {
  const { cmykToRgb } = require('../conversion/cmyk.js')
  const rgb = cmykToRgb({ c, m, y, k })
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}
