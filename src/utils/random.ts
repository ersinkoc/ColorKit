import type { RandomColorOptions, HslaColor } from '../types.js'
import { ColorClass } from '../core/color.js'
import { hslToRgb } from '../conversion/hsl.js'

/**
 * Generate a random color
 */
export function randomColor(options: RandomColorOptions = {}): ColorClass {
  const { luminance: lum, saturation: sat, hue: hueRange, alpha: alpha = 1 } = options

  let h: number, s: number, l: number

  if (hueRange) {
    h = Math.random() * (hueRange[1] - hueRange[0]) + hueRange[0]
  } else {
    h = Math.random() * 360
  }

  if (sat) {
    s = Math.random() * (sat[1] - sat[0]) + sat[0]
  } else {
    s = Math.random() * 100
  }

  if (lum === 'light') {
    l = Math.random() * 40 + 60
  } else if (lum === 'dark') {
    l = Math.random() * 40
  } else {
    l = Math.random() * 100
  }

  const hsla: HslaColor = { h: Math.round(h), s: Math.round(s), l: Math.round(l), a: alpha }
  const rgb = hslToRgb(hsla)
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Generate a random HEX color
 */
export function randomHex(): string {
  return randomColor().toHex()
}

/**
 * Generate an array of random colors
 */
export function randomPalette(count: number = 5): ColorClass[] {
  return Array.from({ length: count }, () => randomColor())
}
