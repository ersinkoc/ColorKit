import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { mix } from '../mixing/mix.js'

/**
 * Generate a scale of colors between two colors
 */
export function generateScale(
  start: ColorInput,
  end: ColorInput,
  count: number
): ReturnType<typeof parseColor>[] {
  const c1 = parseColor(start)!
  const c2 = parseColor(end)!

  if (count < 2) return [c1]

  const scale: ReturnType<typeof parseColor>[] = []
  const step = 100 / (count - 1)

  for (let i = 0; i < count; i++) {
    scale.push(mix(c1, c2, step * i))
  }

  return scale
}
