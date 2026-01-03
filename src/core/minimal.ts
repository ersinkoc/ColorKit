/**
 * Minimal Color class - < 4KB bundle
 * Only includes RGB storage and basic HEX parsing
 */

/**
 * Minimal Color class for core functionality
 */
export class MinimalColor {
  private _r: number  // 0-255
  private _g: number  // 0-255
  private _b: number  // 0-255
  private _a: number  // 0-1

  constructor(r: number, g: number, b: number, a: number = 1) {
    this._r = clamp(r, 0, 255)
    this._g = clamp(g, 0, 255)
    this._b = clamp(b, 0, 255)
    this._a = clamp(a, 0, 1)
  }

  /** Get red channel (0-255) */
  get red(): number { return this._r }
  /** Get green channel (0-255) */
  get green(): number { return this._g }
  /** Get blue channel (0-255) */
  get blue(): number { return this._b }
  /** Get alpha channel (0-1) */
  get alpha(): number { return this._a }

  /** Get RGB object */
  toRgb(): { r: number; g: number; b: number; a: number } {
    return { r: this._r, g: this._g, b: this._b, a: this._a }
  }

  /** Convert to HEX string */
  toHex(): string {
    const r = round(this._r).toString(16).padStart(2, '0')
    const g = round(this._g).toString(16).padStart(2, '0')
    const b = round(this._b).toString(16).padStart(2, '0')
    return `#${r}${g}${b}`
  }

  /** Convert to HEX8 string (with alpha) */
  toHex8(): string {
    const hex = this.toHex()
    const a = round(this._a * 255).toString(16).padStart(2, '0')
    return `${hex}${a}`
  }

  /** Convert to RGB string */
  toString(): string {
    return this._a === 1
      ? `rgb(${this._r}, ${this._g}, ${this._b})`
      : `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`
  }

  /** Create a copy */
  clone(): MinimalColor {
    return new MinimalColor(this._r, this._g, this._b, this._a)
  }
}

/** Clamp value between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Round to nearest integer */
function round(value: number): number {
  return Math.round(value)
}

/** Minimal HEX parser - only supports 3, 6, and 8 digit HEX */
export function parseMinimalHex(hex: string): MinimalColor | null {
  const trimmed = hex.trim()

  // Remove # prefix
  const h = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed

  // 3 digits: #RGB -> #RRGGBB
  if (/^[0-9a-f]{3}$/i.test(h)) {
    const chars = h.split('')
    const r = parseInt((chars[0] ?? '') + (chars[0] ?? ''), 16)
    const g = parseInt((chars[1] ?? '') + (chars[1] ?? ''), 16)
    const b = parseInt((chars[2] ?? '') + (chars[2] ?? ''), 16)
    return new MinimalColor(r, g, b, 1)
  }

  // 6 digits: #RRGGBB
  if (/^[0-9a-f]{6}$/i.test(h)) {
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return new MinimalColor(r, g, b, 1)
  }

  // 8 digits: #RRGGBBAA
  if (/^[0-9a-f]{8}$/i.test(h)) {
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    const a = parseInt(h.slice(6, 8), 16) / 255
    return new MinimalColor(r, g, b, a)
  }

  return null
}

/** Create a color from RGB values */
export function rgb(r: number, g: number, b: number, a: number = 1): MinimalColor {
  return new MinimalColor(r, g, b, a)
}

/** Create a color from HEX string */
export function hex(hex: string): MinimalColor {
  const color = parseMinimalHex(hex)
  if (!color) throw new Error(`Invalid HEX color: ${hex}`)
  return color
}
