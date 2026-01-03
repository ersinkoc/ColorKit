import type { ColorInput, RgbColor } from '../types.js'
import { parseColor } from '../core/parse.js'

/**
 * Calculate relative luminance (WCAG 2.0)
 * Returns a value between 0 (darkest) and 1 (lightest)
 */
export function getLuminance(color: ColorInput): number {
  const c = parseColor(color)!
  const rgb = c.toRgb()
  return rgbToLuminance(rgb)
}

/**
 * Calculate luminance from RGB values
 */
function rgbToLuminance(rgb: RgbColor): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(channel => {
    const srgb = channel / 255
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4)
  }) as [number, number, number]

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
