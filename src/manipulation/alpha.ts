import type { ColorInput } from '../types.js'
import { parseColor } from '../core/parse.js'
import { ColorClass } from '../core/color.js'
import { clamp01 } from '../utils/clamp.js'

/**
 * Set alpha to a specific value
 */
export function fade(color: ColorInput, amount: number): ColorClass {
  const c = parseColor(color)!
  return new ColorClass(c.red(), c.green(), c.blue(), clamp01(amount))
}

/**
 * Increase alpha by amount
 */
export function fadeIn(color: ColorInput, amount: number): ColorClass {
  const c = parseColor(color)!
  return new ColorClass(c.red(), c.green(), c.blue(), clamp01(c.alpha() + amount))
}

/**
 * Decrease alpha by amount
 */
export function fadeOut(color: ColorInput, amount: number): ColorClass {
  const c = parseColor(color)!
  return new ColorClass(c.red(), c.green(), c.blue(), clamp01(c.alpha() - amount))
}

/**
 * Set alpha to 1 (fully opaque)
 */
export function opaque(color: ColorInput): ColorClass {
  const c = parseColor(color)!
  return new ColorClass(c.red(), c.green(), c.blue(), 1)
}

/**
 * Set alpha to 0 (fully transparent)
 */
export function transparent(color: ColorInput): ColorClass {
  const c = parseColor(color)!
  return new ColorClass(c.red(), c.green(), c.blue(), 0)
}
