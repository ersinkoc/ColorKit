import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { ColorClass } from '../core/color.js'
import { clamp0100 } from '../utils/clamp.js'

/**
 * Saturate a color by increasing its saturation
 */
export function saturate(color: ColorInput, amount: number = 10): ColorClass {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsl = rgbToHsl(rgb)
  hsl.s = clamp0100(hsl.s + amount)
  const resultRgb = hslToRgb(hsl)
  return new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, resultRgb.a)
}

/**
 * Desaturate a color by decreasing its saturation
 */
export function desaturate(color: ColorInput, amount: number = 10): ColorClass {
  return saturate(color, -amount)
}
