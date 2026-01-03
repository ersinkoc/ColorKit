import type { RgbColor, RgbaColor } from '../types.js'
import { clamp0255 } from '../utils/clamp.js'
import { roundToByte } from '../utils/round.js'

/**
 * Convert HEX to RGB
 * @param hex - HEX color string (#ff5733, #f53, ff5733, #ff5733ff)
 * @throws Error if invalid HEX format
 */
export function hexToRgb(hex: string): RgbaColor {
  // Remove # if present
  let h = hex.replace(/^#/, '').trim()

  // Validate: must be 3, 4, 6, or 8 hex characters
  if (!/^[0-9a-fA-F]{3,8}$/.test(h) ||
![3, 4, 6, 8].includes(h.length)
) {
    throw new Error(`Invalid HEX color: ${hex}`)
  }

  // Expand shorthand (3 or 4 digits)
  if (h.length === 3 || h.length === 4) {
    h = h.split('').map(c => c + c).join('')
  }

  // Parse based on length
  const bigint = parseInt(h, 16)
  const r = (bigint >> (h.length === 8 ? 24 : 16)) & 255
  const g = (bigint >> (h.length === 8 ? 16 : 8)) & 255
  const b = (bigint >> (h.length === 8 ? 8 : 0)) & 255
  const a = h.length === 8 ? Math.round(((bigint >> 0) & 255) / 255 * 100) / 100 : 1

  return { r, g, b, a }
}

/**
 * Convert RGB to HEX
 * @param rgb - RGB color
 */
export function rgbToHex(rgb: RgbColor): string {
  const r = roundToByte(clamp0255(rgb.r))
  const g = roundToByte(clamp0255(rgb.g))
  const b = roundToByte(clamp0255(rgb.b))

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * Convert RGBA to HEX8 (with alpha)
 * When alpha is 1 (fully opaque), returns 6-digit HEX for efficiency
 * @param rgba - RGBA color
 */
export function rgbToHex8(rgba: RgbaColor): string {
  const r = roundToByte(clamp0255(rgba.r))
  const g = roundToByte(clamp0255(rgba.g))
  const b = roundToByte(clamp0255(rgba.b))

  const rgbHex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

  // When alpha is 1 (fully opaque), return 6-digit HEX
  if (rgba.a >= 0.9995) {
    return '#' + rgbHex
  }

  const a = Math.round(clamp0255(rgba.a * 255))
  return '#' + rgbHex + a.toString(16).padStart(2, '0')
}
