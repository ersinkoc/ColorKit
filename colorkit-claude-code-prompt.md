# ColorKit - Headless Color Picker and Utilities with Format Conversion and Accessibility

## Package Identity

- **NPM Package**: `@oxog/colorkit`
- **GitHub Repository**: `https://github.com/ersinkoc/colorkit`
- **Documentation Site**: `https://colorkit.oxog.dev`
- **License**: MIT
- **Author**: Ersin KOÇ
- **Created**: 2025-12-30

**NO social media, Discord, email, or external links.**

## Package Description

Zero-dependency headless color picker and utilities with format conversion and accessibility checking.

ColorKit is a lightweight, framework-agnostic library for color manipulation and color picker components in web applications. Features color parsing from HEX, RGB, HSL, HSV, HWB, CMYK and named colors, seamless format conversion between all color spaces, color manipulation with lighten, darken, saturate, desaturate, brighten, spin, grayscale, and invert operations, full alpha channel support, color harmony generation including complementary, triadic, tetradic, analogous, and split-complementary, automatic palette generation with shades, tints, and tones, WCAG contrast ratio calculation with AA/AAA readability checking, color mixing and blending, headless color picker with props getters, interactive saturation/brightness area, hue slider, alpha slider, EyeDropper API integration for screen color picking, and comprehensive React integration with useColorPicker, useColor hooks and ColorPicker, ColorInput, ColorSwatch, HuePicker, SaturationPicker, AlphaPicker components—all under 4KB with zero runtime dependencies.

---

## NON-NEGOTIABLE RULES

These rules are ABSOLUTE and must be followed without exception:

### 1. ZERO DEPENDENCIES
```json
{
  "dependencies": {}  // MUST BE EMPTY - NO EXCEPTIONS
}
```
Implement EVERYTHING from scratch. No runtime dependencies allowed.

### 2. 100% TEST COVERAGE & 100% SUCCESS RATE
- Every line of code must be tested
- Every branch must be tested
- All tests must pass (100% success rate)
- Use Vitest for testing
- Coverage report must show 100%

### 3. DEVELOPMENT WORKFLOW
Create these documents FIRST, before any code:
1. **SPECIFICATION.md** - Complete package specification
2. **IMPLEMENTATION.md** - Architecture and design decisions
3. **TASKS.md** - Ordered task list with dependencies

Only after these documents are complete, implement the code following TASKS.md sequentially.

### 4. TYPESCRIPT STRICT MODE
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

### 5. NO EXTERNAL LINKS
- ❌ No social media (Twitter, LinkedIn, etc.)
- ❌ No Discord/Slack links
- ❌ No email addresses
- ❌ No donation/sponsor links
- ✅ Only GitHub repo and documentation site allowed

### 6. BUNDLE SIZE TARGET
- Core package: < 4KB minified + gzipped
- With React adapter: < 6KB
- Tree-shakeable

---

## CORE TYPES

