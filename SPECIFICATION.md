# ColorKit - Package Specification

## 1. Package Identity

**Name**: `@oxog/colorkit`
**Version**: 1.0.0
**Description**: Zero-dependency headless color picker and utilities with format conversion and accessibility
**Author**: Ersin KOÇ
**License**: MIT
**Repository**: https://github.com/ersinkoc/colorkit
**Documentation**: https://colorkit.oxog.dev

## 2. Technical Requirements

### 2.1 Build Targets
| Format | Purpose | Size Limit |
|--------|---------|------------|
| ESM | Modern bundlers | < 4KB |
| CJS | Node.js | < 4KB |
| UMD | Browser scripts | < 4KB |
| TypeScript | Type definitions | - |

### 2.2 Constraints
- **ZERO runtime dependencies** - No external packages at all
- **TypeScript strict mode** - All strict checks enabled
- **100% test coverage** - Every line and branch tested
- **Tree-shakeable** - ESM exports only
- **Browser compatible** - No Node.js APIs

## 3. Core Modules

### 3.1 Types Module (`types.ts`)

```typescript
// Color input union type
type ColorInput =
  | string
  | RgbColor
  | RgbaColor
  | HslColor
  | HslaColor
  | HsvColor
  | HsvaColor
  | HwbColor
  | CmykColor
  | Color

// Color format interfaces
interface RgbColor { r: number; g: number; b: number }
interface RgbaColor extends RgbColor { a: number }
interface HslColor { h: number; s: number; l: number }
interface HslaColor extends HslColor { a: number }
interface HsvColor { h: number; s: number; v: number }
interface HsvaColor extends HsvColor { a: number }
interface HwbColor { h: number; w: number; b: number; a?: number }
interface CmykColor { c: number; m: number; y: number; k: number }

type ColorFormat =
  | 'hex' | 'hex8' | 'rgb' | 'rgba'
  | 'hsl' | 'hsla' | 'hsv' | 'hsva'
  | 'hwb' | 'cmyk' | 'name'
```

### 3.2 Core Color Class

```typescript
class Color {
  constructor(r: number, g: number, b: number, a: number)

  // Format conversion
  toHex(): string
  toHex8(): string
  toRgb(): RgbaColor
  toRgbString(): string
  toRgbaString(): string
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

  // Component getters
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
  luminance(): number

  // Component setters (immutable)
  setRed(value: number): Color
  setGreen(value: number): Color
  setBlue(value: number): Color
  setAlpha(value: number): Color
  setHue(value: number): Color
  setSaturation(value: number): Color
  setLightness(value: number): Color
  setBrightness(value: number): Color

  // Manipulation
  lighten(amount?: number): Color
  darken(amount?: number): Color
  saturate(amount?: number): Color
  desaturate(amount?: number): Color
  brighten(amount?: number): Color
  spin(degrees: number): Color
  grayscale(): Color
  invert(): Color
  complement(): Color

  // Alpha manipulation
  fade(amount: number): Color
  fadeIn(amount: number): Color
  fadeOut(amount: number): Color
  opaque(): Color
  transparent(): Color

  // Mixing
  mix(color: ColorInput, amount?: number): Color
  tint(amount?: number): Color
  shade(amount?: number): Color
  tone(amount?: number): Color

  // Queries
  isLight(): boolean
  isDark(): boolean
  isValid(): boolean

  // Contrast & accessibility
  contrast(color: ColorInput): number
  isReadable(background: ColorInput, level?: WcagLevel, size?: TextSize): boolean

  // Comparison
  equals(color: ColorInput): boolean

  // Clone
  clone(): Color
}
```

### 3.3 Color Parsing

Supported input formats:

| Format | Examples |
|--------|----------|
| HEX | `#ff5733`, `#f53`, `#ff5733ff`, `ff5733` |
| RGB | `rgb(255, 87, 51)`, `rgba(255, 87, 51, 0.5)`, `rgb(100%, 34%, 20%)` |
| HSL | `hsl(14, 100%, 60%)`, `hsla(14, 100%, 60%, 0.5)` |
| HSV | `hsv(14, 80%, 100%)` |
| HWB | `hwb(14 0% 0%)` |
| Named | `red`, `tomato`, `rebeccapurple`, `transparent` |
| Object | `{ r: 255, g: 87, b: 51 }`, `{ h: 14, s: 100, l: 60 }` |

### 3.4 Factory Functions

