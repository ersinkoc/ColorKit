import type {
  Color,
  ColorInput,
  ColorFormat,
  RgbaColor,
  HslaColor,
  HsvaColor,
  HwbColor,
  CmykColor,
  WcagLevel,
  TextSize
} from '../types.js'
import { clamp0255, clamp01, clamp0100 } from '../utils/clamp.js'
import { rgbToHex, rgbToHex8 } from '../conversion/hex.js'
import { rgbToHsl, hslToRgb } from '../conversion/hsl.js'
import { rgbToHsv, hsvToRgb, hslToHsv, hsvToHsl } from '../conversion/hsv.js'
import { rgbToHwb, hwbToRgb } from '../conversion/hwb.js'
import { rgbToCmyk } from '../conversion/cmyk.js'
import { rgbToName } from '../conversion/named.js'
import { getLuminance, getContrast, isReadable as checkIsReadable } from '../accessibility/index.js'
import { parseColor } from './parse.js'
import { lighten, darken } from '../manipulation/lighten.js'
import { saturate, desaturate } from '../manipulation/saturate.js'
import { brighten } from '../manipulation/brighten.js'
import { spin } from '../manipulation/spin.js'
import { grayscale, invert, complement } from '../manipulation/invert.js'
import { fade, fadeIn, fadeOut, opaque, transparent } from '../manipulation/alpha.js'
import { mix } from '../mixing/mix.js'
import { tint, shade, tone } from '../mixing/tint.js'

/**
 * Core Color class - immutable color storage and manipulation
 */
export class ColorClass implements Color {
  private _r: number  // 0-255
  private _g: number  // 0-255
  private _b: number  // 0-255
  private _a: number  // 0-1

  constructor(r: number, g: number, b: number, a: number = 1) {
    this._r = clamp0255(r)
    this._g = clamp0255(g)
    this._b = clamp0255(b)
    this._a = clamp01(a)
  }

  // ============ FORMAT CONVERSION ============

  toHex(): string {
    return rgbToHex({ r: this._r, g: this._g, b: this._b })
  }

  toHexString(): string {
    return this.toHex()
  }

  toHex8(): string {
    return rgbToHex8({ r: this._r, g: this._g, b: this._b, a: this._a })
  }

  toHex8String(): string {
    return this.toHex8()
  }

  toRgb(): RgbaColor {
    return { r: this._r, g: this._g, b: this._b, a: this._a }
  }

  toRgbString(): string {
    return this._a === 1
      ? `rgb(${this._r}, ${this._g}, ${this._b})`
      : `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`
  }

  toRgbaString(): string {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`
  }

  toPercentageRgb(): RgbaColor {
    return {
      r: Math.round((this._r / 255) * 100),
      g: Math.round((this._g / 255) * 100),
      b: Math.round((this._b / 255) * 100),
      a: this._a
    }
  }

  toPercentageRgbString(): string {
    const r = Math.round((this._r / 255) * 100)
    const g = Math.round((this._g / 255) * 100)
    const b = Math.round((this._b / 255) * 100)
    return this._a === 1
      ? `rgb(${r}%, ${g}%, ${b}%)`
      : `rgba(${r}%, ${g}%, ${b}%, ${this._a})`
  }

  toHsl(): HslaColor {
    const hsl = rgbToHsl({ r: this._r, g: this._g, b: this._b })
    return { ...hsl, a: this._a }
  }

  toHslString(): string {
    const hsl = this.toHsl()
    return this._a === 1
      ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
      : `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`
  }

  toHslaString(): string {
    const hsl = this.toHsl()
    return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})`
  }

  toHsv(): HsvaColor {
    const hsv = rgbToHsv({ r: this._r, g: this._g, b: this._b })
    return { ...hsv, a: this._a }
  }

  toHsvString(): string {
    const hsv = this.toHsv()
    return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
  }

  toHwb(): HwbColor {
    const hwb = rgbToHwb({ r: this._r, g: this._g, b: this._b })
    return { ...hwb, a: this._a }
  }

  toHwbString(): string {
    const hwb = this.toHwb()
    return `hwb(${hwb.h} ${hwb.w}% ${hwb.b}%)`
  }

  toCmyk(): CmykColor {
    return rgbToCmyk({ r: this._r, g: this._g, b: this._b })
  }

  toCmykString(): string {
    const cmyk = this.toCmyk()
    return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
  }

  toName(): string | null {
    return rgbToName({ r: this._r, g: this._g, b: this._b })
  }

  toString(format?: ColorFormat): string {
    if (!format) return this.toHex()

    switch (format) {
      case 'hex': return this.toHex()
      case 'hex8': return this.toHex8()
      case 'rgb': return this.toRgbString()
      case 'rgba': return this.toRgbaString()
      case 'hsl': return this.toHslString()
      case 'hsla': return this.toHslaString()
      case 'hsv': return this.toHsvString()
      case 'hsva': return this.toHsvString().replace('hsv', 'hsva')
      case 'hwb': return this.toHwbString()
      case 'cmyk': return this.toCmykString()
      case 'name': return this.toName() || this.toHex()
      default: return this.toHex()
    }
  }