```typescript
// ============ COLOR INPUT ============

type ColorInput = 
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

// ============ COLOR FORMATS ============

interface RgbColor {
  r: number  // 0-255
  g: number  // 0-255
  b: number  // 0-255
}

interface RgbaColor extends RgbColor {
  a: number  // 0-1
}

interface HslColor {
  h: number  // 0-360
  s: number  // 0-100
  l: number  // 0-100
}

interface HslaColor extends HslColor {
  a: number  // 0-1
}

interface HsvColor {
  h: number  // 0-360
  s: number  // 0-100
  v: number  // 0-100
}

interface HsvaColor extends HsvColor {
  a: number  // 0-1
}

interface HwbColor {
  h: number  // 0-360
  w: number  // 0-100 (whiteness)
  b: number  // 0-100 (blackness)
  a?: number // 0-1
}

interface CmykColor {
  c: number  // 0-100
  m: number  // 0-100
  y: number  // 0-100
  k: number  // 0-100
}

type ColorFormat = 
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

// ============ COLOR INSTANCE ============

interface Color {
  // ========== FORMAT CONVERSION ==========
  toHex(): string                    // '#ff5733'
  toHexString(): string              // '#ff5733'
  toHex8(): string                   // '#ff5733ff'
  toHex8String(): string             // '#ff5733ff'
  toRgb(): RgbaColor                 // { r, g, b, a }
  toRgbString(): string              // 'rgb(255, 87, 51)'
  toRgbaString(): string             // 'rgba(255, 87, 51, 1)'
  toPercentageRgb(): RgbaColor       // { r: 100, g: 34, b: 20, a: 1 }
  toPercentageRgbString(): string    // 'rgb(100%, 34%, 20%)'
  toHsl(): HslaColor                 // { h, s, l, a }
  toHslString(): string              // 'hsl(14, 100%, 60%)'
  toHslaString(): string             // 'hsla(14, 100%, 60%, 1)'
  toHsv(): HsvaColor                 // { h, s, v, a }
  toHsvString(): string              // 'hsv(14, 80%, 100%)'
  toHwb(): HwbColor                  // { h, w, b, a }
  toHwbString(): string              // 'hwb(14 0% 0%)'
  toCmyk(): CmykColor                // { c, m, y, k }
  toCmykString(): string             // 'cmyk(0%, 66%, 80%, 0%)'
  toName(): string | null            // 'tomato' or null
  toString(format?: ColorFormat): string
  toJSON(): string
  
  // ========== COMPONENT GETTERS ==========
  red(): number                      // 0-255
  green(): number                    // 0-255
  blue(): number                     // 0-255
  alpha(): number                    // 0-1
  hue(): number                      // 0-360
  saturation(): number               // 0-100 (HSL saturation)
  lightness(): number                // 0-100
  saturationv(): number              // 0-100 (HSV saturation)
  brightness(): number               // 0-100 (HSV value)
  whiteness(): number                // 0-100 (HWB)
  blackness(): number                // 0-100 (HWB)
  
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
  lighten(amount?: number): Color          // Default: 10
  darken(amount?: number): Color           // Default: 10
  saturate(amount?: number): Color         // Default: 10
  desaturate(amount?: number): Color       // Default: 10
  brighten(amount?: number): Color         // Default: 10
  spin(degrees: number): Color             // Rotate hue
  grayscale(): Color
  invert(): Color
  complement(): Color                      // 180° hue rotation
  
  // ========== ALPHA MANIPULATION ==========
  fade(amount: number): Color              // Set alpha to amount (0-1)
  fadeIn(amount: number): Color            // Increase alpha
  fadeOut(amount: number): Color           // Decrease alpha
  opaque(): Color                          // Set alpha to 1
  transparent(): Color                     // Set alpha to 0
  
  // ========== MIXING ==========
  mix(color: ColorInput, amount?: number): Color  // Default: 50
  tint(amount?: number): Color             // Mix with white
  shade(amount?: number): Color            // Mix with black
  tone(amount?: number): Color             // Mix with gray
  
  // ========== QUERIES ==========
  isLight(): boolean
  isDark(): boolean
  isValid(): boolean
  
  // ========== CONTRAST & ACCESSIBILITY ==========
  luminance(): number                      // 0-1
  contrast(color: ColorInput): number      // Contrast ratio
  isReadable(background: ColorInput, level?: WcagLevel, size?: TextSize): boolean
  
  // ========== COMPARISON ==========
  equals(color: ColorInput): boolean
  
  // ========== CLONE ==========
  clone(): Color
}

type WcagLevel = 'AA' | 'AAA'
type TextSize = 'normal' | 'large'

// ============ COLOR PICKER CONFIG ============

interface ColorPickerConfig {
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

// ============ COLOR PICKER STATE ============

interface ColorPickerState {
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

// ============ COLOR PICKER INSTANCE ============

interface ColorPicker {
  // Mount/unmount
  mount(container: HTMLElement): void
  unmount(): void
  isMounted(): boolean
  
  // State
  getState(): ColorPickerState
  subscribe(callback: (state: ColorPickerState) => void): () => void
  
  // Value
  getValue(): Color
  setValue(color: ColorInput): void
  
  // Component control
  setHue(hue: number): void
  setSaturation(saturation: number): void
  setBrightness(brightness: number): void
  setAlpha(alpha: number): void
  setFromPosition(area: 'saturation' | 'hue' | 'alpha', position: Position): void
  
  // Input
  setInputValue(value: string): void
  setInputFormat(format: ColorFormat): void
  parseInput(): void
  
  // Eye dropper
  isEyeDropperSupported(): boolean
  pickFromScreen(): Promise<Color | null>
  
  // Props getters
  getPickerProps(): PickerProps
  getSaturationAreaProps(): SaturationAreaProps
  getSaturationThumbProps(): ThumbProps
  getHueSliderProps(): SliderProps
  getHueThumbProps(): ThumbProps
  getAlphaSliderProps(): SliderProps
  getAlphaThumbProps(): ThumbProps
  getInputProps(): InputProps
  getFormatSelectProps(): SelectProps
  getPresetProps(color: ColorInput): PresetProps
  getEyeDropperProps(): EyeDropperProps
  
  // Events
  on<E extends PickerEvent>(event: E, handler: PickerEventHandler<E>): () => void
  off<E extends PickerEvent>(event: E, handler: PickerEventHandler<E>): void
  
  // Config
  getConfig(): ColorPickerConfig
  setConfig(config: Partial<ColorPickerConfig>): void
  
  // Cleanup
  destroy(): void
}

interface Position {
  x: number  // 0-1
  y: number  // 0-1
}

// ============ PICKER EVENTS ============

type PickerEvent =
  | 'change'
  | 'changeComplete'
  | 'dragStart'
  | 'dragEnd'
  | 'formatChange'

type PickerEventHandler<E extends PickerEvent> =
  E extends 'change' ? (color: Color) => void :
  E extends 'changeComplete' ? (color: Color) => void :
  E extends 'dragStart' ? (area: 'saturation' | 'hue' | 'alpha') => void :
  E extends 'dragEnd' ? (area: 'saturation' | 'hue' | 'alpha') => void :
  E extends 'formatChange' ? (format: ColorFormat) => void :
  never

// ============ PROPS GETTERS ============

interface PickerProps {
  ref: (el: HTMLElement | null) => void
  role: 'application'
  'aria-label': string
  'aria-roledescription': 'color picker'
  'data-colorkit': ''
}

interface SaturationAreaProps {
  ref: (el: HTMLElement | null) => void
  role: 'slider'
  'aria-label': string
  'aria-valuetext': string
  tabIndex: 0
  style: {
    backgroundColor: string  // Pure hue color
  }
  onMouseDown: (e: MouseEvent) => void
  onTouchStart: (e: TouchEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

interface SliderProps {
  ref: (el: HTMLElement | null) => void
  role: 'slider'
  'aria-label': string
  'aria-valuemin': number
  'aria-valuemax': number
  'aria-valuenow': number
  'aria-valuetext': string
  tabIndex: 0
  onMouseDown: (e: MouseEvent) => void
  onTouchStart: (e: TouchEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

interface ThumbProps {
  role: 'presentation'
  style: {
    left?: string
    top?: string
    backgroundColor: string
  }
}

interface InputProps {
  ref: (el: HTMLInputElement | null) => void
  type: 'text'
  value: string
  'aria-label': string
  onChange: (e: Event) => void
  onBlur: (e: FocusEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

interface SelectProps {
  ref: (el: HTMLSelectElement | null) => void
  value: ColorFormat
  'aria-label': string
  onChange: (e: Event) => void
}

interface PresetProps {
  role: 'button'
  'aria-label': string
  'aria-pressed': boolean
  tabIndex: 0
  style: {
    backgroundColor: string
  }
  onClick: (e: MouseEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
}

interface EyeDropperProps {
  type: 'button'
  'aria-label': string
  disabled: boolean
  onClick: (e: MouseEvent) => void
}
```

---

## COLOR CREATION