```typescript
// Main color factory
function color(input: ColorInput): Color

// Specific format factories
function rgb(r: number, g: number, b: number, a?: number): Color
function hsl(h: number, s: number, l: number, a?: number): Color
function hsv(h: number, s: number, v: number, a?: number): Color
function hwb(h: number, w: number, b: number, a?: number): Color
function hex(hex: string): Color
function cmyk(c: number, m: number, y: number, k: number): Color
```

### 3.5 Conversion Utilities

```typescript
// Two-way conversions
function hexToRgb(hex: string): RgbColor
function rgbToHex(rgb: RgbColor): string
function rgbToHsl(rgb: RgbColor): HslColor
function hslToRgb(hsl: HslColor): RgbColor
function rgbToHsv(rgb: RgbColor): HsvColor
function hsvToRgb(hsv: HsvColor): RgbColor
function hsvToHsl(hsv: HsvColor): HslColor
function hslToHsv(hsl: HslColor): HsvColor
function rgbToHwb(rgb: RgbColor): HwbColor
function hwbToRgb(hwb: HwbColor): RgbColor
function rgbToCmyk(rgb: RgbColor): CmykColor
function cmykToRgb(cmyk: CmykColor): RgbColor
```

### 3.6 Manipulation Functions

```typescript
// Standalone versions
function lighten(color: ColorInput, amount?: number): Color
function darken(color: ColorInput, amount?: number): Color
function saturate(color: ColorInput, amount?: number): Color
function desaturate(color: ColorInput, amount?: number): Color
function brighten(color: ColorInput, amount?: number): Color
function spin(color: ColorInput, degrees: number): Color
function grayscale(color: ColorInput): Color
function invert(color: ColorInput): Color
function complement(color: ColorInput): Color
```

### 3.7 Mixing & Blending

```typescript
function mix(color1: ColorInput, color2: ColorInput, amount?: number): Color
function tint(color: ColorInput, amount?: number): Color
function shade(color: ColorInput, amount?: number): Color
function tone(color: ColorInput, amount?: number): Color

type BlendMode =
  | 'multiply' | 'screen' | 'overlay'
  | 'darken' | 'lighten' | 'color-dodge'
  | 'color-burn' | 'hard-light' | 'soft-light'
  | 'difference' | 'exclusion'

function blend(
  color1: ColorInput,
  color2: ColorInput,
  mode: BlendMode
): Color
```

### 3.8 Color Harmony

```typescript
function getComplementary(color: ColorInput): Color
function getTriadic(color: ColorInput): Color[]
function getTetradic(color: ColorInput): Color[]
function getAnalogous(
  color: ColorInput,
  options?: { count?: number; angle?: number }
): Color[]
function getSplitComplementary(color: ColorInput): Color[]
function getMonochromatic(color: ColorInput, count: number): Color[]
```

### 3.9 Palette Generation

```typescript
interface PaletteOptions {
  tints?: number
  shades?: number
  tones?: number
}

function generatePalette(
  color: ColorInput,
  options?: PaletteOptions
): Record<number, string>

function generateShades(color: ColorInput, count: number): Color[]
function generateTints(color: ColorInput, count: number): Color[]
function generateTones(color: ColorInput, count: number): Color[]
function generateScale(
  start: ColorInput,
  end: ColorInput,
  count: number
): Color[]
function generateTailwindPalette(color: ColorInput): Record<number, string>
```

### 3.10 Accessibility

```typescript
type WcagLevel = 'AA' | 'AAA'
type TextSize = 'normal' | 'large'

function getLuminance(color: ColorInput): number
function getContrast(color1: ColorInput, color2: ColorInput): number
function isReadable(
  foreground: ColorInput,
  background: ColorInput,
  level?: WcagLevel,
  size?: TextSize
): boolean
function getReadableColor(
  color: ColorInput,
  background: ColorInput,
  level?: WcagLevel
): Color
function suggestForeground(background: ColorInput): string
```

### 3.11 Validation

```typescript
function isValidColor(input: string): boolean
function parseColor(input: string): {
  valid: boolean
  color: Color | null
  format: ColorFormat | null
}
```

### 3.12 Headless Color Picker