  toJSON(): RgbaColor {
    return this.toRgb()
  }

  // ============ COMPONENT GETTERS ============

  red(): number {
    return this._r
  }

  green(): number {
    return this._g
  }

  blue(): number {
    return this._b
  }

  alpha(): number {
    return this._a
  }

  hue(): number {
    return this.toHsl().h
  }

  saturation(): number {
    return this.toHsl().s
  }

  lightness(): number {
    return this.toHsl().l
  }

  saturationv(): number {
    return this.toHsv().s
  }

  brightness(): number {
    return this.toHsv().v
  }

  whiteness(): number {
    return this.toHwb().w
  }

  blackness(): number {
    return this.toHwb().b
  }

  luminance(): number {
    return getLuminance(this)
  }

  // ============ COMPONENT SETTERS (immutable) ============

  setRed(value: number): Color {
    return new ColorClass(value, this._g, this._b, this._a)
  }

  setGreen(value: number): Color {
    return new ColorClass(this._r, value, this._b, this._a)
  }

  setBlue(value: number): Color {
    return new ColorClass(this._r, this._g, value, this._a)
  }

  setAlpha(value: number): Color {
    return new ColorClass(this._r, this._g, this._b, value)
  }

  setHue(value: number): Color {
    const hsl = this.toHsl()
    hsl.h = value
    const rgb = hslToRgb(hsl)
    return new ColorClass(rgb.r, rgb.g, rgb.b, this._a)
  }

  setSaturation(value: number): Color {
    const hsl = this.toHsl()
    hsl.s = clamp0100(value)
    const rgb = hslToRgb(hsl)
    return new ColorClass(rgb.r, rgb.g, rgb.b, this._a)
  }

  setLightness(value: number): Color {
    const hsl = this.toHsl()
    hsl.l = clamp0100(value)
    const rgb = hslToRgb(hsl)
    return new ColorClass(rgb.r, rgb.g, rgb.b, this._a)
  }

  setBrightness(value: number): Color {
    const hsv = this.toHsv()
    hsv.v = clamp0100(value)
    const rgb = hsvToRgb(hsv)
    return new ColorClass(rgb.r, rgb.g, rgb.b, this._a)
  }

  // ============ MANIPULATION ============

  lighten(amount: number = 10): Color {
    return lighten(this, amount)
  }

  darken(amount: number = 10): Color {
    return darken(this, amount)
  }

  saturate(amount: number = 10): Color {
    return saturate(this, amount)
  }

  desaturate(amount: number = 10): Color {
    return desaturate(this, amount)
  }

  brighten(amount: number = 10): Color {
    return brighten(this, amount)
  }

  spin(degrees: number): Color {
    return spin(this, degrees)
  }

  grayscale(): Color {
    return grayscale(this)
  }

  invert(): Color {
    return invert(this)
  }

  complement(): Color {
    return complement(this)
  }

  // ============ ALPHA MANIPULATION ============

  fade(amount: number): Color {
    return fade(this, amount)
  }

  fadeIn(amount: number): Color {
    return fadeIn(this, amount)
  }

  fadeOut(amount: number): Color {
    return fadeOut(this, amount)
  }

  opaque(): Color {
    return opaque(this)
  }

  transparent(): Color {
    return transparent(this)
  }

  // ============ MIXING ============

  mix(color: ColorInput, amount: number = 50): Color {
    return mix(this, color, amount)
  }

  tint(amount: number = 10): Color {
    return tint(this, amount)
  }

  shade(amount: number = 10): Color {
    return shade(this, amount)
  }

  tone(amount: number = 10): Color {
    return tone(this, amount)
  }

  // ============ QUERIES ============

  isLight(): boolean {
    return this.luminance() > 0.5
  }

  isDark(): boolean {
    return !this.isLight()
  }

  isValid(): boolean {
    return true  // Always valid if constructed
  }

  // ============ CONTRAST & ACCESSIBILITY ============

  contrast(color: ColorInput): number {
    return getContrast(this, color)
  }

  isReadable(background: ColorInput, level: WcagLevel = 'AA', size: TextSize = 'normal'): boolean {
    return checkIsReadable(this, background, level, size)
  }

  // ============ COMPARISON ============

  equals(color: ColorInput): boolean {
    const c = parseColor(color)
    if (!c) return false
    return this._r === c._r && this._g === c._g && this._b === c._b && this._a === c._a
  }

  // ============ CLONE ============

  clone(): Color {
    return new ColorClass(this._r, this._g, this._b, this._a)
  }
}

// Export factory function
export function color(r: number, g: number, b: number, a?: number): Color
export function color(input: ColorInput): Color | null
export function color(input: number | ColorInput, g?: number, b?: number, a?: number): Color | null {
  if (typeof input === 'number') {
    return new ColorClass(input, g!, b!, a)
  }
  return parseColor(input as ColorInput)
}
