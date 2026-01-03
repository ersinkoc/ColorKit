import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { getNamedColor as getNamed, findClosestNamedColor as findClosest, namedColors as named } from '../conversion/named.js'
import { ColorClass } from '../core/color.js'

/**
 * Get a named color as a Color instance
 */
export function getNamedColor(name: string): ColorClass | null {
  const rgb = getNamed(name)
  if (!rgb) return null
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Find the closest named color to the input
 */
export function findClosestNamedColor(color: ColorInput): string | null {
  const c = parseColor(color)
  if (!c) return null
  const rgb = c.toRgb()
  return findClosest(rgb)
}

/**
 * Export named colors array
 */
export const namedColors: string[] = named
