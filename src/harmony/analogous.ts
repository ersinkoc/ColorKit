import type { ColorInput, HarmonyOptions, HsvaColor } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsv, hsvToRgb } from '../conversion/hsv.js'
import { ColorClass } from '../core/color.js'

/**
 * Get analogous colors (neighboring colors on color wheel)
 */
export function getAnalogous(color: ColorInput, options: HarmonyOptions = {}): ColorClass[] {
  const { count = 3, angle = 30 } = options
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsv = rgbToHsv(rgb)

  const colors: ColorClass[] = []
  const offset = Math.floor(count / 2)

  for (let i = -offset; i <= offset; i++) {
    const h = (hsv.h + i * angle + 360) % 360
    const hsva: HsvaColor = { h, s: hsv.s, v: hsv.v, a: c.alpha() }
    const resultRgb = hsvToRgb(hsva)
    colors.push(new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, resultRgb.a))
  }

  return colors
}
