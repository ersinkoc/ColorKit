import type { ColorInput, HslaColor } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { ColorClass } from '../core/color.js'

/**
 * Get triadic colors (3 colors, 120° apart)
 * Returns 3 new colors (excluding the original)
 */
export function getTriadic(color: ColorInput): ColorClass[] {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsl = rgbToHsl(rgb)
  const a = c.alpha()

  return [
    createColor(hsl.h, hsl.s, hsl.l, a),
    createColor((hsl.h + 120) % 360, hsl.s, hsl.l, a),
    createColor((hsl.h + 240) % 360, hsl.s, hsl.l, a)
  ]

  function createColor(h: number, s: number, l: number, a: number): ColorClass {
    const hsla: HslaColor = { h, s, l, a }
    const resultRgb = hslToRgb(hsla)
    return new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, resultRgb.a)
  }
}
