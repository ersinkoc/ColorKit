import type { RgbColor, RgbaColor, HwbColor } from '../types.js'
import { rgbToHsl, hslToRgb } from './hsl.js'
import { clamp0100 } from '../utils/clamp.js'
import { roundTo1 } from '../utils/round.js'

/**
 * Convert RGB to HWB
 * @param rgb - RGB color
 */
export function rgbToHwb(rgb: RgbColor | RgbaColor): HwbColor & { a: number } {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const w = Math.min(r, g, b)
  const v = Math.max(r, g, b)
  const b_ = 1 - v

  let h = 0
  if (v !== w) {
    const d = v - w
    if (v === r) {
      h = (g - b) / d + (g < b ? 6 : 0)
    } else if (v === g) {
      h = (b - r) / d + 2
    } else {
      h = (r - g) / d + 4
    }
    h /= 6
  }

  return {
    h: roundTo1(h * 360),
    w: roundTo1(clamp0100(w * 100)),
    b: roundTo1(clamp0100(b_ * 100)),
    a: ('a' in rgb ? (rgb as RgbaColor).a : 1)
  }
}

/**
 * Convert HWB to RGB
 * @param hwb - HWB color
 */
export function hwbToRgb(hwb: HwbColor): RgbaColor {
  const h = hwb.h / 360
  const w = hwb.w / 100
  const b = hwb.b / 100
  const a = hwb.a ?? 1

  // If whiteness + blackness > 1, scale them down
  let w_ = w
  let b_ = b
  if (w + b > 1) {
    const scale = 1 / (w + b)
    w_ = w * scale
    b_ = b * scale
  }

  // Convert hue to RGB
  let r: number, g: number, b_color: number

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = 1 - f
  const q = f

  switch (i % 6) {
    case 0: r = 1; g = q; b_color = 0; break
    case 1: r = p; g = 1; b_color = 0; break
    case 2: r = 0; g = 1; b_color = q; break
    case 3: r = 0; g = p; b_color = 1; break
    case 4: r = q; g = 0; b_color = 1; break
    case 5: r = 1; g = 0; b_color = p; break
    default: r = 0; g = 0; b_color = 0
  }

  // Apply whiteness and blackness
  r = r * (1 - w_ - b_) + w_
  g = g * (1 - w_ - b_) + w_
  b_color = b_color * (1 - w_ - b_) + w_

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b_color * 255),
    a
  }
}