```typescript
import { color, rgb, hsl, hsv, hwb, hex, cmyk } from '@oxog/colorkit'


// ============ FROM STRING ============

// Hex
color('#ff5733')
color('#f53')           // Shorthand
color('#ff5733ff')      // With alpha
color('ff5733')         // Without #

// RGB
color('rgb(255, 87, 51)')
color('rgba(255, 87, 51, 0.5)')
color('rgb(100%, 34%, 20%)')  // Percentage

// HSL
color('hsl(14, 100%, 60%)')
color('hsla(14, 100%, 60%, 0.5)')

// HSV
color('hsv(14, 80%, 100%)')

// HWB
color('hwb(14 0% 0%)')

// Named colors
color('red')
color('tomato')
color('rebeccapurple')
color('transparent')


// ============ FROM OBJECT ============

color({ r: 255, g: 87, b: 51 })
color({ r: 255, g: 87, b: 51, a: 0.5 })
color({ h: 14, s: 100, l: 60 })
color({ h: 14, s: 80, v: 100 })


// ============ FACTORY FUNCTIONS ============

// RGB (0-255)
rgb(255, 87, 51)
rgb(255, 87, 51, 0.5)  // With alpha

// HSL (h: 0-360, s: 0-100, l: 0-100)
hsl(14, 100, 60)
hsl(14, 100, 60, 0.5)

// HSV (h: 0-360, s: 0-100, v: 0-100)
hsv(14, 80, 100)
hsv(14, 80, 100, 0.5)

// HWB (h: 0-360, w: 0-100, b: 0-100)
hwb(14, 0, 0)

// Hex
hex('#ff5733')
hex('ff5733')

// CMYK
cmyk(0, 66, 80, 0)


// ============ VALIDATION ============

import { isValidColor } from '@oxog/colorkit'

isValidColor('#ff5733')     // true
isValidColor('tomato')      // true
isValidColor('not-a-color') // false
isValidColor('#gggggg')     // false


// ============ PARSING ============

import { parseColor } from '@oxog/colorkit'

const result = parseColor('#ff5733')
// { valid: true, color: Color, format: 'hex' }

const invalid = parseColor('invalid')
// { valid: false, color: null, format: null }
```

---

## FORMAT CONVERSION

```typescript
import { color } from '@oxog/colorkit'

const c = color('#ff5733')


// ============ TO HEX ============

c.toHex()           // '#ff5733'
c.toHexString()     // '#ff5733'
c.toHex8()          // '#ff5733ff'
c.toHex8String()    // '#ff5733ff'


// ============ TO RGB ============

c.toRgb()           // { r: 255, g: 87, b: 51, a: 1 }
c.toRgbString()     // 'rgb(255, 87, 51)'
c.toRgbaString()    // 'rgba(255, 87, 51, 1)'

c.toPercentageRgb()         // { r: 100, g: 34.1, b: 20, a: 1 }
c.toPercentageRgbString()   // 'rgb(100%, 34%, 20%)'


// ============ TO HSL ============

c.toHsl()           // { h: 14, s: 100, l: 60, a: 1 }
c.toHslString()     // 'hsl(14, 100%, 60%)'
c.toHslaString()    // 'hsla(14, 100%, 60%, 1)'


// ============ TO HSV ============

c.toHsv()           // { h: 14, s: 80, v: 100, a: 1 }
c.toHsvString()     // 'hsv(14, 80%, 100%)'


// ============ TO HWB ============

c.toHwb()           // { h: 14, w: 20, b: 0, a: 1 }
c.toHwbString()     // 'hwb(14 20% 0%)'


// ============ TO CMYK ============

c.toCmyk()          // { c: 0, m: 66, y: 80, k: 0 }
c.toCmykString()    // 'cmyk(0%, 66%, 80%, 0%)'


// ============ TO NAME ============

color('#ff6347').toName()    // 'tomato'
color('#ff5733').toName()    // null (no exact match)


// ============ GENERIC toString ============

c.toString()            // '#ff5733' (default hex)
c.toString('hex')       // '#ff5733'
c.toString('rgb')       // 'rgb(255, 87, 51)'
c.toString('hsl')       // 'hsl(14, 100%, 60%)'
c.toString('hsv')       // 'hsv(14, 80%, 100%)'
c.toString('hwb')       // 'hwb(14 20% 0%)'


// ============ CONVERSION UTILITIES ============

import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  hsvToHsl,
  hslToHsv,
  rgbToHwb,
  hwbToRgb,
  rgbToCmyk,
  cmykToRgb,
} from '@oxog/colorkit'

hexToRgb('#ff5733')        // { r: 255, g: 87, b: 51 }
rgbToHex({ r: 255, g: 87, b: 51 })  // '#ff5733'
rgbToHsl({ r: 255, g: 87, b: 51 })  // { h: 14, s: 100, l: 60 }
```

---

## COLOR MANIPULATION

```typescript
import { color } from '@oxog/colorkit'

const c = color('#3b82f6')  // Blue


// ============ LIGHTEN / DARKEN ============

c.lighten()         // Lighten by 10%
c.lighten(20)       // Lighten by 20%
c.darken()          // Darken by 10%
c.darken(20)        // Darken by 20%


// ============ SATURATE / DESATURATE ============

c.saturate()        // Increase saturation by 10%
c.saturate(20)      // Increase saturation by 20%
c.desaturate()      // Decrease saturation by 10%
c.desaturate(20)    // Decrease saturation by 20%


// ============ BRIGHTEN ============

c.brighten()        // Brighten by 10%
c.brighten(20)      // Brighten by 20%


// ============ SPIN (HUE ROTATION) ============

c.spin(30)          // Rotate hue by 30°
c.spin(-30)         // Rotate hue by -30°
c.spin(180)         // Complementary color


// ============ GRAYSCALE ============

c.grayscale()       // Convert to grayscale


// ============ INVERT ============

c.invert()          // Invert color (255 - r, 255 - g, 255 - b)


// ============ COMPLEMENT ============

c.complement()      // 180° hue rotation


// ============ ALPHA MANIPULATION ============

c.alpha()           // Get alpha: 1
c.setAlpha(0.5)     // Set alpha to 0.5
c.fade(0.5)         // Set alpha to 0.5
c.fadeIn(0.2)       // Increase alpha by 0.2
c.fadeOut(0.2)      // Decrease alpha by 0.2
c.opaque()          // Set alpha to 1
c.transparent()     // Set alpha to 0


// ============ COMPONENT SETTERS ============

c.setRed(200)       // Set red to 200
c.setGreen(100)     // Set green to 100
c.setBlue(150)      // Set blue to 150
c.setHue(180)       // Set hue to 180°
c.setSaturation(50) // Set saturation to 50%
c.setLightness(70)  // Set lightness to 70%
c.setBrightness(80) // Set brightness to 80%


// ============ CHAINING ============

color('#3b82f6')
  .lighten(10)
  .saturate(20)
  .setAlpha(0.8)
  .toHex()


// ============ IMMUTABILITY ============

const original = color('#3b82f6')
const lighter = original.lighten(20)

original.toHex()    // '#3b82f6' (unchanged)
lighter.toHex()     // '#6ba3f8' (new color)
```

