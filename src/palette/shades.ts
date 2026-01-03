import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { darken } from '../manipulation/lighten.js'

/**
 * Generate shades (darker variations) of a color
 * Returns an array starting with the original color
 */
export function generateShades(color: ColorInput, count: number = 11): ReturnType<typeof parseColor>[] {
  const c = parseColor(color)!
  const shades: ReturnType<typeof parseColor>[] = [c]

  // count includes original, so generate count - 1 shades
  const step = 100 / (count - 1)
  for (let i = 1; i < count; i++) {
    shades.push(darken(c, step * i))
  }

  return shades
}
