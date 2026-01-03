# ColorKit - Implementation Design

## 1. Architecture Overview

ColorKit follows a **modular, functional architecture** with a central immutable Color class. The design prioritizes:

1. **Zero dependencies** - All algorithms implemented from scratch
2. **Immutability** - All operations return new instances
3. **Tree-shakeability** - Small, focused modules
4. **Type safety** - Full TypeScript strict mode

### 1.1 Module Diagram

```
                    ┌─────────────┐
                    │   color()   │  Factory
                    └──────┬──────┘
                           │
                ┌──────────▼───────────┐
                │    parseColor()     │  Parser
                └──────────┬───────────┘
                           │
                    ┌──────▼──────┐
                    │   Color     │  Core Class
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
   │Conversion│      │Manipulation│     │Accessibility│
   └─────────┘      └───────────┘     └───────────┘
```

## 2. Core Design Decisions

### 2.1 Color Storage

**Decision**: Store colors as RGBA (0-255 range)

**Rationale**:
- RGB is the native browser color format
- Easiest to convert to/from other formats
- Alpha channel is always stored (default: 255)
- Simple integer arithmetic

**Implementation**:
```typescript
class Color {
  private _r: number  // 0-255
  private _g: number  // 0-255
  private _b: number  // 0-255
  private _a: number  // 0-255 (internal)

  get alpha(): number { return this._a / 255 }
}
```

### 2.2 Immutability Strategy

**Decision**: All manipulation methods return new Color instances

**Rationale**:
- Predictable behavior
- Enables method chaining
- Safe for concurrent operations
- Consistent with functional programming

**Implementation**:
```typescript
class Color {
  lighten(amount: number): Color {
    const hsl = this.toHsl()
    hsl.l = clamp(hsl.l + amount, 0, 100)
    return hslToColor(hsl)
  }
}
```

### 2.3 Parsing Strategy

**Decision**: Regex-based format detection with type guards

**Rationale**:
- Fast and reliable
- No external dependencies
- Easy to extend
- Clear error messages

**Implementation**:
```typescript
const HEX_REGEX = /^#?([0-9a-f]{3,8})$/i
const RGB_REGEX = /^rgba?\(([^)]+)\)$/i
// ... other formats

function parseColor(input: string): Color {
  if (HEX_REGEX.test(input)) return parseHex(input)
  if (RGB_REGEX.test(input)) return parseRgbString(input)
  // ... fallback to named colors
}
```

### 2.4 Conversion Algorithms

**Decision**: Direct RGB ↔ X conversions (no intermediate format)

**Rationale**:
- Fewer rounding errors
- Better performance
- Simpler code

**Color Space Conversions**:

| From | To | Algorithm |
|------|-----|-----------|
| HEX | RGB | Direct parsing |
| RGB | HSL | Standard formula |
| RGB | HSV | Standard formula |
| RGB | HWB | Via HSL |
| RGB | CMYK | Standard formula |

### 2.5 Caching Strategy

**Decision**: No caching - compute on demand

**Rationale**:
- Colors are small (16 bytes)
- Computations are fast (< 0.1ms)
- Caching adds complexity
- Memory overhead not justified

## 3. Module Implementation Details

### 3.1 Core Color Class

**File**: `src/core/color.ts`

**Key Methods**:
```typescript
class Color {
  // Constructor
  constructor(r: number, g: number, b: number, a: number = 255)

  // Internal validation
  private static validateChannel(value: number): number
  private static validateAlpha(value: number): number

  // Immutable storage
  get r(): number { return this._r }
  get g(): number { return this._g }
  get b(): number { return this._b }

  // Format conversion delegates
  toHex() { return rgbToHex(this) }
  toHsl() { return rgbToHsl(this) }
  // ... etc

  // Manipulation delegates
  lighten(amount) { return lightenColor(this, amount) }
  // ... etc
}
```

### 3.2 Parsing Module

**File**: `src/core/parse.ts`

