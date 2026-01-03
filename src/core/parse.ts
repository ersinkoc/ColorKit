import type { ColorInput, ColorFormat, RgbColor, RgbaColor, HslColor, HslaColor, HsvColor, HsvaColor, HwbColor, CmykColor } from '../types.js'
import { hexToRgb } from '../conversion/hex.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { rgbToHsv, hsvToRgb } from '../conversion/hsv.js'
import { rgbToHwb, hwbToRgb } from '../conversion/hwb.js'
import { rgbToCmyk, cmykToRgb } from '../conversion/cmyk.js'
import { getNamedColor } from '../conversion/named.js'
import { clamp0255, clamp01, clamp0100 } from '../utils/clamp.js'
import { ColorClass } from './color.js'

// Regex patterns
const HEX_REGEX = /^#?([0-9a-f]{3,8})$/i
const RGB_REGEX = /^rgba?\(\s*(\d+%?)\s*[,\s]\s*(\d+%?)\s*[,\s]\s*(\d+%?)\s*(?:[,\s/]\s*([\d.]+)\s*)?\)$/i
const HSL_REGEX = /^hsla?\(\s*(\d+)\s*[,\s]\s*(\d+)%\s*[,\s]\s*(\d+)%\s*(?:[,\s/]\s*([\d.]+)\s*)?\)$/i
const HSV_REGEX = /^hsva?\(\s*(\d+)\s*[,\s]\s*(\d+)%\s*[,\s]\s*(\d+)%\s*(?:[,\s/]\s*([\d.]+)\s*)?\)$/i
const HWB_REGEX = /^hwb\(\s*(\d+)\s*[,\s]\s*(\d+)%\s*[,\s]\s*(\d+)%\s*(?:[\/,]\s*([\d.]+)\s*)?\)$/i
const CMYK_REGEX = /^cmyk\(\s*(\d+)%\s*[,\s]\s*(\d+)%\s*[,\s]\s*(\d+)%\s*[,\s]\s*(\d+)%\s*\)$/i

/**
 * Parse a color from any supported format
 * @param input - Color input (string or object)
 * @returns Color instance or null if invalid
 */
export function parseColor(input: ColorInput): ColorClass | null {
  // If it's already a Color, return a clone
  if (input instanceof ColorClass) {
    return input.clone() as ColorClass
  }

  // String parsing
  if (typeof input === 'string') {
    const trimmed = input.trim()

    // Empty string
    if (!trimmed) return null

    // HEX
    if (HEX_REGEX.test(trimmed)) {
      return parseHex(trimmed)
    }

    // RGB
    if (RGB_REGEX.test(trimmed)) {
      return parseRgbString(trimmed)
    }

    // HSL
    if (HSL_REGEX.test(trimmed)) {
      return parseHslString(trimmed)
    }

    // HSV
    if (HSV_REGEX.test(trimmed)) {
      return parseHsvString(trimmed)
    }

    // HWB
    if (HWB_REGEX.test(trimmed)) {
      return parseHwbString(trimmed)
    }

    // CMYK
    if (CMYK_REGEX.test(trimmed)) {
      return parseCmykString(trimmed)
    }

    // Named color
    const named = getNamedColor(trimmed)
    if (named) {
      return new ColorClass(named.r, named.g, named.b, named.a)
    }
  }

  // Object parsing
  if (typeof input === 'object' && input !== null) {
    return parseObject(input as RgbColor | RgbaColor | HslColor | HslaColor | HsvColor | HsvaColor | HwbColor | CmykColor)
  }

  return null
}

/**
 * Parse HEX color string
 */
function parseHex(hex: string): ColorClass | null {
  try {
    const rgb = hexToRgb(hex)
    return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
  } catch {
    return null
  }
}

/**
 * Parse RGB/HSL color object
 */
function parseObject(input: RgbColor | RgbaColor | HslColor | HslaColor | HsvColor | HsvaColor | HwbColor | CmykColor): ColorClass | null {
  // RGB
  if ('r' in input && 'g' in input && 'b' in input) {
    const a = 'a' in input ? input.a : 1
    return new ColorClass(input.r, input.g, input.b, a)
  }

  // HSL
  if ('h' in input && 's' in input && 'l' in input) {
    const a = 'a' in input ? input.a! : 1
    const hsla: HslaColor = { h: input.h, s: input.s, l: input.l, a }
    const rgb = hslToRgb(hsla)
    return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
  }

  // HSV
  if ('h' in input && 's' in input && 'v' in input) {
    const a = 'a' in input ? input.a! : 1
    const hsva: HsvaColor = { h: input.h, s: input.s, v: input.v, a }
    const rgb = hsvToRgb(hsva)
    return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
  }

  // HWB
  if ('h' in input && 'w' in input && 'b' in input) {
    const a = input.a ?? 1
    const rgb = hwbToRgb({ h: input.h, w: input.w, b: input.b, a })
    return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
  }

  // CMYK
  if ('c' in input && 'm' in input && 'y' in input && 'k' in input) {
    const rgb = cmykToRgb(input as CmykColor)
    return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
  }

  return null
}

