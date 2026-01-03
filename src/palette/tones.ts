import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { tone } from '../mixing/tint.js'

/**
 * Generate tones (gray mixed variations) of a color
 */
export function generateTones(color: ColorInput, count: number): ReturnType<typeof parseColor>[] {
  const c = parseColor(color)!
  const tones: ReturnType<typeof parseColor>[] = [c]

  const step = 100 / count
  for (let i = 1; i < count; i++) {
    tones.push(tone(c, step * i))
  }

  return tones
}