---

## COLOR MIXING

```typescript
import { color, mix, blend } from '@oxog/colorkit'


// ============ MIX ============

const red = color('#ff0000')
const blue = color('#0000ff')

// Mix 50% (default)
red.mix(blue)           // Purple

// Mix with custom amount
red.mix(blue, 25)       // 25% blue, 75% red
red.mix(blue, 75)       // 75% blue, 25% red


// ============ TINT (MIX WITH WHITE) ============

const c = color('#3b82f6')

c.tint()            // Mix with 10% white
c.tint(20)          // Mix with 20% white
c.tint(50)          // Mix with 50% white


// ============ SHADE (MIX WITH BLACK) ============

c.shade()           // Mix with 10% black
c.shade(20)         // Mix with 20% black
c.shade(50)         // Mix with 50% black


// ============ TONE (MIX WITH GRAY) ============

c.tone()            // Mix with 10% gray
c.tone(20)          // Mix with 20% gray


// ============ STANDALONE MIX ============

mix('#ff0000', '#0000ff')       // 50% mix
mix('#ff0000', '#0000ff', 25)   // 25% mix


// ============ BLEND MODES ============

blend('#ff0000', '#0000ff', 'multiply')
blend('#ff0000', '#0000ff', 'screen')
blend('#ff0000', '#0000ff', 'overlay')
blend('#ff0000', '#0000ff', 'darken')
blend('#ff0000', '#0000ff', 'lighten')
blend('#ff0000', '#0000ff', 'difference')
blend('#ff0000', '#0000ff', 'exclusion')
```

---

## COLOR HARMONY

```typescript
import {
  color,
  getComplementary,
  getTriadic,
  getTetradic,
  getAnalogous,
  getSplitComplementary,
  getMonochromatic,
} from '@oxog/colorkit'

const base = color('#3b82f6')  // Blue


// ============ COMPLEMENTARY ============

// Opposite on color wheel (180°)
base.complement()              // #f6833b
getComplementary(base)         // Color


// ============ TRIADIC ============

// 3 colors, 120° apart
const triadic = getTriadic(base)
// [#3b82f6, #f63b82, #82f63b]


// ============ TETRADIC (SQUARE) ============

// 4 colors, 90° apart
const tetradic = getTetradic(base)
// [#3b82f6, #f6f63b, #f6833b, #3bf63b]


// ============ ANALOGOUS ============

// 3 colors, 30° apart (neighbors)
const analogous = getAnalogous(base)
// [#3b3bf6, #3b82f6, #3bf6f6]

// With custom angle
const analogous5 = getAnalogous(base, { count: 5, angle: 15 })


// ============ SPLIT COMPLEMENTARY ============

// Base + 2 colors adjacent to complement
const split = getSplitComplementary(base)
// [#3b82f6, #f6f63b, #f63b3b]


// ============ MONOCHROMATIC ============

// Variations in lightness/saturation
const mono = getMonochromatic(base, 5)
// [#1e3a8a, #2563eb, #3b82f6, #60a5fa, #93c5fd]
```

---

## PALETTE GENERATION

```typescript
import {
  generatePalette,
  generateShades,
  generateTints,
  generateTones,
  generateScale,
} from '@oxog/colorkit'

const base = color('#3b82f6')


// ============ GENERATE SHADES ============

// Darker variations
const shades = generateShades(base, 5)
// [
//   '#3b82f6',  // Original
//   '#2563eb',  // Darker
//   '#1d4ed8',
//   '#1e40af',
//   '#1e3a8a',  // Darkest
// ]


// ============ GENERATE TINTS ============

// Lighter variations
const tints = generateTints(base, 5)
// [
//   '#3b82f6',  // Original
//   '#60a5fa',  // Lighter
//   '#93c5fd',
//   '#bfdbfe',
//   '#dbeafe',  // Lightest
// ]


// ============ GENERATE TONES ============

// Gray mixed variations
const tones = generateTones(base, 5)


// ============ GENERATE FULL PALETTE ============

const palette = generatePalette(base, {
  tints: 4,
  shades: 5,
})
// {
//   50: '#eff6ff',
//   100: '#dbeafe',
//   200: '#bfdbfe',
//   300: '#93c5fd',
//   400: '#60a5fa',
//   500: '#3b82f6',  // Base
//   600: '#2563eb',
//   700: '#1d4ed8',
//   800: '#1e40af',
//   900: '#1e3a8a',
//   950: '#172554',
// }


// ============ GENERATE SCALE ============

// Between two colors
const scale = generateScale('#ff0000', '#0000ff', 5)
// [#ff0000, #bf003f, #7f007f, #3f00bf, #0000ff]


// ============ TAILWIND-STYLE PALETTE ============

import { generateTailwindPalette } from '@oxog/colorkit'

const tailwindPalette = generateTailwindPalette(base)
// {
//   50: '#eff6ff',
//   100: '#dbeafe',
//   ...
//   900: '#1e3a8a',
//   950: '#172554',
// }
```

---

## WCAG CONTRAST & ACCESSIBILITY

```typescript
import {
  color,
  getContrast,
  getLuminance,
  isReadable,
  getReadableColor,
  suggestForeground,
} from '@oxog/colorkit'


// ============ LUMINANCE ============

// Relative luminance (0-1)
color('#ffffff').luminance()  // 1
color('#000000').luminance()  // 0
color('#3b82f6').luminance()  // ~0.25

getLuminance('#3b82f6')       // Standalone


// ============ CONTRAST RATIO ============

// WCAG contrast ratio (1-21)
color('#ffffff').contrast('#000000')  // 21
color('#ffffff').contrast('#ffffff')  // 1
color('#3b82f6').contrast('#ffffff')  // ~4.5

getContrast('#ffffff', '#3b82f6')     // Standalone


// ============ READABILITY CHECK ============

const bg = '#ffffff'
const text = '#3b82f6'

// Check WCAG compliance
isReadable(bg, text, 'AA')          // true (>= 4.5:1)
isReadable(bg, text, 'AAA')         // false (>= 7:1)

// For large text (>= 18px or 14px bold)
isReadable(bg, text, 'AA', 'large')  // true (>= 3:1)
isReadable(bg, text, 'AAA', 'large') // true (>= 4.5:1)

// Instance method
color(text).isReadable(bg, 'AA')


// ============ WCAG LEVELS ============

/*
AA Normal Text:  4.5:1 minimum
AA Large Text:   3.0:1 minimum
AAA Normal Text: 7.0:1 minimum
AAA Large Text:  4.5:1 minimum
*/


// ============ GET READABLE COLOR ============

// Find a readable foreground for background
const readable = getReadableColor('#3b82f6', 'AA')
// Returns '#ffffff' or '#000000' based on contrast

// Get readable variation of a color
const adjusted = getReadableColor('#3b82f6', 'AA', '#ffffff')
// Adjusts #3b82f6 to meet AA contrast with white


// ============ SUGGEST FOREGROUND ============

// Suggest black or white text
suggestForeground('#3b82f6')   // '#ffffff'
suggestForeground('#f0f0f0')   // '#000000'


// ============ IS LIGHT / DARK ============

color('#ffffff').isLight()     // true
color('#ffffff').isDark()      // false
color('#000000').isLight()     // false
color('#000000').isDark()      // true
color('#3b82f6').isLight()     // false
```

