import type { RgbColor, RgbaColor, HsvColor, HsvaColor, HslColor, HslaColor } from '../types.js'
import { clamp0100, clamp0360 } from '../utils/clamp.js'
import { roundTo1 } from '../utils/round.js'

/**
 * Convert RGB to HSV
 * @param rgb - RGB color
 */
export function rgbToHsv(rgb: RgbColor): HsvaColor {
  let r = rgb.r / 255
  let g = rgb.g / 255
  let b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const v = max
  const d = max - min

  let h = 0
  let s = max === 0 ? 0 : d / max

  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: roundTo1(clamp0360(h * 360)),
    s: roundTo1(clamp0100(s * 100)),
    v: roundTo1(clamp0100(v * 100)),
    a: ('a' in rgb ? (rgb as RgbaColor).a : 1)
  }
}

/**
 * Convert HSV to RGB
 * @param hsv - HSV color
 */
export function hsvToRgb(hsv: HsvColor): RgbaColor {
  const h = hsv.h / 360
  const s = hsv.s / 100
  const v = hsv.v / 100
  const a = ('a' in hsv ? (hsv as HsvaColor).a : 1) as number

  let r: number, g: number, b: number

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
    default: r = 0; g = 0; b = 0
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a
  }
}

/**
 * Convert HSV to HSL
 * @param hsv - HSV color
 */
export function hsvToHsl(hsv: HsvColor): HslaColor {
  const s = hsv.s / 100
  const v = hsv.v / 100

  const l = v * (1 - s / 2)
  const sHsl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)

  return {
    h: hsv.h,
    s: roundTo1(clamp0100(sHsl * 100)),
    l: roundTo1(clamp0100(l * 100)),
    a: ('a' in hsv ? (hsv as HsvaColor).a : 1)
  }
}

/**
 * Convert HSL to HSV
 * @param hsl - HSL color
 */
export function hslToHsv(hsl: HslColor): HsvaColor {
  const s = hsl.s / 100
  const l = hsl.l / 100

  const v = l + s * Math.min(l, 1 - l)
  const sHsv = v === 0 ? 0 : 2 * (1 - l / v)

  return {
    h: hsl.h,
    s: roundTo1(clamp0100(sHsv * 100)),
    v: roundTo1(clamp0100(v * 100)),
    a: ('a' in hsl ? (hsl as HslaColor).a : 1)
  }
}