**Function Order** (most common first):
1. `parseHex()` - HEX format (most used)
2. `parseRgbString()` - RGB/HSL strings
3. `parseObject()` - Object literals
4. `parseNamedColor()` - Named colors (lookup table)

**Named Color Storage**:
```typescript
const NAMED_COLORS: Record<string, number> = {
  red: 0xff0000,
  green: 0x008000,
  blue: 0x0000ff,
  // ... 147 colors total
}
```

### 3.3 Conversion Module

**File Structure**:
```
src/conversion/
├── hex.ts       // hexToRgb(), rgbToHex()
├── rgb.ts       // rgbToHsl(), hslToRgb(), rgbToHsv(), hsvToRgb()
├── hwb.ts       // rgbToHwb(), hwbToRgb() (uses HSL internally)
├── cmyk.ts      // rgbToCmyk(), cmykToRgb()
└── named.ts     // rgbToName() (inverse lookup)
```

**Precision**:
- All conversions use 16-bit internal precision
- Final output rounded to appropriate precision
- HEX: 8-bit (0-255)
- HSL/HSV/HWB/CMYK: 1 decimal place

### 3.4 Manipulation Module

**File Structure**:
```
src/manipulation/
├── lighten.ts   // lighten(), darken() via HSL
├── saturate.ts  // saturate(), desaturate() via HSL
├── spin.ts      // spin() via HSL hue rotation
├── invert.ts    // invert(), grayscale()
└── alpha.ts     // fade(), fadeIn(), fadeOut()
```

**HSL-based Manipulation**:
```typescript
function lighten(color: Color, amount: number): Color {
  const hsl = color.toHsl()
  hsl.l = clamp(hsl.l + amount, 0, 100)
  return hslToRgb(hsl)
}
```

### 3.5 Mixing Module

**File**: `src/mixing/mix.ts`

**Linear Interpolation**:
```typescript
function mix(c1: Color, c2: Color, amount: number): Color {
  const ratio = amount / 100
  return new Color(
    lerp(c1.r, c2.r, ratio),
    lerp(c1.g, c2.g, ratio),
    lerp(c1.b, c2.b, ratio),
    lerp(c1._a, c2._a, ratio)
  )
}
```

**Blend Modes**:
- Implemented in `src/mixing/blend.ts`
- Using standard SVG blend algorithms

### 3.6 Harmony Module

**File**: `src/harmony/`

**Strategy**: HSV hue-based calculations
```typescript
function getComplementary(color: Color): Color {
  const hsv = color.toHsv()
  hsv.h = (hsv.h + 180) % 360
  return hsvToRgb(hsv)
}
```

### 3.7 Palette Module

**File**: `src/palette/generate.ts`

**Shades** (darker):
```typescript
function generateShades(color: Color, count: number): Color[] {
  const shades = [color]
  const step = 100 / count
  for (let i = 1; i < count; i++) {
    shades.push(color.darken(step * i))
  }
  return shades
}
```

**Tailwind Palette**:
```typescript
function generateTailwindPalette(color: Color): Record<number, string> {
  return {
    50: color.tint(90).toHex(),
    100: color.tint(80).toHex(),
    // ... 200-950
    950: color.shade(95).toHex(),
  }
}
```

### 3.8 Accessibility Module

**File**: `src/accessibility/`

**Luminance Calculation** (WCAG 2.0):
```typescript
function getLuminance(color: Color): number {
  const [r, g, b] = [color.r, color.g, color.b].map(channel => {
    const srgb = channel / 255
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
```

**Contrast Ratio**:
```typescript
function getContrast(c1: Color, c2: Color): number {
  const l1 = getLuminance(c1)
  const l2 = getLuminance(c2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}
```

### 3.9 Color Picker Module

**File**: `src/picker/picker.ts`

**State Management**:
```typescript
interface ColorPickerState {
  color: Color
  hue: number        // 0-360
  saturation: number // 0-100 (HSV)
  brightness: number // 0-100 (HSV)
  alpha: number      // 0-1
  isDragging: boolean
  activeArea: 'saturation' | 'hue' | 'alpha' | null
}
```