/**
 * Parse RGB string
 */
function parseRgbString(str: string): ColorClass | null {
  const match = str.match(RGB_REGEX)
  if (!match) return null

  let r = parseColorValue(match[1]!)
  let g = parseColorValue(match[2]!)
  let b = parseColorValue(match[3]!)
  const a = match[4] ? clamp01(parseFloat(match[4])) : 1

  if (r === null || g === null || b === null) return null

  return new ColorClass(r, g, b, a)
}

/**
 * Parse HSL string
 */
function parseHslString(str: string): ColorClass | null {
  const match = str.match(HSL_REGEX)
  if (!match) return null

  const h = parseFloat(match[1]!) % 360
  const s = clamp0100(parseFloat(match[2]!))
  const l = clamp0100(parseFloat(match[3]!))
  const a = match[4] ? clamp01(parseFloat(match[4])) : 1

  const hsla: HslaColor = { h, s, l, a }
  const rgb = hslToRgb(hsla)
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Parse HSV string
 */
function parseHsvString(str: string): ColorClass | null {
  const match = str.match(HSV_REGEX)
  if (!match) return null

  const h = parseFloat(match[1]!) % 360
  const s = clamp0100(parseFloat(match[2]!))
  const v = clamp0100(parseFloat(match[3]!))
  const a = match[4] ? clamp01(parseFloat(match[4])) : 1

  const hsva: HsvaColor = { h, s, v, a }
  const rgb = hsvToRgb(hsva)
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Parse HWB string
 */
function parseHwbString(str: string): ColorClass | null {
  const match = str.match(HWB_REGEX)
  if (!match) return null

  const h = parseFloat(match[1]!) % 360
  const w = clamp0100(parseFloat(match[2]!))
  const b = clamp0100(parseFloat(match[3]!))
  const a = match[4] ? clamp01(parseFloat(match[4])) : 1

  const rgb = hwbToRgb({ h, w, b, a })
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Parse CMYK string
 */
function parseCmykString(str: string): ColorClass | null {
  const match = str.match(CMYK_REGEX)
  if (!match) return null

  const c = clamp0100(parseFloat(match[1]!))
  const m = clamp0100(parseFloat(match[2]!))
  const y = clamp0100(parseFloat(match[3]!))
  const k = clamp0100(parseFloat(match[4]!))

  const rgb = cmykToRgb({ c, m, y, k })
  return new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
}

/**
 * Parse a color value (can be percentage or 0-255)
 */
function parseColorValue(value: string): number | null {
  value = value.trim()

  // Percentage
  if (value.endsWith('%')) {
    const pct = parseFloat(value.slice(0, -1))
    if (isNaN(pct)) return null
    return Math.round((pct / 100) * 255)
  }

  // 0-255
  const num = parseFloat(value)
  if (isNaN(num)) return null
  return clamp0255(Math.round(num))
}

/**
 * Detect color format from string
 */
export function detectFormat(str: string): ColorFormat | null {
  const trimmed = str.trim()

  if (HEX_REGEX.test(trimmed)) {
    return trimmed.replace('#', '').length <= 6 ? 'hex' : 'hex8'
  }

  if (RGB_REGEX.test(trimmed)) {
    return trimmed.includes('rgba') ? 'rgba' : 'rgb'
  }

  if (HSL_REGEX.test(trimmed)) {
    return trimmed.includes('hsla') ? 'hsla' : 'hsl'
  }

  if (HSV_REGEX.test(trimmed)) {
    return trimmed.includes('hsva') ? 'hsva' : 'hsv'
  }

  if (HWB_REGEX.test(trimmed)) return 'hwb'
  if (CMYK_REGEX.test(trimmed)) return 'cmyk'

  if (getNamedColor(trimmed)) return 'name'

  return null
}

/**
 * Check if a string is a valid color
 */
export function isValidColor(str: string): boolean {
  return parseColor(str) !== null
}
