import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { lighten } from '../manipulation/lighten.js'
import { ColorClass } from '../core/color.js'

/**
 * Generate tints (lighter variations) of a color
 * Returns an array starting with the original color, ending with white
 */
export function generateTints(color: ColorInput, count: number = 11): ReturnType<typeof parseColor>[] {
  const c = parseColor(color)!
  const tints: ReturnType<typeof parseColor>[] = [c]

  // count includes original, so generate count - 1 tints
  const step = 100 / (count - 1)
  for (let i = 1; i < count; i++) {
    tints.push(lighten(c, step * i))
  }

  // Ensure last tint is pure white
  tints[tints.length - 1] = new ColorClass(255, 255, 255, c.alpha())

  return tints
}
