import type { ColorInput } from '../types.js'
import { getLuminance } from './luminance.js'

/**
 * Calculate WCAG contrast ratio between two colors
 * Returns a value between 1 (same color) and 21 (black vs white)
 */
export function getContrast(color1: ColorInput, color2: ColorInput): number {
  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}
