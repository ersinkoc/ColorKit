import type { ColorInput, ColorFormat } from '../types.js'
import { parseColor, detectFormat } from './parse.js'
import { ColorClass } from './color.js'

/**
 * Check if input is a valid color
 */
export function isValidColor(input: string): boolean {
  if (typeof input !== 'string') return false
  return parseColor(input) !== null
}

/**
 * Parse and validate a color string
 */
export function parseColorTyped(input: string): {
  valid: boolean
  color: ColorClass | null
  format: ColorFormat | null
} {
  const format = detectFormat(input)
  const color = parseColor(input)

  return {
    valid: color !== null,
    color,
    format
  }
}
