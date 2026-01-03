import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { ColorClass } from '../core/color.js'

/**
 * Get complementary color (180° hue rotation)
 * Returns an array with the complementary color
 */
export function getComplementary(color: ColorInput): ColorClass[] {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsl = rgbToHsl(rgb)
  hsl.h = (hsl.h + 180) % 360
  const resultRgb = hslToRgb(hsl)
  return [new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, c.alpha())]
}