---

## COLOR PICKER

```typescript
import { createColorPicker } from '@oxog/colorkit'


// ============ BASIC USAGE ============

const picker = createColorPicker({
  defaultValue: '#3b82f6',
  onChange: (color) => {
    console.log('Color:', color.toHex())
  },
})

picker.mount(document.getElementById('picker'))


// ============ FULL CONFIGURATION ============

const picker = createColorPicker({
  // Initial value
  defaultValue: '#3b82f6',
  
  // Format
  format: 'hex',
  outputFormat: 'hex',
  
  // Alpha
  showAlpha: true,
  defaultAlpha: 1,
  
  // Presets
  presets: [
    '#ef4444', '#f97316', '#eab308',
    '#22c55e', '#3b82f6', '#8b5cf6',
  ],
  showPresets: true,
  
  // Input
  showInput: true,
  inputFormat: 'hex',
  
  // Eye dropper
  showEyeDropper: true,
  
  // Callbacks
  onChange: (color) => {
    console.log('Changing:', color.toHex())
  },
  onChangeComplete: (color) => {
    console.log('Complete:', color.toHex())
  },
  
  // Accessibility
  ariaLabel: 'Select a color',
})


// ============ METHODS ============

// Get/set value
const color = picker.getValue()
picker.setValue('#ff5733')

// Set components
picker.setHue(180)
picker.setSaturation(80)
picker.setBrightness(100)
picker.setAlpha(0.5)

// Eye dropper
if (picker.isEyeDropperSupported()) {
  const color = await picker.pickFromScreen()
  if (color) {
    console.log('Picked:', color.toHex())
  }
}

// Subscribe to changes
const unsubscribe = picker.subscribe((state) => {
  console.log('State:', state)
})

// Cleanup
picker.destroy()
```

---

## HEADLESS RENDERING

```typescript
import { createColorPicker } from '@oxog/colorkit'

const picker = createColorPicker({
  defaultValue: '#3b82f6',
  showAlpha: true,
})


// ============ RENDER FUNCTION ============

function render() {
  const state = picker.getState()
  
  const container = document.createElement('div')
  Object.assign(container, picker.getPickerProps())
  container.className = 'color-picker'
  
  // ===== SATURATION AREA =====
  const satArea = document.createElement('div')
  const satProps = picker.getSaturationAreaProps()
  Object.assign(satArea, satProps)
  satArea.className = 'saturation-area'
  
  // Saturation thumb
  const satThumb = document.createElement('div')
  const satThumbProps = picker.getSaturationThumbProps()
  Object.assign(satThumb, satThumbProps)
  satThumb.className = 'thumb'
  satThumb.style.left = `${state.saturation}%`
  satThumb.style.top = `${100 - state.brightness}%`
  
  satArea.appendChild(satThumb)
  container.appendChild(satArea)
  
  // ===== HUE SLIDER =====
  const hueSlider = document.createElement('div')
  const hueProps = picker.getHueSliderProps()
  Object.assign(hueSlider, hueProps)
  hueSlider.className = 'hue-slider'
  
  const hueThumb = document.createElement('div')
  const hueThumbProps = picker.getHueThumbProps()
  Object.assign(hueThumb, hueThumbProps)
  hueThumb.className = 'thumb'
  hueThumb.style.left = `${(state.hue / 360) * 100}%`
  
  hueSlider.appendChild(hueThumb)
  container.appendChild(hueSlider)
  
  // ===== ALPHA SLIDER =====
  const alphaSlider = document.createElement('div')
  const alphaProps = picker.getAlphaSliderProps()
  Object.assign(alphaSlider, alphaProps)
  alphaSlider.className = 'alpha-slider'
  
  const alphaThumb = document.createElement('div')
  const alphaThumbProps = picker.getAlphaThumbProps()
  Object.assign(alphaThumb, alphaThumbProps)
  alphaThumb.className = 'thumb'
  alphaThumb.style.left = `${state.alpha * 100}%`
  
  alphaSlider.appendChild(alphaThumb)
  container.appendChild(alphaSlider)
  
  // ===== INPUT =====
  const input = document.createElement('input')
  const inputProps = picker.getInputProps()
  Object.assign(input, inputProps)
  input.className = 'color-input'
  
  container.appendChild(input)
  
  // ===== PREVIEW =====
  const preview = document.createElement('div')
  preview.className = 'preview'
  preview.style.backgroundColor = state.color.toRgbString()
  
  container.appendChild(preview)
  
  return container
}


// ============ SUBSCRIBE AND RE-RENDER ============

const root = document.getElementById('picker-root')

picker.subscribe(() => {
  root.innerHTML = ''
  root.appendChild(render())
})

root.appendChild(render())
```

---

## REACT INTEGRATION

