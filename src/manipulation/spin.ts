import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { ColorClass } from '../core/color.js'

/**
 * Rotate the hue of a color by degrees
 */
export function spin(color: ColorInput, degrees: number): ColorClass {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsl = rgbToHsl(rgb)
  hsl.h = Math.round((hsl.h + degrees)) % 360
  if (hsl.h < 0) hsl.h += 360
  const resultRgb = hslToRgb(hsl)
  return new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, resultRgb.a)
}
