import type { ColorInput, BlendMode } from '../types.js'
import { parseColor } from '../core/parse.js'
import { ColorClass } from '../core/color.js'
import { clamp0255 } from '../utils/clamp.js'

/**
 * Blend two colors using a blend mode
 */
export function blend(color1: ColorInput, color2: ColorInput, mode: BlendMode): ColorClass {
  const c1 = parseColor(color1)!  // top
  const c2 = parseColor(color2)!  // bottom

  // Handle normal mode (alpha compositing)
  if (mode === 'normal') {
    const a = c1.alpha()
    const r = Math.round(c1.red() * a + c2.red() * (1 - a))
    const g = Math.round(c1.green() * a + c2.green() * (1 - a))
    const b = Math.round(c1.blue() * a + c2.blue() * (1 - a))
    // For normal mode, blend alphas using "over" operator
    const alpha = a + c2.alpha() * (1 - a)
    return new ColorClass(r, g, b, alpha)
  }

  const r = blendChannel(c1.red(), c2.red(), mode)
  const g = blendChannel(c1.green(), c2.green(), mode)
  const b = blendChannel(c1.blue(), c2.blue(), mode)

  return new ColorClass(r, g, b, c1.alpha())
}

function blendChannel(a: number, b: number, mode: BlendMode): number {
  const aa = a / 255
  const ab = b / 255

  let result: number

  switch (mode) {
    case 'multiply':
      result = aa * ab
      break
    case 'screen':
      result = 1 - (1 - aa) * (1 - ab)
      break
    case 'overlay':
      result = aa < 0.5 ? 2 * aa * ab : 1 - 2 * (1 - aa) * (1 - ab)
      break
    case 'darken':
      result = Math.min(aa, ab)
      break
    case 'lighten':
      result = Math.max(aa, ab)
      break
    case 'color-dodge':
      result = ab === 1 ? 1 : Math.min(1, aa / (1 - ab))
      break
    case 'color-burn':
      result = ab === 0 ? 0 : 1 - Math.min(1, (1 - aa) / ab)
      break
    case 'hard-light':
      result = ab < 0.5 ? 2 * aa * ab : 1 - 2 * (1 - aa) * (1 - ab)
      break
    case 'soft-light':
      result = ab < 0.5
        ? aa - (1 - 2 * ab) * aa * (1 - aa)
        : aa + (2 * ab - 1) * (Math.sqrt(aa) - aa)
      break
    case 'difference':
      result = Math.abs(aa - ab)
      break
    case 'exclusion':
      result = aa + ab - 2 * aa * ab
      break
    default:
      result = ab
  }

  return clamp0255(Math.round(result * 255))
}