```tsx
import {
  ColorPickerProvider,
  useColorPicker,
  useColor,
  ColorPicker,
  ColorInput,
  ColorSwatch,
  HuePicker,
  SaturationPicker,
  AlphaPicker,
  EyeDropper,
} from '@oxog/colorkit/react'


// ============ useColorPicker HOOK ============

function CustomColorPicker() {
  const [value, setValue] = useState('#3b82f6')
  
  const {
    // State
    color,
    hue,
    saturation,
    brightness,
    alpha,
    inputValue,
    isDragging,
    
    // Setters
    setColor,
    setHue,
    setSaturation,
    setBrightness,
    setAlpha,
    setInputValue,
    
    // Props getters
    getPickerProps,
    getSaturationAreaProps,
    getSaturationThumbProps,
    getHueSliderProps,
    getHueThumbProps,
    getAlphaSliderProps,
    getAlphaThumbProps,
    getInputProps,
    getPresetProps,
    getEyeDropperProps,
    
    // Eye dropper
    pickFromScreen,
    isEyeDropperSupported,
  } = useColorPicker({
    value,
    onChange: setValue,
    showAlpha: true,
  })
  
  return (
    <div {...getPickerProps()} className="color-picker">
      {/* Saturation/Brightness area */}
      <div
        {...getSaturationAreaProps()}
        className="saturation-area"
        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
      >
        <div
          {...getSaturationThumbProps()}
          className="thumb"
          style={{
            left: `${saturation}%`,
            top: `${100 - brightness}%`,
            backgroundColor: color.toHex(),
          }}
        />
      </div>
      
      {/* Hue slider */}
      <div {...getHueSliderProps()} className="hue-slider">
        <div
          {...getHueThumbProps()}
          className="thumb"
          style={{ left: `${(hue / 360) * 100}%` }}
        />
      </div>
      
      {/* Alpha slider */}
      <div {...getAlphaSliderProps()} className="alpha-slider">
        <div
          {...getAlphaThumbProps()}
          className="thumb"
          style={{ left: `${alpha * 100}%` }}
        />
      </div>
      
      {/* Input */}
      <input {...getInputProps()} className="color-input" />
      
      {/* Eye dropper */}
      {isEyeDropperSupported && (
        <button {...getEyeDropperProps()}>
          🎯 Pick from screen
        </button>
      )}
      
      {/* Preview */}
      <div
        className="preview"
        style={{ backgroundColor: color.toRgbaString() }}
      />
    </div>
  )
}


// ============ useColor HOOK ============

function ColorInfo({ value }: { value: string }) {
  const {
    color,
    hex,
    rgb,
    hsl,
    hsv,
    isLight,
    isDark,
    luminance,
    
    setColor,
    lighten,
    darken,
    saturate,
    desaturate,
    complement,
    invert,
  } = useColor(value)
  
  return (
    <div className="color-info">
      <div
        className="swatch"
        style={{ backgroundColor: hex }}
      />
      
      <div className="details">
        <p>HEX: {hex}</p>
        <p>RGB: {rgb.r}, {rgb.g}, {rgb.b}</p>
        <p>HSL: {hsl.h}°, {hsl.s}%, {hsl.l}%</p>
        <p>Light: {isLight ? 'Yes' : 'No'}</p>
        <p>Luminance: {luminance.toFixed(3)}</p>
      </div>
      
      <div className="actions">
        <button onClick={() => setColor(lighten(10).toHex())}>
          Lighten
        </button>
        <button onClick={() => setColor(darken(10).toHex())}>
          Darken
        </button>
        <button onClick={() => setColor(saturate(10).toHex())}>
          Saturate
        </button>
        <button onClick={() => setColor(complement().toHex())}>
          Complement
        </button>
      </div>
    </div>
  )
}
```

---

## REACT COMPONENTS

```tsx
// ============ ColorPicker COMPONENT ============

// Basic
<ColorPicker
  value={color}
  onChange={setColor}
/>

// With options
<ColorPicker
  value={color}
  onChange={setColor}
  showAlpha
  showInput
  format="hex"
/>

// With presets
<ColorPicker
  value={color}
  onChange={setColor}
  presets={['#ef4444', '#f97316', '#22c55e', '#3b82f6']}
/>

// With eye dropper
<ColorPicker
  value={color}
  onChange={setColor}
  showEyeDropper
/>

// Compact mode
<ColorPicker
  value={color}
  onChange={setColor}
  compact
/>


// ============ ColorInput COMPONENT ============

<ColorInput
  value={color}
  onChange={setColor}
  format="hex"
  placeholder="#000000"
/>

// With validation
<ColorInput
  value={color}
  onChange={setColor}
  format="rgb"
  showPreview
/>


// ============ ColorSwatch COMPONENT ============

<ColorSwatch
  color="#3b82f6"
  size={32}
  selected={selected === '#3b82f6'}
  onClick={() => setSelected('#3b82f6')}
/>

// Swatch group
<div className="swatches">
  {presets.map(c => (
    <ColorSwatch
      key={c}
      color={c}
      selected={selected === c}
      onClick={() => setSelected(c)}
    />
  ))}
</div>


// ============ Individual Pickers ============

// Hue only
<HuePicker
  value={hue}
  onChange={setHue}
  direction="horizontal"
/>

// Saturation/Brightness area
<SaturationPicker
  hue={hue}
  saturation={saturation}
  brightness={brightness}
  onChange={({ s, v }) => {
    setSaturation(s)
    setBrightness(v)
  }}
/>

// Alpha slider
<AlphaPicker
  color={color}
  value={alpha}
  onChange={setAlpha}
/>

// Eye dropper button
<EyeDropper
  onPick={(color) => setColor(color.toHex())}
/>


// ============ Gradient Picker ============

<GradientPicker
  value={gradient}
  onChange={setGradient}
  type="linear"
/>
```

---

## UTILITIES

```typescript
import {
  // Random
  randomColor,
  randomPalette,
  randomHex,
  
  // Named colors
  getNamedColor,
  findClosestNamedColor,
  namedColors,
  
  // Gradient
  createGradient,
  parseGradient,
  
  // Distance
  colorDistance,
  deltaE,
} from '@oxog/colorkit'


// ============ RANDOM COLORS ============

randomColor()                    // Random Color instance
randomHex()                      // '#a3f2c8'
randomPalette(5)                 // 5 random colors

// With constraints
randomColor({ luminance: 'light' })
randomColor({ saturation: [50, 100] })
randomColor({ hue: [180, 240] })  // Blue range


// ============ NAMED COLORS ============

getNamedColor('tomato')          // Color instance
getNamedColor('rebeccapurple')   // Color instance

findClosestNamedColor('#ff6347') // 'tomato'
findClosestNamedColor('#3b82f6') // 'royalblue'

namedColors                      // { red: '#ff0000', ... }


// ============ GRADIENT ============

createGradient([
  { color: '#ff0000', position: 0 },
  { color: '#0000ff', position: 100 },
])
// 'linear-gradient(to right, #ff0000 0%, #0000ff 100%)'

createGradient(
  [
    { color: '#ff0000', position: 0 },
    { color: '#00ff00', position: 50 },
    { color: '#0000ff', position: 100 },
  ],
  { type: 'radial', angle: 45 }
)

parseGradient('linear-gradient(to right, #ff0000, #0000ff)')
// { type: 'linear', angle: 90, stops: [...] }


// ============ COLOR DISTANCE ============

colorDistance('#ff0000', '#ff0001')  // Small number
colorDistance('#ff0000', '#0000ff')  // Large number

// Delta E (perceptual difference)
deltaE('#ff0000', '#ff0001')         // ~0.5
deltaE('#ff0000', '#0000ff')         // ~50
```

