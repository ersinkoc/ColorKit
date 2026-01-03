import type { ColorInput, PaletteOptions } from '../types.js'
import { parseColor } from '../core/parse.js'
import { generateTints } from './tints.js'
import { generateShades } from './shades.js'
import { generateTones } from './tones.js'

/**
 * Generate a full palette with tints, shades, and tones
 */
export function generatePalette(
  color: ColorInput,
  options: PaletteOptions = {}
): Record<number, string> {
  const { tints: numTints = 5, shades: numShades = 5 } = options
  const c = parseColor(color)!

  const palette: Record<number, string> = {}

  // Generate tints (lighter) - from 50 to 400
  // Generate numTints tints (excluding original since it goes at 500)
  const allTints = generateTints(c, numTints + 1)
  for (let i = 0; i < numTints; i++) {
    palette[50 + i * 100] = allTints[i]!.toHex()
  }

  // Base color at 500
  palette[500] = c.toHex()

  // Generate shades (darker) - from 600 to 950
  // Generate numShades shades (excluding original since it's at 500)
  const allShades = generateShades(c, numShades + 1)
  for (let i = 1; i < numShades; i++) {
    palette[500 + i * 100] = allShades[i]!.toHex()
  }
  // Last shade at 950
  palette[950] = allShades[numShades]!.toHex()

  return palette
}