```typescript
interface ColorPickerConfig {
  value?: ColorInput
  defaultValue?: ColorInput
  format?: ColorFormat
  outputFormat?: ColorFormat
  showAlpha?: boolean
  defaultAlpha?: number
  presets?: ColorInput[]
  showPresets?: boolean
  showInput?: boolean
  inputFormat?: ColorFormat
  showEyeDropper?: boolean
  showHue?: boolean
  showSaturation?: boolean
  onChange?: (color: Color) => void
  onChangeComplete?: (color: Color) => void
  onFormatChange?: (format: ColorFormat) => void
  id?: string
  ariaLabel?: string
}

function createColorPicker(config?: ColorPickerConfig): ColorPicker

interface ColorPicker {
  mount(container: HTMLElement): void
  unmount(): void
  isMounted(): boolean
  getState(): ColorPickerState
  subscribe(callback: (state: ColorPickerState) => void): () => void
  getValue(): Color
  setValue(color: ColorInput): void
  setHue(hue: number): void
  setSaturation(saturation: number): void
  setBrightness(brightness: number): void
  setAlpha(alpha: number): void
  setFromPosition(area: 'saturation' | 'hue' | 'alpha', position: { x: number; y: number }): void
  setInputValue(value: string): void
  setInputFormat(format: ColorFormat): void
  parseInput(): void
  isEyeDropperSupported(): boolean
  pickFromScreen(): Promise<Color | null>
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
  on<E extends PickerEvent>(event: E, handler: PickerEventHandler<E>): () => void
  off<E extends PickerEvent>(event: E, handler: PickerEventHandler<E>): void
  getConfig(): ColorPickerConfig
  setConfig(config: Partial<ColorPickerConfig>): void
  destroy(): void
}
```

### 3.13 Utilities

```typescript
// Random colors
function randomColor(options?: {
  luminance?: 'light' | 'dark'
  saturation?: [number, number]
  hue?: [number, number]
}): Color
function randomHex(): string
function randomPalette(count: number): Color[]

// Named colors
function getNamedColor(name: string): Color | null
function findClosestNamedColor(color: ColorInput): string | null
const namedColors: Record<string, string>

// Gradients
function createGradient(
  stops: Array<{ color: ColorInput; position: number }>,
  options?: { type?: 'linear' | 'radial'; angle?: number }
): string
function parseGradient(css: string): {
  type: 'linear' | 'radial'
  angle: number
  stops: Array<{ color: string; position: number }>
} | null

// Distance
function colorDistance(color1: ColorInput, color2: ColorInput): number
function deltaE(color1: ColorInput, color2: ColorInput): number
```

### 3.14 React Adapter

```typescript
// Hooks
function useColorPicker(config?: {
  value?: ColorInput
  defaultValue?: ColorInput
  onChange?: (color: Color) => void
  showAlpha?: boolean
}): {
  color: Color
  hue: number
  saturation: number
  brightness: number
  alpha: number
  inputValue: string
  isDragging: boolean
  setColor: (color: ColorInput) => void
  setHue: (hue: number) => void
  setSaturation: (sat: number) => void
  setBrightness: (val: number) => void
  setAlpha: (alpha: number) => void
  setInputValue: (val: string) => void
  getPickerProps: () => PickerProps
  getSaturationAreaProps: () => SaturationAreaProps
  getSaturationThumbProps: () => ThumbProps
  getHueSliderProps: () => SliderProps
  getHueThumbProps: () => ThumbProps
  getAlphaSliderProps: () => SliderProps
  getAlphaThumbProps: () => ThumbProps
  getInputProps: () => InputProps
  getPresetProps: (color: ColorInput) => PresetProps
  getEyeDropperProps: () => EyeDropperProps
  pickFromScreen: () => Promise<Color | null>
  isEyeDropperSupported: boolean
}

function useColor(value: ColorInput): {
  color: Color
  hex: string
  rgb: RgbaColor
  hsl: HslaColor
  hsv: HsvaColor
  isLight: boolean
  isDark: boolean
  luminance: number
  setColor: (color: ColorInput) => void
  lighten: (amount?: number) => Color
  darken: (amount?: number) => Color
  saturate: (amount?: number) => Color
  desaturate: (amount?: number) => Color
  complement: () => Color
  invert: () => Color
}

// Components
function ColorPicker(props: {
  value?: ColorInput
  defaultValue?: ColorInput
  onChange?: (color: Color) => void
  showAlpha?: boolean
  showInput?: boolean
  presets?: ColorInput[]
  showEyeDropper?: boolean
  compact?: boolean
}): JSX.Element

function ColorInput(props: {
  value: ColorInput
  onChange: (color: string) => void
  format?: ColorFormat
  placeholder?: string
  showPreview?: boolean
}): JSX.Element

function ColorSwatch(props: {
  color: ColorInput
  size?: number
  selected?: boolean
  onClick?: () => void
}): JSX.Element

function HuePicker(props: {
  value: number
  onChange: (hue: number) => void
  direction?: 'horizontal' | 'vertical'
}): JSX.Element

function SaturationPicker(props: {
  hue: number
  saturation: number
  brightness: number
  onChange: (state: { s: number; v: number }) => void
}): JSX.Element

function AlphaPicker(props: {
  color: ColorInput
  value: number
  onChange: (alpha: number) => void
}): JSX.Element

function EyeDropper(props: {
  onPick: (color: Color) => void
}): JSX.Element
```