---

## TECHNICAL REQUIREMENTS

| Requirement | Value |
|-------------|-------|
| Runtime | Browser |
| Module | ESM + CJS |
| TypeScript | Strict mode |
| Dependencies | ZERO |
| Test Coverage | 100% |
| Bundle Size | < 4KB core |

---

## PROJECT STRUCTURE

```
colorkit/
├── src/
│   ├── index.ts                    # Main exports
│   ├── types.ts                    # Type definitions
│   │
│   ├── core/
│   │   ├── color.ts                # Main Color class
│   │   ├── parse.ts                # Color parsing
│   │   ├── validate.ts             # Validation
│   │   └── factory.ts              # Factory functions
│   │
│   ├── conversion/
│   │   ├── hex.ts                  # HEX conversion
│   │   ├── rgb.ts                  # RGB conversion
│   │   ├── hsl.ts                  # HSL conversion
│   │   ├── hsv.ts                  # HSV conversion
│   │   ├── hwb.ts                  # HWB conversion
│   │   ├── cmyk.ts                 # CMYK conversion
│   │   └── named.ts                # Named colors
│   │
│   ├── manipulation/
│   │   ├── lighten.ts              # Lighten/darken
│   │   ├── saturate.ts             # Saturate/desaturate
│   │   ├── spin.ts                 # Hue rotation
│   │   ├── invert.ts               # Invert/grayscale
│   │   └── alpha.ts                # Alpha manipulation
│   │
│   ├── mixing/
│   │   ├── mix.ts                  # Color mixing
│   │   ├── blend.ts                # Blend modes
│   │   ├── tint.ts                 # Tint/shade/tone
│   │   └── gradient.ts             # Gradient utilities
│   │
│   ├── harmony/
│   │   ├── complementary.ts        # Complementary
│   │   ├── triadic.ts              # Triadic
│   │   ├── tetradic.ts             # Tetradic
│   │   ├── analogous.ts            # Analogous
│   │   └── split.ts                # Split complementary
│   │
│   ├── palette/
│   │   ├── generate.ts             # Palette generation
│   │   ├── shades.ts               # Shades
│   │   ├── tints.ts                # Tints
│   │   ├── scale.ts                # Color scale
│   │   └── tailwind.ts             # Tailwind palette
│   │
│   ├── accessibility/
│   │   ├── contrast.ts             # Contrast ratio
│   │   ├── luminance.ts            # Luminance
│   │   ├── readable.ts             # Readability
│   │   └── wcag.ts                 # WCAG utilities
│   │
│   ├── picker/
│   │   ├── picker.ts               # ColorPicker class
│   │   ├── state.ts                # State management
│   │   ├── saturation.ts           # Saturation area
│   │   ├── hue.ts                  # Hue slider
│   │   ├── alpha.ts                # Alpha slider
│   │   ├── input.ts                # Color input
│   │   ├── eyedropper.ts           # EyeDropper API
│   │   └── props.ts                # Props getters
│   │
│   ├── utils/
│   │   ├── clamp.ts                # Clamp utilities
│   │   ├── round.ts                # Rounding
│   │   ├── random.ts               # Random colors
│   │   ├── distance.ts             # Color distance
│   │   └── events.ts               # Event emitter
│   │
│   └── adapters/
│       └── react/
│           ├── index.ts
│           ├── context.ts
│           ├── hooks/
│           │   ├── useColorPicker.ts
│           │   ├── useColor.ts
│           │   └── useEyeDropper.ts
│           └── components/
│               ├── ColorPicker.tsx
│               ├── ColorInput.tsx
│               ├── ColorSwatch.tsx
│               ├── HuePicker.tsx
│               ├── SaturationPicker.tsx
│               ├── AlphaPicker.tsx
│               └── EyeDropper.tsx
│
├── tests/
│   ├── unit/
│   │   ├── core/
│   │   ├── conversion/
│   │   ├── manipulation/
│   │   ├── mixing/
│   │   ├── harmony/
│   │   ├── palette/
│   │   ├── accessibility/
│   │   └── picker/
│   ├── integration/
│   │   ├── color.test.ts
│   │   ├── picker.test.ts
│   │   ├── wcag.test.ts
│   │   └── react.test.tsx
│   └── fixtures/
│
├── examples/
│   ├── basic/
│   ├── picker/
│   ├── palette/
│   ├── accessibility/
│   └── react/
│
├── website/
│   └── [See WEBSITE section]
│
├── .github/
│   └── workflows/
│       └── deploy-website.yml
│
├── SPECIFICATION.md
├── IMPLEMENTATION.md
├── TASKS.md
├── README.md
├── CHANGELOG.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── vitest.config.ts
```

---

## DOCUMENTATION WEBSITE

Build a modern documentation site using React + Vite.

### Technology Stack (MANDATORY)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI framework |
| **Vite** | 5+ | Build tool |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 3+ | Styling (npm, NOT CDN) |
| **shadcn/ui** | Latest | UI components |
| **React Router** | 6+ | Routing |
| **Lucide React** | Latest | Icons |
| **Framer Motion** | Latest | Animations |
| **Prism.js** | Latest | Syntax highlighting |

### Fonts (MANDATORY)

- **JetBrains Mono** - ALL code
- **Inter** - Body text

### Required Pages

1. **Home** (`/`)
   - Hero with interactive color picker demo
   - Feature highlights
   - Install command
   - Quick examples

2. **Getting Started** (`/docs/getting-started`)
   - Installation
   - Quick start
   - Color creation