**Event Handling**:
```typescript
class ColorPicker {
  private listeners: Map<string, Set<Function>>

  on<E extends PickerEvent>(event: E, handler: Function): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(handler)
    return () => this.off(event, handler)
  }

  emit<E extends PickerEvent>(event: E, ...args: any[]): void {
    this.listeners.get(event)?.forEach(handler => handler(...args))
  }
}
```

**Props Getters**:
```typescript
getSaturationAreaProps(): SaturationAreaProps {
  return {
    ref: (el) => this.saturationRef = el,
    role: 'slider',
    'aria-label': 'Saturation and brightness',
    'aria-valuetext': `${this.state.saturation}% saturation, ${this.state.brightness}% brightness`,
    tabIndex: 0,
    style: {
      backgroundColor: `hsl(${this.state.hue}, 100%, 50%)`
    },
    onMouseDown: this.handleSaturationMouseDown,
    onTouchStart: this.handleSaturationTouchStart,
    onKeyDown: this.handleSaturationKeyDown,
  }
}
```

**EyeDropper API**:
```typescript
async pickFromScreen(): Promise<Color | null> {
  if (!this.isEyeDropperSupported()) return null

  try {
    const eyeDropper = new (window as any).EyeDropper()
    const result = await eyeDropper.open()
    return color(result.sRGBHex)
  } catch {
    return null
  }
}
```

### 3.10 React Adapter

**File**: `src/adapters/react/hooks/useColorPicker.ts`

**Implementation**:
```typescript
function useColorPicker(config: UseColorPickerConfig = {}) {
  const pickerRef = useRef<ColorPicker | null>(null)
  const [state, setState] = useState<ColorPickerState>(() => {
    const picker = createColorPicker(config)
    pickerRef.current = picker
    return picker.getState()
  })

  useEffect(() => {
    const picker = pickerRef.current!
    return picker.subscribe(setState)
  }, [])

  return {
    ...state,
    setColor: (color: ColorInput) => pickerRef.current!.setValue(color),
    setHue: (hue: number) => pickerRef.current!.setHue(hue),
    // ... other methods
  }
}
```

## 4. Utility Functions

### 4.1 Clamp

**File**: `src/utils/clamp.ts`

```typescript
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function clamp01(value: number): number {
  return clamp(value, 0, 1)
}

function clamp0255(value: number): number {
  return clamp(value, 0, 255)
}

function clamp0100(value: number): number {
  return clamp(value, 0, 100)
}
```

### 4.2 Round

**File**: `src/utils/round.ts`

```typescript
function round(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision)
  return Math.round(value * multiplier) / multiplier
}

function roundToByte(value: number): number {
  return Math.round(value)
}
```

### 4.3 Linear Interpolation

**File**: `src/utils/lerp.ts`

```typescript
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}
```

## 5. Type Definitions

**File**: `src/types.ts`

```typescript
// Color input types
export type ColorInput =
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
export interface RgbColor {
  r: number  // 0-255
  g: number  // 0-255
  b: number  // 0-255
}

export interface RgbaColor extends RgbColor {
  a: number  // 0-1
}

export interface HslColor {
  h: number  // 0-360
  s: number  // 0-100
  l: number  // 0-100
}

export interface HslaColor extends HslColor {
  a: number  // 0-1
}

export interface HsvColor {
  h: number  // 0-360
  s: number  // 0-100
  v: number  // 0-100
}

export interface HsvaColor extends HsvColor {
  a: number  // 0-1
}

export interface HwbColor {
  h: number  // 0-360
  w: number  // 0-100
  b: number  // 0-100
  a?: number // 0-1
}

export interface CmykColor {
  c: number  // 0-100
  m: number  // 0-100
  y: number  // 0-100
  k: number  // 0-100
}

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

// WCAG types
export type WcagLevel = 'AA' | 'AAA'
export type TextSize = 'normal' | 'large'

// Color picker types
export interface ColorPickerConfig { /* ... */ }
export interface ColorPickerState { /* ... */ }
export type PickerEvent = 'change' | 'changeComplete' | 'dragStart' | 'dragEnd' | 'formatChange'
```

