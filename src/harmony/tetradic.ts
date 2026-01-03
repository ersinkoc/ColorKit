import type { ColorInput, HsvaColor } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsv, hsvToRgb } from '../conversion/hsv.js'
import { ColorClass } from '../core/color.js'

/**
 * Get tetradic colors (4 colors, 90° apart)
 */
export function getTetradic(color: ColorInput): ColorClass[] {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsv = rgbToHsv(rgb)

  return [
    c,
    createColor((hsv.h + 90) % 360, hsv.s, hsv.v, c.alpha()),
    createColor((hsv.h + 180) % 360, hsv.s, hsv.v, c.alpha()),
    createColor((hsv.h + 270) % 360, hsv.s, hsv.v, c.alpha())
  ]

  function createColor(h: number, s: number, v: number, a: number): ColorClass {
    const hsva: HsvaColor = { h, s, v, a }
    const resultRgb = hsvToRgb(hsva)
    return new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, resultRgb.a)
  }
}
