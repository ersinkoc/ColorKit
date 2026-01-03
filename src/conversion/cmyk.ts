import type { RgbColor, RgbaColor, CmykColor } from '../types.js'
import { clamp0100 } from '../utils/clamp.js'
import { roundTo1 } from '../utils/round.js'

/**
 * Convert RGB to CMYK
 * @param rgb - RGB color
 */
export function rgbToCmyk(rgb: RgbColor): CmykColor & { a: number } {
  let r = rgb.r / 255
  let g = rgb.g / 255
  let b = rgb.b / 255

  // Special case for black
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100, a: 1 }
  }

  const k = 1 - Math.max(r, g, b)

  // If black is 1, all colors are 0
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100, a: 1 }
  }

  const c = (1 - r - k) / (1 - k)
  const m = (1 - g - k) / (1 - k)
  const y = (1 - b - k) / (1 - k)

  return {
    c: roundTo1(clamp0100(c * 100)),
    m: roundTo1(clamp0100(m * 100)),
    y: roundTo1(clamp0100(y * 100)),
    k: roundTo1(clamp0100(k * 100)),
    a: 1
  }
}

/**
 * Convert CMYK to RGB
 * @param cmyk - CMYK color
 */
export function cmykToRgb(cmyk: CmykColor): RgbaColor {
  const c = cmyk.c / 100
  const m = cmyk.m / 100
  const y = cmyk.y / 100
  const k = cmyk.k / 100

  const r = 255 * (1 - c) * (1 - k)
  const g = 255 * (1 - m) * (1 - k)
  const b = 255 * (1 - y) * (1 - k)

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
    a: 1
  }
}