## 6. Export Strategy

### 6.1 Main Entry Point

**File**: `src/index.ts`

```typescript
// Core
export { Color, color } from './core/color'
export { rgb, hsl, hsv, hwb, hex, cmyk } from './core/factory'
export { isValidColor, parseColor } from './core/validate'

// Types
export type {
  ColorInput,
  ColorFormat,
  RgbColor,
  RgbaColor,
  HslColor,
  HslaColor,
  HsvColor,
  HsvaColor,
  HwbColor,
  CmykColor,
} from './types'

// Conversion
export {
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
} from './conversion'

// Manipulation
export {
  lighten,
  darken,
  saturate,
  desaturate,
  brighten,
  spin,
  grayscale,
  invert,
  complement,
} from './manipulation'

// Mixing
export { mix, blend, tint, shade, tone } from './mixing'

// Harmony
export {
  getComplementary,
  getTriadic,
  getTetradic,
  getAnalogous,
  getSplitComplementary,
  getMonochromatic,
} from './harmony'

// Palette
export {
  generatePalette,
  generateShades,
  generateTints,
  generateTones,
  generateScale,
  generateTailwindPalette,
} from './palette'

// Accessibility
export {
  getLuminance,
  getContrast,
  isReadable,
  getReadableColor,
  suggestForeground,
} from './accessibility'

// Picker
export { createColorPicker } from './picker'

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
} from './utils'
```

### 6.2 React Entry Point

**File**: `src/adapters/react/index.ts`

```typescript
export {
  useColorPicker,
  useColor,
} from './hooks'

export {
  ColorPicker,
  ColorInput,
  ColorSwatch,
  HuePicker,
  SaturationPicker,
  AlphaPicker,
  EyeDropper,
} from './components'
```

## 7. Build Configuration

### 7.1 Package.json

```json
{
  "name": "@oxog/colorkit",
  "version": "1.0.0",
  "description": "Zero-dependency headless color picker and utilities",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./react": {
      "import": "./dist/react/index.js",
      "require": "./dist/react/index.cjs",
      "types": "./dist/react/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.7.2",
    "vitest": "^2.0.0",
    "tsup": "^8.0.0"
  }
}
```

### 7.2 TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 7.3 Build Config (tsup)

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/adapters/react/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
})
```

## 8. Testing Strategy

### 8.1 Test Structure

```
tests/
├── unit/
│   ├── core/
│   │   ├── color.test.ts
│   │   ├── parse.test.ts
│   │   └── factory.test.ts
│   ├── conversion/
│   │   ├── hex.test.ts
│   │   ├── rgb.test.ts
│   │   └── hsl.test.ts
│   ├── manipulation/
│   │   ├── lighten.test.ts
│   │   └── saturate.test.ts
│   ├── mixing/
│   │   └── mix.test.ts
│   ├── harmony/
│   │   └── complementary.test.ts
│   ├── palette/
│   │   └── generate.test.ts
│   ├── accessibility/
│   │   └── contrast.test.ts
│   └── picker/
│       └── picker.test.ts
├── integration/
│   ├── color.test.ts
│   └── picker.test.ts
└── fixtures/
    └── colors.json
```

### 8.2 Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
})
```

## 9. Performance Optimizations

### 9.1 Bundle Size Reduction

1. **Tree-shakeable exports** - All named exports
2. **No unused code** - Dead code elimination
3. **Minimal runtime** - No dynamic imports
4. **Inline utilities** - Small functions inlined by bundler

### 9.2 Runtime Optimizations

1. **Memoization** - Only for expensive operations
2. **Lazy conversion** - Convert only when needed
3. **Integer math** - Use integers where possible
4. **Early returns** - Fast path checks

---

**Implementation Version**: 1.0.0
**Last Updated**: 2025-12-30
**Status**: Complete