## 4. Named Colors

All 147 CSS named colors must be supported including:
- Basic: `red`, `green`, `blue`, etc.
- Extended: `tomato`, `coral`, `khaki`, etc.
- Special: `transparent`, `currentColor`
- Modern: `rebeccapurple`

## 5. WCAG Compliance

### 5.1 Contrast Requirements

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA | 4.5:1 | 3.0:1 |
| AAA | 7.0:1 | 4.5:1 |

### 5.2 Luminance Formula

Using relative luminance from WCAG 2.0:
```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
```

Where RGB values are linearized (gamma-corrected).

## 6. File Structure

```
src/
├── index.ts
├── types.ts
├── core/
│   ├── color.ts
│   ├── parse.ts
│   ├── validate.ts
│   └── factory.ts
├── conversion/
│   ├── hex.ts
│   ├── rgb.ts
│   ├── hsl.ts
│   ├── hsv.ts
│   ├── hwb.ts
│   ├── cmyk.ts
│   └── named.ts
├── manipulation/
│   ├── lighten.ts
│   ├── saturate.ts
│   ├── spin.ts
│   ├── invert.ts
│   └── alpha.ts
├── mixing/
│   ├── mix.ts
│   ├── blend.ts
│   └── tint.ts
├── harmony/
│   ├── complementary.ts
│   ├── triadic.ts
│   └── analogous.ts
├── palette/
│   ├── generate.ts
│   └── tailwind.ts
├── accessibility/
│   ├── contrast.ts
│   └── luminance.ts
├── picker/
│   ├── picker.ts
│   └── props.ts
├── utils/
│   ├── clamp.ts
│   └── events.ts
└── adapters/
    └── react/
        ├── index.ts
        └── hooks/
```

## 7. Export Structure

```typescript
// Main exports
export {
  color,
  rgb,
  hsl,
  hsv,
  hwb,
  hex,
  cmyk,
  Color,
  type ColorInput,
  type ColorFormat,
  // ... all types
}

// Validation
export { isValidColor, parseColor }

// Conversion utilities
export {
  hexToRgb,
  rgbToHex,
  // ... all conversions
}

// Manipulation
export {
  lighten,
  darken,
  // ... all manipulation
}

// Mixing
export { mix, blend, tint, shade, tone }

// Harmony
export {
  getComplementary,
  getTriadic,
  // ... all harmony
}

// Palette
export {
  generatePalette,
  generateShades,
  // ... all palette
}

// Accessibility
export {
  getLuminance,
  getContrast,
  isReadable,
  getReadableColor,
  suggestForeground,
}

// Picker
export { createColorPicker }

// Utilities
export {
  randomColor,
  randomHex,
  randomPalette,
  getNamedColor,
  findClosestNamedColor,
  namedColors,
  createGradient,
  parseGradient,
  colorDistance,
  deltaE,
}

// React (separate package)
export {
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
```

## 8. Test Requirements

### 8.1 Coverage
- 100% statement coverage
- 100% branch coverage
- 100% function coverage
- 100% line coverage

### 8.2 Test Categories
1. **Unit Tests** - Individual functions
2. **Integration Tests** - Multi-function workflows
3. **Edge Cases** - Boundary values, invalid inputs
4. **Browser Tests** - Color picker interactions

## 9. Performance Targets

| Metric | Target |
|--------|--------|
| Tree-shakeable core | < 2KB |
| Full ESM build | < 4KB |
| Minified + gzipped | < 4KB |
| Color creation | < 0.1ms |
| Format conversion | < 0.05ms |
| Manipulation | < 0.1ms |

---

**Specification Version**: 1.0.0
**Last Updated**: 2025-12-30
**Status**: Complete