3. **Color Formats** (`/docs/formats`)
   - HEX, RGB, HSL, HSV, HWB
   - Conversion
   - Parsing

4. **Manipulation** (`/docs/manipulation`)
   - Lighten/darken
   - Saturate/desaturate
   - Spin, invert, grayscale

5. **Mixing** (`/docs/mixing`)
   - Mix colors
   - Tint/shade/tone
   - Blend modes

6. **Harmony** (`/docs/harmony`)
   - Complementary
   - Triadic, tetradic
   - Analogous

7. **Palette** (`/docs/palette`)
   - Generate palettes
   - Shades/tints
   - Tailwind palette

8. **Accessibility** (`/docs/accessibility`)
   - Contrast ratio
   - WCAG compliance
   - Readability

9. **Color Picker** (`/docs/picker`)
   - Setup
   - Customization
   - Eye dropper

10. **API Reference** (`/docs/api/*`)
    - Color class
    - Utilities
    - Picker

11. **React Guide** (`/docs/react/*`)
    - Hooks
    - Components

12. **Examples** (`/examples`)
    - Color picker
    - Palette generator
    - Contrast checker

### Design Theme

- Rainbow/gradient accent
- Dark mode default
- Light mode support

### GitHub Actions

```yaml
# .github/workflows/deploy-website.yml
name: Deploy Website

on:
  push:
    branches: [main]
    paths:
      - 'website/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: website/package-lock.json
      - run: cd website && npm ci
      - run: cd website && npm run build
      - run: echo "colorkit.oxog.dev" > website/dist/CNAME
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: website/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## README.md

````markdown
# ColorKit

<div align="center">
  <img src="website/public/logo.svg" alt="ColorKit" width="120" />
  <h3>Headless color picker and utilities</h3>
  <p>
    <a href="https://colorkit.oxog.dev">Documentation</a> •
    <a href="https://colorkit.oxog.dev/docs/getting-started">Getting Started</a> •
    <a href="https://colorkit.oxog.dev/examples">Examples</a>
  </p>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@oxog/colorkit.svg)](https://www.npmjs.com/package/@oxog/colorkit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@oxog/colorkit)](https://bundlephobia.com/package/@oxog/colorkit)
[![license](https://img.shields.io/npm/l/@oxog/colorkit.svg)](LICENSE)

</div>

---

## Features

- 🎨 **Color Parsing** - HEX, RGB, HSL, HSV, HWB, named
- 🔄 **Conversion** - Between all formats
- ✨ **Manipulation** - Lighten, darken, saturate
- 🌈 **Harmony** - Complementary, triadic, analogous
- 📊 **Palettes** - Generate shades, tints, scales
- ♿ **Accessibility** - WCAG contrast checking
- 🎯 **Picker** - Headless color picker
- 👁️ **Eye Dropper** - Pick from screen
- ⚛️ **React** - Hooks & components
- 📦 **Zero Dependencies**
- ⚡ **< 4KB** - Tiny bundle

## Installation

```bash
npm install @oxog/colorkit
```

## Quick Start

```typescript
import { color } from '@oxog/colorkit'

// Create color
const c = color('#3b82f6')

// Convert
c.toRgb()     // { r: 59, g: 130, b: 246, a: 1 }
c.toHsl()     // { h: 217, s: 91, l: 60, a: 1 }

// Manipulate
c.lighten(20).toHex()  // '#6ba3f8'
c.complement().toHex() // '#f6833b'

// Check contrast
c.contrast('#ffffff')  // 4.5
c.isReadable('#ffffff', 'AA')  // true
```

## React

```tsx
import { ColorPicker, useColor } from '@oxog/colorkit/react'

// Color picker
<ColorPicker value={color} onChange={setColor} />

// Color hook
const { hex, lighten, darken } = useColor('#3b82f6')
```

## Documentation

Visit [colorkit.oxog.dev](https://colorkit.oxog.dev) for full documentation.

## License

MIT © [Ersin KOÇ](https://github.com/ersinkoc)
````

---

## IMPLEMENTATION CHECKLIST

### Before Implementation
- [ ] Create SPECIFICATION.md
- [ ] Create IMPLEMENTATION.md
- [ ] Create TASKS.md

### Core
- [ ] Color class
- [ ] Parsing
- [ ] Validation
- [ ] Factory functions

### Conversion
- [ ] HEX ↔ RGB
- [ ] RGB ↔ HSL
- [ ] RGB ↔ HSV
- [ ] RGB ↔ HWB
- [ ] RGB ↔ CMYK
- [ ] Named colors

### Manipulation
- [ ] Lighten/darken
- [ ] Saturate/desaturate
- [ ] Brighten
- [ ] Spin
- [ ] Invert/grayscale
- [ ] Alpha manipulation

### Mixing
- [ ] Mix
- [ ] Tint/shade/tone
- [ ] Blend modes

### Harmony
- [ ] Complementary
- [ ] Triadic
- [ ] Tetradic
- [ ] Analogous
- [ ] Split complementary

### Palette
- [ ] Shades
- [ ] Tints
- [ ] Scale
- [ ] Tailwind palette

### Accessibility
- [ ] Luminance
- [ ] Contrast ratio
- [ ] Readability check
- [ ] WCAG utilities

### Picker
- [ ] ColorPicker class
- [ ] Saturation area
- [ ] Hue slider
- [ ] Alpha slider
- [ ] Input
- [ ] Eye dropper
- [ ] Props getters

### React Adapter
- [ ] useColorPicker
- [ ] useColor
- [ ] ColorPicker component
- [ ] ColorInput component
- [ ] ColorSwatch component
- [ ] HuePicker component
- [ ] SaturationPicker component
- [ ] AlphaPicker component

### Testing
- [ ] 100% coverage
- [ ] All tests passing

### Website
- [ ] React + Vite setup
- [ ] All pages
- [ ] Interactive examples
- [ ] GitHub Actions

---

## BEGIN IMPLEMENTATION

Start by creating SPECIFICATION.md with the complete package specification. Then proceed with IMPLEMENTATION.md and TASKS.md before writing any actual code.

Remember: This package will be published to NPM. It must be production-ready, zero-dependency, fully tested, and professionally documented.

**Date: 2025-12-30**
**Author: Ersin KOÇ**
**Repository: github.com/ersinkoc/colorkit**
**Website: colorkit.oxog.dev**
