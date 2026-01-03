// ============ COLOR INPUT TYPES ============

/**
 * Any valid color input format
 */
export type ColorInput =
  | string                    // '#ff5733', 'rgb(255,87,51)', 'hsl(14,100%,60%)', 'red'
  | RgbColor
  | RgbaColor
  | HslColor
  | HslaColor
  | HsvColor
  | HsvaColor
  | HwbColor
  | CmykColor
  | Color

// ============ COLOR FORMAT INTERFACES ============

/**
 * RGB color (0-255 range)
 */
export interface RgbColor {
  r: number  // 0-255
  g: number  // 0-255
  b: number  // 0-255
}

/**
 * RGBA color with alpha channel
 */
export interface RgbaColor extends RgbColor {
  a: number  // 0-1
}

/**
 * HSL color
 */
export interface HslColor {
  h: number  // 0-360
  s: number  // 0-100
  l: number  // 0-100
}

/**
 * HSLA color with alpha channel
 */
export interface HslaColor extends HslColor {
  a: number  // 0-1
}

/**
 * HSV color
 */
export interface HsvColor {
  h: number  // 0-360
  s: number  // 0-100
  v: number  // 0-100
}

/**
 * HSVA color with alpha channel
 */
export interface HsvaColor extends HsvColor {
  a: number  // 0-1
}

/**
 * HWB color
 */
export interface HwbColor {
  h: number  // 0-360
  w: number  // 0-100 (whiteness)
  b: number  // 0-100 (blackness)
  a?: number // 0-1
}

/**
 * CMYK color
 */
export interface CmykColor {
  c: number  // 0-100
  m: number  // 0-100
  y: number  // 0-100
  k: number  // 0-100
}

/**
 * Supported color formats
 */
export type ColorFormat =
  | 'hex'
  | 'hex8'
  | 'rgb'
  | 'rgba'
  | 'hsl'
  | 'hsla'
  | 'hsv'
  | 'hsva'
  | 'hwb'
  | 'cmyk'
  | 'name'

// ============ WCAG TYPES ============

/**
 * WCAG compliance level
 */
export type WcagLevel = 'AA' | 'AAA'

/**
 * Text size for accessibility checks
 */
export type TextSize = 'normal' | 'large'

// ============ COLOR PICKER TYPES ============

/**
 * Color picker configuration options
 */
export interface ColorPickerConfig {
  // Value
  value?: ColorInput
  defaultValue?: ColorInput

  // Format
  format?: ColorFormat
  outputFormat?: ColorFormat

  // Alpha
  showAlpha?: boolean
  defaultAlpha?: number

  // Presets/swatches
  presets?: ColorInput[]
  showPresets?: boolean

  // Input
  showInput?: boolean
  inputFormat?: ColorFormat

  // Eye dropper
  showEyeDropper?: boolean

  // Layout
  showHue?: boolean
  showSaturation?: boolean

  // Callbacks
  onChange?: (color: Color) => void
  onChangeComplete?: (color: Color) => void
  onFormatChange?: (format: ColorFormat) => void

  // Accessibility
  id?: string
  ariaLabel?: string
}

/**
 * Color picker state
 */
export interface ColorPickerState {
  color: Color
  hue: number           // 0-360
  saturation: number    // 0-100 (HSV)
  brightness: number    // 0-100 (HSV)
  alpha: number         // 0-1
  inputValue: string
  inputFormat: ColorFormat
  isDragging: boolean
  activeArea: 'saturation' | 'hue' | 'alpha' | null
}

/**
 * Position in color picker (normalized 0-1)
 */
export interface Position {
  x: number  // 0-1
  y: number  // 0-1
}

/**
 * Color picker events
 */
export type PickerEvent =
  | 'change'
  | 'changeComplete'
  | 'dragStart'
  | 'dragEnd'
  | 'formatChange'

/**
 * Picker event handler type
 */
export type PickerEventHandler<E extends PickerEvent> =
  E extends 'change' ? (color: Color) => void :
  E extends 'changeComplete' ? (color: Color) => void :
  E extends 'dragStart' ? (area: 'saturation' | 'hue' | 'alpha') => void :
  E extends 'dragEnd' ? (area: 'saturation' | 'hue' | 'alpha') => void :
  E extends 'formatChange' ? (format: ColorFormat) => void :
  never

// ============ PROPS GETTERS TYPES ============

/**
 * Base picker props
 */
export interface PickerProps {
  ref: (el: HTMLElement | null) => void
  role: 'application'
  'aria-label': string
  'aria-roledescription': 'color picker'
  'data-colorkit': string
}

/**
 * Saturation area props
 */
