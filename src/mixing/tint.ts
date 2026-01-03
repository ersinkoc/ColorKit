import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { mix } from './mix.js'
import { ColorClass } from '../core/color.js'

/**
 * Mix a color with white (tint)
 * @param color - Input color
 * @param amount - Amount to mix (0-100), default 10
 */
export function tint(color: ColorInput, amount: number = 10): ColorClass {
  const c = parseColor(color)!
  const ratio = Math.max(0, Math.min(1, amount / 100))
  const result = mix(c, { r: 255, g: 255, b: 255, a: c.alpha() }, ratio)
  return result.setAlpha(c.alpha()) as ColorClass
}

/**
 * Mix a color with black (shade)
 * @param color - Input color
 * @param amount - Amount to mix (0-100), default 10
 */
export function shade(color: ColorInput, amount: number = 10): ColorClass {
  const c = parseColor(color)!
  const ratio = Math.max(0, Math.min(1, amount / 100))
  const result = mix(c, { r: 0, g: 0, b: 0, a: c.alpha() }, ratio)
  return result.setAlpha(c.alpha()) as ColorClass
}

/**
 * Mix a color with gray (tone)
 * @param color - Input color
 * @param amount - Amount to mix (0-100), default 10
 */
export function tone(color: ColorInput, amount: number = 10): ColorClass {
  const c = parseColor(color)!
  const ratio = Math.max(0, Math.min(1, amount / 100))
  const result = mix(c, { r: 128, g: 128, b: 128, a: c.alpha() }, ratio)
  return result.setAlpha(c.alpha()) as ColorClass
}
