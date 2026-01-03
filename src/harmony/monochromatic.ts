import type { ColorInput, HslaColor } from '../types.js'
import { parseColor } from '../core/parse.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { ColorClass } from '../core/color.js'

/**
 * Get monochromatic colors (variations in lightness/saturation)
 */
export function getMonochromatic(color: ColorInput, count: number): ColorClass[] {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  const hsl = rgbToHsl(rgb)

  const colors: ColorClass[] = [c]
  const step = 100 / (count + 1)

  for (let i = 1; i <= count; i++) {
    const l = Math.min(100, hsl.l + step * i * (i % 2 === 0 ? 1 : -1))
    const hsla: HslaColor = { h: hsl.h, s: hsl.s, l, a: c.alpha() }
    const resultRgb = hslToRgb(hsla)
    colors.push(new ColorClass(resultRgb.r, resultRgb.g, resultRgb.b, resultRgb.a))
  }

  return colors
}