export interface SaturationAreaProps {
  ref: (el: HTMLElement | null) => void
  role: 'slider'
  'aria-label': string
  'aria-valuetext': string
  tabIndex: number
  style: {
    backgroundColor: string
  }
  onMouseDown: (e: MouseEvent) => void
  onTouchStart: (e: TouchEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

/**
 * Slider props (hue/alpha)
 */
export interface SliderProps {
  ref: (el: HTMLElement | null) => void
  role: 'slider'
  'aria-label': string
  'aria-valuemin': number
  'aria-valuemax': number
  'aria-valuenow': number
  'aria-valuetext': string
  tabIndex: number
  onMouseDown: (e: MouseEvent) => void
  onTouchStart: (e: TouchEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

/**
 * Thumb props
 */
export interface ThumbProps {
  role: 'presentation'
  style: {
    left?: string
    top?: string
    backgroundColor: string
  }
}

/**
 * Input props
 */
export interface InputProps {
  ref: (el: HTMLInputElement | null) => void
  type: 'text'
  value: string
  'aria-label': string
  onChange: (e: Event) => void
  onBlur: (e: FocusEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

/**
 * Select props
 */
export interface SelectProps {
  ref: (el: HTMLSelectElement | null) => void
  value: ColorFormat
  'aria-label': string
  onChange: (e: Event) => void
}

/**
 * Preset/swatch props
 */
export interface PresetProps {
  role: 'button'
  'aria-label': string
  'aria-pressed': boolean
  tabIndex: number
  style: {
    backgroundColor: string
  }
  onClick: (e: MouseEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

/**
 * Eye dropper props
 */
export interface EyeDropperProps {
  type: 'button'
  'aria-label': string
  disabled: boolean
  onClick: (e: MouseEvent) => void
}

// ============ COLOR INSTANCE TYPE ============

/**
 * Color class interface (forward declaration)
 * This will be implemented by the Color class
 */
export interface Color {
  // ========== FORMAT CONVERSION ==========
  toHex(): string
  toHexString(): string
  toHex8(): string
  toHex8String(): string
  toRgb(): RgbaColor
  toRgbString(): string
  toRgbaString(): string
  toPercentageRgb(): RgbaColor
  toPercentageRgbString(): string
  toHsl(): HslaColor
  toHslString(): string
  toHslaString(): string
  toHsv(): HsvaColor
  toHsvString(): string
  toHwb(): HwbColor
  toHwbString(): string
  toCmyk(): CmykColor
  toCmykString(): string
  toName(): string | null
  toString(format?: ColorFormat): string
  toJSON(): RgbaColor

  // ========== COMPONENT GETTERS ==========
  red(): number
  green(): number
  blue(): number
  alpha(): number
  hue(): number
  saturation(): number
  lightness(): number
  saturationv(): number
  brightness(): number
  whiteness(): number
  blackness(): number

  // ========== COMPONENT SETTERS (immutable) ==========
  setRed(value: number): Color
  setGreen(value: number): Color
  setBlue(value: number): Color
  setAlpha(value: number): Color
  setHue(value: number): Color
  setSaturation(value: number): Color
  setLightness(value: number): Color
  setBrightness(value: number): Color

  // ========== MANIPULATION ==========
  lighten(amount?: number): Color
  darken(amount?: number): Color
  saturate(amount?: number): Color
  desaturate(amount?: number): Color
  brighten(amount?: number): Color
  spin(degrees: number): Color
  grayscale(): Color
  invert(): Color
  complement(): Color

  // ========== ALPHA MANIPULATION ==========
  fade(amount: number): Color
  fadeIn(amount: number): Color
  fadeOut(amount: number): Color
  opaque(): Color
  transparent(): Color

  // ========== MIXING ==========
  mix(color: ColorInput, amount?: number): Color
  tint(amount?: number): Color
  shade(amount?: number): Color
  tone(amount?: number): Color

  // ========== QUERIES ==========
  isLight(): boolean
  isDark(): boolean
  isValid(): boolean

  // ========== CONTRAST & ACCESSIBILITY ==========
  luminance(): number
  contrast(color: ColorInput): number
  isReadable(background: ColorInput, level?: WcagLevel, size?: TextSize): boolean

  // ========== COMPARISON ==========
  equals(color: ColorInput): boolean

  // ========== CLONE ==========
  clone(): Color
}

// ============ UTILITY TYPES ============

/**
 * Blend mode types
 */
export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'

/**
 * Palette generation options
 */
export interface PaletteOptions {
  tints?: number
  shades?: number
  tones?: number
}

/**
 * Random color options
 */
export interface RandomColorOptions {
  luminance?: 'light' | 'dark'
  saturation?: [number, number]
  hue?: [number, number]
  alpha?: number
}

/**
 * Gradient stop
 */
export interface GradientStop {
  color: ColorInput
  position: number  // 0-100
}

/**
 * Gradient options
 */
export interface GradientOptions {
  type?: 'linear' | 'radial'
  angle?: number
}

/**
 * Parsed gradient
 */
export interface Gradient {
  type: 'linear' | 'radial'
  angle: number
  stops: Array<{ color: string; position: number }>
}

/**
 * Color harmony options
 */
export interface HarmonyOptions {
  count?: number
  angle?: number
}
