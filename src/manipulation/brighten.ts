import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { ColorClass } from '../core/color.js'
import { clamp0255 } from '../utils/clamp.js'

/**
 * Brighten a color by increasing all RGB channels
 */
export function brighten(color: ColorInput, amount: number = 10): ColorClass {
  const c = parseColor(color)!
  const factor = amount / 100
  return new ColorClass(
    clamp0255(c.red() + (255 - c.red()) * factor),
    clamp0255(c.green() + (255 - c.green()) * factor),
    clamp0255(c.blue() + (255 - c.blue()) * factor),
    c.alpha()
  )
}
