import type { ColorInput, WcagLevel, TextSize } from '../types.js'
import { getContrast } from './contrast.js'
import { getLuminance } from './luminance.js'
import { parseColor } from '../core/parse.js'
import { ColorClass } from '../core/color.js'

/**
 * Check if text is readable against background per WCAG guidelines
 */
export function isReadable(
  foreground: ColorInput,
  background: ColorInput,
  level: WcagLevel = 'AA',
  size: TextSize = 'normal'
): boolean {
  const contrast = getContrast(foreground, background)
  const minRatio = getMinimumRatio(level, size)
  return contrast >= minRatio
}

/**
 * Get minimum contrast ratio for WCAG level and text size
 */
function getMinimumRatio(level: WcagLevel, size: TextSize): number {
  if (level === 'AAA') {
    return size === 'large' ? 4.5 : 7.0
  }
  // AA
  return size === 'large' ? 3.0 : 4.5
}

/**
 * Get a readable foreground color (black or white) for a background
 */
export function getReadableColor(
  background: ColorInput
): ColorClass {
  const bg = parseColor(background)!
  const black = new ColorClass(0, 0, 0)
  const white = new ColorClass(255, 255, 255)

  if (getContrast(white, bg) >= getContrast(black, bg)) {
    return white
  }
  return black
}

/**
 * Suggest black or white text for a background
 */
export function suggestForeground(background: ColorInput): string {
  const luminance = getLuminance(background)
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
