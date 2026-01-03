import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { tint, shade } from '../mixing/tint.js'

/**
 * Generate a Tailwind-style palette (50-950)
 */
export function generateTailwindPalette(color: ColorInput): Record<number, string> {
  const c = parseColor(color)!
  const palette: Record<number, string> = {}

  // Tints (50-400)
  palette[50] = tint(c, 90).toHex()
  palette[100] = tint(c, 80).toHex()
  palette[200] = tint(c, 60).toHex()
  palette[300] = tint(c, 40).toHex()
  palette[400] = tint(c, 20).toHex()

  // Base (500)
  palette[500] = c.toHex()

  // Shades (600-950)
  palette[600] = shade(c, 15).toHex()
  palette[700] = shade(c, 30).toHex()
  palette[800] = shade(c, 45).toHex()
  palette[900] = shade(c, 60).toHex()
  palette[950] = shade(c, 75).toHex()

  return palette
}
