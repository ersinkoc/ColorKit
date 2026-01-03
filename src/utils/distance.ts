import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'

/**
 * Calculate Euclidean distance between two colors in RGB space
 */
export function colorDistance(color1: ColorInput, color2: ColorInput): number {
  const c1 = parseColor(color1)!
  const c2 = parseColor(color2)!

  return Math.sqrt(
    Math.pow(c1.red() - c2.red(), 2) +
    Math.pow(c1.green() - c2.green(), 2) +
    Math.pow(c1.blue() - c2.blue(), 2)
  )
}

/**
 * Calculate Delta E (CIE76 perceptual difference)
 */
export function deltaE(color1: ColorInput, color2: ColorInput): number {
  // For Delta E, we need to convert to LAB color space
  // This is a simplified version using RGB distance weighted by perception
  const c1 = parseColor(color1)!
  const c2 = parseColor(color2)!

  // Convert RGB to linear RGB
  const toLinear = (v: number) => {
    const s = v / 255
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }

  const r1 = toLinear(c1.red())
  const g1 = toLinear(c1.green())
  const b1 = toLinear(c1.blue())

  const r2 = toLinear(c2.red())
  const g2 = toLinear(c2.green())
  const bColor2 = toLinear(c2.blue())

  // Simple RGB to XYZ conversion (D65 illuminant)
  const toX = (r: number, g: number, b: number) => 0.4124 * r + 0.3576 * g + 0.1805 * b
  const toY = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b
  const toZ = (r: number, g: number, b: number) => 0.0193 * r + 0.1192 * g + 0.9505 * b

  const x1 = toX(r1, g1, b1), y1 = toY(r1, g1, b1), z1 = toZ(r1, g1, b1)
  const x2 = toX(r2, g2, bColor2), y2 = toY(r2, g2, bColor2), z2 = toZ(r2, g2, bColor2)

  // XYZ to LAB (simplified)
  const toLab = (v: number) => v > 0.008856 ? Math.pow(v, 1/3) : 7.787 * v + 16/116

  const fx = toLab(x1 / 0.9505), fy = toLab(y1), fz = toLab(z1 / 1.0890)
  const fx2 = toLab(x2 / 0.9505), fy2 = toLab(y2), fz2 = toLab(z2 / 1.0890)

  const l1 = 116 * fy - 16, a1 = 500 * (fx - fy), b_1 = 200 * (fy - fz)
  const l2 = 116 * fy2 - 16, a2 = 500 * (fx2 - fy2), b2 = 200 * (fy2 - fz2)

  // Delta E (CIE76)
  return Math.sqrt(Math.pow(l2 - l1, 2) + Math.pow(a2 - a1, 2) + Math.pow(b2 - b_1, 2))
}
