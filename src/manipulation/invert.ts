import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { ColorClass } from '../core/color.js'
import { spin } from './spin.js'

/**
 * Convert a color to grayscale
 */
export function grayscale(color: ColorInput): ColorClass {
  const c = parseColor(color)!
  const avg = (c.red() + c.green() + c.blue()) / 3
  return new ColorClass(avg, avg, avg, c.alpha())
}

/**
 * Invert a color (255 - r, 255 - g, 255 - b)
 */
export function invert(color: ColorInput): ColorClass {
  const c = parseColor(color)!
  return new ColorClass(
    255 - c.red(),
    255 - c.green(),
    255 - c.blue(),
    c.alpha()
  )
}

/**
 * Get the complementary color (180° hue rotation)
 */
export function complement(color: ColorInput): ColorClass {
  return spin(color, 180)
}
