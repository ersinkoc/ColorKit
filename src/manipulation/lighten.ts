import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { ColorClass } from '../core/color.js'
import { clamp0100 } from '../utils/clamp.js'

/**
 * Lighten a color by increasing its lightness
 */
export function lighten(color: ColorInput, amount: number = 10): ColorClass {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsl = rgbToHsl(rgb)
  hsl.l = clamp0100(hsl.l + amount)
  const resultRgb = hslToRgb(hsl)
  return new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, resultRgb.a)
}

/**
 * Darken a color by decreasing its lightness
 */
export function darken(color: ColorInput, amount: number = 10): ColorClass {
  return lighten(color, -amount)
}
