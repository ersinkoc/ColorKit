import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { ColorClass } from '../core/color.js'
import { lerp } from '../utils/lerp.js'
import { clamp0255, clamp01 } from '../utils/clamp.js'

/**
 * Mix two colors together
 * @param color1 - First color
 * @param color2 - Second color
 * @param amount - Mix amount (0-1), default 0.5
 */
export function mix(color1: ColorInput, color2: ColorInput, amount: number = 0.5): ColorClass {
  const c1 = parseColor(color1)!
  const c2 = parseColor(color2)!
  const ratio = clamp01(amount)

  return new ColorClass(
    Math.round(lerp(c1.red(), c2.red(), ratio)),
    Math.round(lerp(c1.green(), c2.green(), ratio)),
    Math.round(lerp(c1.blue(), c2.blue(), ratio)),
    lerp(c1.alpha(), c2.alpha(), ratio)
  )
}
