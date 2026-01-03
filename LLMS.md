# @oxog/colorkit - LLM Documentation

> Zero-dependency headless color picker and utilities with format conversion and accessibility.

**Version:** 1.0.0
**License:** MIT
**Repository:** https://github.com/ersinkoc/colorkit
**Author:** Ersin KOC
**Bundle Size:** < 4KB gzipped
**Test Coverage:** 100%

---

## Quick Reference

### Installation

```bash
npm install @oxog/colorkit
# or
yarn add @oxog/colorkit
# or
pnpm add @oxog/colorkit
```

### Quick Start

```typescript
import { color, mix, getContrast, getComplementary } from '@oxog/colorkit';

// Create a color from any format
const red = color('#ff0000');

// Convert formats
red.toRgb();     // { r: 255, g: 0, b: 0, a: 1 }
red.toHsl();     // { h: 0, s: 100, l: 50, a: 1 }
red.toHex();     // '#ff0000'

// Manipulate (returns new immutable Color)
red.lighten(20);      // Lighter red
red.darken(20);       // Darker red
red.invert();         // Cyan

// Mix colors
mix(red, color('#0000ff'), 0.5);  // Purple

// Accessibility
getContrast(red, color('#ffffff'));  // 3.998...
```

---

## Package Overview

### Purpose

ColorKit is a comprehensive, zero-dependency color manipulation library for JavaScript/TypeScript. It provides a unified API for color conversion between 11 formats, color manipulation, accessibility testing (WCAG), palette generation, and a headless color picker component for building custom UI.

### Key Features

- **Zero Dependencies:** No external packages required
- **Tiny Bundle:** < 4KB gzipped, tree-shakeable
- **TypeScript First:** Full type safety with strict mode
- **Immutable Operations:** All manipulations return new Color instances
- **Format Conversion:** HEX, RGB, HSL, HSV, HWB, CMYK, Named colors (147)
- **Accessibility:** WCAG contrast ratio and readable color selection (AA/AAA)
- **Color Manipulation:** Lighten, darken, saturate, desaturate, invert, spin, blend
- **Color Harmonies:** Complementary, analogous, triadic, tetradic, split-complementary, monochromatic
- **Palette Generation:** Shades, tints, tones, scales, Tailwind-style palettes
- **Headless Picker:** Framework-agnostic color picker logic with accessibility support

### Architecture

ColorKit uses RGBA (0-255, 0-1 alpha) as its internal color storage format for efficient browser compatibility. The library is organized into modules:

- **Core:** Color class, parsing, validation, factory functions
- **Conversion:** Bidirectional format conversion between all color spaces
- **Manipulation:** Color adjustments (lighten, saturate, spin, etc.)
- **Mixing:** Linear mixing, tint, shade, tone, blend modes
- **Harmony:** Color scheme generators
- **Palette:** Palette and scale generation
- **Accessibility:** WCAG luminance, contrast, readability
- **Picker:** Headless color picker state management
- **Utils:** Clamping, rounding, interpolation, distance, gradients

### Dependencies

- **Runtime:** Zero runtime dependencies
- **Peer:** None
- **Dev:** TypeScript 5.7+, Vitest, tsup

---

## API Reference

### Exports Summary

| Export | Type | Description |
|--------|------|-------------|
| `color` | function | Create a Color from any input format |
| `Color`, `ColorClass` | class | Core immutable color class |
| `rgb`, `hsl`, `hsv`, `hwb`, `hex`, `cmyk` | functions | Factory functions for specific formats |
| `parseColor` | function | Parse color from string/object |
| `isValidColor` | function | Validate color string |
| `mix`, `tint`, `shade`, `tone`, `blend` | functions | Color mixing utilities |
| `lighten`, `darken`, `saturate`, `desaturate`, `brighten`, `spin` | functions | Manipulation |
| `grayscale`, `invert`, `complement` | functions | Color transforms |
| `fade`, `fadeIn`, `fadeOut`, `opaque`, `transparent` | functions | Alpha manipulation |
| `getComplementary`, `getTriadic`, `getTetradic`, `getAnalogous`, `getSplitComplementary`, `getMonochromatic` | functions | Color harmonies |
| `generatePalette`, `generateShades`, `generateTints`, `generateTones`, `generateScale`, `generateTailwindPalette` | functions | Palette generation |
| `getLuminance`, `getContrast`, `isReadable`, `getReadableColor`, `suggestForeground` | functions | Accessibility |
| `ColorPicker`, `createColorPicker` | class/function | Headless color picker |
| `randomColor`, `randomHex`, `randomPalette` | functions | Random generation |
| `colorDistance`, `deltaE` | functions | Color distance calculations |
| `createGradient`, `parseGradient` | functions | Gradient utilities |
| `clamp`, `clamp01`, `clamp0255`, `clamp0100`, `clamp0360` | functions | Value clamping |
| `lerp`, `round`, `roundToByte`, `roundTo1` | functions | Math utilities |

---

## Core API

### `color(input)`

Create a Color instance from any supported format.

**Signatures:**

```typescript
function color(input: ColorInput): Color | null
function color(r: number, g: number, b: number, a?: number): Color
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `ColorInput` | Yes | Any color format (string or object) |

**ColorInput Types:**

```typescript
type ColorInput =
  | string                    // '#ff5733', 'rgb(255,87,51)', 'hsl(14,100%,60%)', 'red'
  | RgbColor                  // { r: 255, g: 87, b: 51 }
  | RgbaColor                 // { r: 255, g: 87, b: 51, a: 1 }
  | HslColor                  // { h: 14, s: 100, l: 60 }
  | HslaColor                 // { h: 14, s: 100, l: 60, a: 1 }
  | HsvColor                  // { h: 14, s: 80, v: 100 }
  | HsvaColor                 // { h: 14, s: 80, v: 100, a: 1 }
  | HwbColor                  // { h: 14, w: 0, b: 0 }
  | CmykColor                 // { c: 0, m: 66, y: 80, k: 0 }
  | Color                     // Existing Color instance (cloned)
```

**Returns:** `Color | null` - Returns null if parsing fails

**Examples:**

```typescript
// From HEX
color('#ff5733');
color('#f53');       // Shorthand
color('#ff573380');  // With alpha (hex8)

// From RGB string
color('rgb(255, 87, 51)');
color('rgba(255, 87, 51, 0.5)');

// From HSL string
color('hsl(14, 100%, 60%)');
color('hsla(14, 100%, 60%, 0.5)');

// From HSV string
color('hsv(14, 80%, 100%)');

// From HWB string
color('hwb(14 0% 0%)');

// From CMYK string
color('cmyk(0%, 66%, 80%, 0%)');

// From named color (147 CSS colors supported)
color('tomato');
color('rebeccapurple');

// From objects
color({ r: 255, g: 87, b: 51 });
color({ h: 14, s: 100, l: 60 });
color({ h: 14, s: 80, v: 100 });
color({ c: 0, m: 66, y: 80, k: 0 });

// Direct RGBA values
color(255, 87, 51);      // RGB
color(255, 87, 51, 0.5); // RGBA
```

---

### Color Class Methods

The `Color` class (aliased as `ColorClass`) is immutable - all manipulation methods return new instances.

#### Format Conversion Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `toHex()` | `string` | Returns HEX string: `'#ff5733'` |
| `toHexString()` | `string` | Alias for `toHex()` |
| `toHex8()` | `string` | Returns 8-char HEX with alpha: `'#ff5733ff'` |
| `toHex8String()` | `string` | Alias for `toHex8()` |
| `toRgb()` | `RgbaColor` | Returns `{ r, g, b, a }` |
| `toRgbString()` | `string` | Returns `'rgb(255, 87, 51)'` or `'rgba(...)'` |
| `toRgbaString()` | `string` | Always returns `'rgba(255, 87, 51, 1)'` |
| `toPercentageRgb()` | `RgbaColor` | Returns RGB as percentages |
| `toPercentageRgbString()` | `string` | Returns `'rgb(100%, 34%, 20%)'` |
| `toHsl()` | `HslaColor` | Returns `{ h, s, l, a }` |
| `toHslString()` | `string` | Returns `'hsl(14, 100%, 60%)'` |
| `toHslaString()` | `string` | Always returns `'hsla(14, 100%, 60%, 1)'` |
| `toHsv()` | `HsvaColor` | Returns `{ h, s, v, a }` |
| `toHsvString()` | `string` | Returns `'hsv(14, 80%, 100%)'` |
| `toHwb()` | `HwbColor` | Returns `{ h, w, b, a }` |
| `toHwbString()` | `string` | Returns `'hwb(14 0% 0%)'` |
| `toCmyk()` | `CmykColor` | Returns `{ c, m, y, k }` |
| `toCmykString()` | `string` | Returns `'cmyk(0%, 66%, 80%, 0%)'` |
| `toName()` | `string \| null` | Returns CSS name or null |
| `toString(format?)` | `string` | Convert to specified format |
| `toJSON()` | `RgbaColor` | Returns RGBA for serialization |

**Example:**

```typescript
const c = color('#ff6b6b');

c.toHex();        // '#ff6b6b'
c.toRgb();        // { r: 255, g: 107, b: 107, a: 1 }
c.toRgbString();  // 'rgb(255, 107, 107)'
c.toHsl();        // { h: 0, s: 100, l: 71, a: 1 }
c.toHslString();  // 'hsl(0, 100%, 71%)'
c.toHsv();        // { h: 0, s: 58, v: 100, a: 1 }
c.toHwb();        // { h: 0, w: 42, b: 0, a: 1 }
c.toCmyk();       // { c: 0, m: 58, y: 58, k: 0 }
c.toName();       // null (not a named color)
c.toString('hsl'); // 'hsl(0, 100%, 71%)'
```

#### Component Getters

| Method | Returns | Description |
|--------|---------|-------------|
| `red()` | `number` | Red channel (0-255) |
| `green()` | `number` | Green channel (0-255) |
| `blue()` | `number` | Blue channel (0-255) |
| `alpha()` | `number` | Alpha channel (0-1) |
| `hue()` | `number` | Hue (0-360) |
| `saturation()` | `number` | HSL saturation (0-100) |
| `lightness()` | `number` | HSL lightness (0-100) |
| `saturationv()` | `number` | HSV saturation (0-100) |
| `brightness()` | `number` | HSV brightness/value (0-100) |
| `whiteness()` | `number` | HWB whiteness (0-100) |
| `blackness()` | `number` | HWB blackness (0-100) |
| `luminance()` | `number` | WCAG relative luminance (0-1) |

#### Component Setters (Immutable)

All setters return a new Color instance:

| Method | Parameter | Description |
|--------|-----------|-------------|
| `setRed(value)` | `0-255` | Set red channel |
| `setGreen(value)` | `0-255` | Set green channel |
| `setBlue(value)` | `0-255` | Set blue channel |
| `setAlpha(value)` | `0-1` | Set alpha channel |
| `setHue(value)` | `0-360` | Set hue |
| `setSaturation(value)` | `0-100` | Set HSL saturation |
| `setLightness(value)` | `0-100` | Set HSL lightness |
| `setBrightness(value)` | `0-100` | Set HSV brightness |

**Example:**

```typescript
const c = color('#ff0000');
const lighter = c.setLightness(80);  // New color with L=80
const transparent = c.setAlpha(0.5); // New color with alpha=0.5
```

#### Manipulation Methods

All methods return new Color instances (immutable):

| Method | Default | Description |
|--------|---------|-------------|
| `lighten(amount?)` | 10 | Increase lightness by amount (0-100) |
| `darken(amount?)` | 10 | Decrease lightness by amount (0-100) |
| `saturate(amount?)` | 10 | Increase saturation by amount (0-100) |
| `desaturate(amount?)` | 10 | Decrease saturation by amount (0-100) |
| `brighten(amount?)` | 10 | Increase HSV brightness by amount (0-100) |
| `spin(degrees)` | - | Rotate hue by degrees (-360 to 360) |
| `grayscale()` | - | Remove all saturation |
| `invert()` | - | Invert RGB values |
| `complement()` | - | Get complementary color (180deg hue rotation) |

**Example:**

```typescript
const c = color('#3498db');

c.lighten(20);      // Lighter blue
c.darken(20);       // Darker blue
c.saturate(20);     // More vivid blue
c.desaturate(20);   // More muted blue
c.brighten(20);     // Brighter blue (HSV)
c.spin(180);        // Opposite hue (orange)
c.grayscale();      // Gray version
c.invert();         // Inverted color
c.complement();     // Complementary color

// Method chaining
c.lighten(10).saturate(20).spin(30);
```

#### Alpha Manipulation Methods

| Method | Description |
|--------|-------------|
| `fade(amount)` | Set alpha to specific value (0-1) |
| `fadeIn(amount)` | Increase alpha by amount |
| `fadeOut(amount)` | Decrease alpha by amount |
| `opaque()` | Set alpha to 1 |
| `transparent()` | Set alpha to 0 |

#### Mixing Methods

| Method | Default | Description |
|--------|---------|-------------|
| `mix(color, amount?)` | 0.5 | Mix with another color (0-1) |
| `tint(amount?)` | 0.1 | Mix with white (0-1) |
| `shade(amount?)` | 0.1 | Mix with black (0-1) |
| `tone(amount?)` | 0.1 | Mix with gray (0-1) |

#### Query Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `isLight()` | `boolean` | True if luminance > 0.5 |
| `isDark()` | `boolean` | True if luminance <= 0.5 |
| `isValid()` | `boolean` | Always true for constructed colors |
| `equals(color)` | `boolean` | Compare RGBA values |
| `clone()` | `Color` | Create exact copy |

#### Accessibility Methods

| Method | Description |
|--------|-------------|
| `luminance()` | Get WCAG relative luminance (0-1) |
| `contrast(color)` | Get contrast ratio with another color (1-21) |
| `isReadable(bg, level?, size?)` | Check WCAG readability |

---

## Standalone Functions

### Color Conversion Functions

```typescript
// HEX conversions
hexToRgb(hex: string): RgbaColor
rgbToHex(rgb: RgbColor): string
rgbToHex8(rgba: RgbaColor): string

// HSL conversions
rgbToHsl(rgb: RgbColor): HslColor
hslToRgb(hsl: HslColor | HslaColor): RgbaColor

// HSV conversions
rgbToHsv(rgb: RgbColor): HsvColor
hsvToRgb(hsv: HsvColor | HsvaColor): RgbaColor
hsvToHsl(hsv: HsvColor): HslColor
hslToHsv(hsl: HslColor): HsvColor

// HWB conversions
rgbToHwb(rgb: RgbColor): HwbColor
hwbToRgb(hwb: HwbColor): RgbaColor

// CMYK conversions
rgbToCmyk(rgb: RgbColor): CmykColor
cmykToRgb(cmyk: CmykColor): RgbaColor

// Named color lookup
getNamedColor(name: string): RgbaColor | null
rgbToName(rgb: RgbColor): string | null
findClosestNamedColor(rgb: RgbColor): string
namedColors(): string[]  // Returns all 147 CSS named colors
```

### Manipulation Functions

```typescript
lighten(color: ColorInput, amount?: number): Color
darken(color: ColorInput, amount?: number): Color
saturate(color: ColorInput, amount?: number): Color
desaturate(color: ColorInput, amount?: number): Color
brighten(color: ColorInput, amount?: number): Color
spin(color: ColorInput, degrees: number): Color
grayscale(color: ColorInput): Color
invert(color: ColorInput): Color
complement(color: ColorInput): Color

// Alpha
fade(color: ColorInput, amount: number): Color
fadeIn(color: ColorInput, amount: number): Color
fadeOut(color: ColorInput, amount: number): Color
opaque(color: ColorInput): Color
transparent(color: ColorInput): Color
```

### Mixing Functions

#### `mix(color1, color2, amount?)`

Linear RGB mixing between two colors.

```typescript
function mix(color1: ColorInput, color2: ColorInput, amount?: number): Color
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color1` | `ColorInput` | - | First color |
| `color2` | `ColorInput` | - | Second color |
| `amount` | `number` | 0.5 | Mix ratio (0 = color1, 1 = color2) |

```typescript
mix(color('#ff0000'), color('#0000ff'), 0.5);  // Purple
mix('#ff0000', '#00ff00', 0.25);  // Red-orange
```

#### `tint(color, amount?)`

Mix color with white.

```typescript
tint(color('#ff0000'), 0.5);  // Light red/pink
```

#### `shade(color, amount?)`

Mix color with black.

```typescript
shade(color('#ff0000'), 0.5);  // Dark red
```

#### `tone(color, amount?)`

Mix color with gray.

```typescript
tone(color('#ff0000'), 0.5);  // Muted red
```

#### `blend(color1, color2, mode)`

Blend two colors using Photoshop-style blend modes.

```typescript
function blend(color1: ColorInput, color2: ColorInput, mode: BlendMode): Color
```

**BlendMode Types:**

```typescript
type BlendMode =
  | 'normal'      // Alpha compositing
  | 'multiply'    // Darkens, multiplies RGB values
  | 'screen'      // Lightens, inverse of multiply
  | 'overlay'     // Combines multiply and screen
  | 'darken'      // Keeps darker channel values
  | 'lighten'     // Keeps lighter channel values
  | 'color-dodge' // Brightens bottom by top
  | 'color-burn'  // Darkens bottom by top
  | 'hard-light'  // Like overlay but reversed
  | 'soft-light'  // Subtle overlay effect
  | 'difference'  // Absolute difference
  | 'exclusion'   // Lower contrast difference
```

```typescript
blend('#ff0000', '#0000ff', 'multiply');  // Dark purple
blend('#ff0000', '#0000ff', 'screen');    // Light magenta
blend('#ff0000', '#00ff00', 'overlay');   // Yellow-orange
```

---

### Harmony Functions

All harmony functions return arrays of Color instances.

#### `getComplementary(color)`

Returns complementary color (180deg hue rotation).

```typescript
getComplementary('#ff0000');  // Returns [cyan Color]
```

#### `getTriadic(color)`

Returns 3 colors, 120deg apart.

```typescript
getTriadic('#ff0000');  // Returns [red, green, blue] Colors
```

#### `getTetradic(color)`

Returns 4 colors, 90deg apart (square).

```typescript
getTetradic('#ff0000');  // Returns 4 Colors
```

#### `getAnalogous(color, options?)`

Returns neighboring colors on the color wheel.

```typescript
interface HarmonyOptions {
  count?: number  // Number of colors (default: 3)
  angle?: number  // Angle between colors (default: 30)
}

getAnalogous('#ff0000');  // 3 colors, 30deg apart
getAnalogous('#ff0000', { count: 5, angle: 15 });
```

#### `getSplitComplementary(color)`

Returns the color plus two colors adjacent to its complement.

```typescript
getSplitComplementary('#ff0000');  // Returns 3 Colors
```

#### `getMonochromatic(color, count?)`

Returns variations of the same hue with different lightness.

```typescript
getMonochromatic('#ff0000', 5);  // 5 shades of red
```

---

### Palette Generation Functions

#### `generateShades(color, count)`

Generate darker variations (toward black).

```typescript
generateShades('#3498db', 5);  // 5 progressively darker blues
```

#### `generateTints(color, count)`

Generate lighter variations (toward white).

```typescript
generateTints('#3498db', 5);  // 5 progressively lighter blues
```

#### `generateTones(color, count)`

Generate muted variations (toward gray).

```typescript
generateTones('#3498db', 5);  // 5 progressively grayer blues
```

#### `generateScale(start, end, count)`

Generate a gradient scale between two colors.

```typescript
generateScale('#ff0000', '#0000ff', 10);  // 10 colors from red to blue
```

#### `generatePalette(color, options?)`

Generate a complete palette with tints, shades, and tones.

```typescript
interface PaletteOptions {
  tints?: number   // Number of tints (default: 3)
  shades?: number  // Number of shades (default: 3)
  tones?: number   // Number of tones (default: 0)
}

generatePalette('#3498db', { tints: 5, shades: 5 });
```

#### `generateTailwindPalette(color)`

Generate a Tailwind CSS-style palette (50-950).

```typescript
const palette = generateTailwindPalette('#3498db');
// Returns:
// {
//   50: '#e8f4fc',
//   100: '#d1e9f9',
//   200: '#a3d3f3',
//   300: '#75bded',
//   400: '#47a7e7',
//   500: '#3498db',  // Base color
//   600: '#2c81ba',
//   700: '#246a99',
//   800: '#1c5378',
//   900: '#143c57',
//   950: '#0c2536'
// }
```

---

### Accessibility Functions

#### `getLuminance(color)`

Calculate WCAG relative luminance.

```typescript
getLuminance('#ffffff');  // 1 (white)
getLuminance('#000000');  // 0 (black)
getLuminance('#ff0000');  // ~0.2126
```

#### `getContrast(foreground, background)`

Calculate WCAG contrast ratio between two colors.

```typescript
getContrast('#000000', '#ffffff');  // 21 (maximum)
getContrast('#ffffff', '#ffffff');  // 1 (minimum)
getContrast('#ff0000', '#ffffff');  // ~3.998
```

#### `isReadable(foreground, background, level?, size?)`

Check if text is readable according to WCAG guidelines.

```typescript
type WcagLevel = 'AA' | 'AAA'
type TextSize = 'normal' | 'large'

// WCAG AA requirements:
// - Normal text: 4.5:1 contrast ratio
// - Large text (18pt+): 3:1 contrast ratio

// WCAG AAA requirements:
// - Normal text: 7:1 contrast ratio
// - Large text: 4.5:1 contrast ratio

isReadable('#000000', '#ffffff');  // true (AA, normal)
isReadable('#000000', '#ffffff', 'AAA');  // true (AAA, normal)
isReadable('#666666', '#ffffff', 'AA', 'large');  // true (AA, large)
```

#### `getReadableColor(background)`

Returns black or white, whichever has better contrast.

```typescript
getReadableColor('#000000');  // Returns white Color
getReadableColor('#ffffff');  // Returns black Color
getReadableColor('#ff0000');  // Returns white Color (better contrast)
```

#### `suggestForeground(background)`

Quick suggestion of black or white hex for text.

```typescript
suggestForeground('#000000');  // '#ffffff'
suggestForeground('#ffffff');  // '#000000'
suggestForeground('#3498db');  // '#ffffff'
```

---

### Color Picker

#### `createColorPicker(config?)`

Create a headless color picker instance.

```typescript
interface ColorPickerConfig {
  // Value
  value?: ColorInput           // Initial color
  defaultValue?: ColorInput    // Default if value not set

  // Format
  format?: ColorFormat         // Internal format
  outputFormat?: ColorFormat   // Output format
  inputFormat?: ColorFormat    // Input field format

  // Alpha
  showAlpha?: boolean          // Enable alpha slider
  defaultAlpha?: number        // Default alpha (0-1)

  // Presets
  presets?: ColorInput[]       // Swatch presets
  showPresets?: boolean        // Show presets

  // UI options
  showInput?: boolean          // Show text input
  showEyeDropper?: boolean     // Show eye dropper button
  showHue?: boolean            // Show hue slider
  showSaturation?: boolean     // Show saturation area

  // Callbacks
  onChange?: (color: Color) => void           // Fires on every change
  onChangeComplete?: (color: Color) => void   // Fires when interaction ends
  onFormatChange?: (format: ColorFormat) => void

  // Accessibility
  id?: string
  ariaLabel?: string
}

const picker = createColorPicker({
  value: '#ff0000',
  onChange: (color) => console.log(color.toHex())
});
```

#### ColorPicker Methods

```typescript
// Lifecycle
picker.mount(container: HTMLElement): void
picker.unmount(): void
picker.isMounted(): boolean
picker.destroy(): void

// Value
picker.getValue(): Color
picker.setValue(color: ColorInput): void

// Component Control
picker.setHue(hue: number): void           // 0-360
picker.setSaturation(sat: number): void    // 0-100
picker.setBrightness(val: number): void    // 0-100
picker.setAlpha(alpha: number): void       // 0-1
picker.setFromPosition(area, position): void

// Input
picker.setInputValue(value: string): void
picker.setInputFormat(format: string): void
picker.parseInput(): void

// Eye Dropper
picker.isEyeDropperSupported(): boolean
picker.pickFromScreen(): Promise<Color | null>

// State
picker.getState(): ColorPickerState
picker.getConfig(): ColorPickerConfig
picker.setConfig(config: Partial<ColorPickerConfig>): void

// Events
picker.on(event, handler): () => void      // Returns unsubscribe fn
picker.off(event, handler): void
picker.subscribe(callback): () => void     // Subscribe to changes

// Props Getters (for UI binding)
picker.getInputProps(): { value, onChange }
picker.getColorAreaProps(): { onPointerDown }
picker.getHueSliderProps(): { value, onChange }
picker.getAlphaSliderProps(): { value }
```

**Picker Events:**

```typescript
type PickerEvent =
  | 'change'           // Color changed
  | 'changeComplete'   // Interaction ended
  | 'dragStart'        // Started dragging
  | 'dragEnd'          // Stopped dragging
  | 'formatChange'     // Format changed
```

**Example with React:**

```typescript
import { createColorPicker } from '@oxog/colorkit';
import { useEffect, useRef, useState } from 'react';

function ColorPicker() {
  const pickerRef = useRef(createColorPicker({ value: '#ff0000' }));
  const [color, setColor] = useState('#ff0000');

  useEffect(() => {
    const picker = pickerRef.current;
    return picker.subscribe((c) => setColor(c.toHex()));
  }, []);

  const handleAreaClick = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    pickerRef.current.setFromPosition('saturation', { x, y });
  };

  return (
    <div>
      <div
        className="saturation-area"
        onPointerDown={handleAreaClick}
        style={{ backgroundColor: `hsl(${pickerRef.current.getState().hue}, 100%, 50%)` }}
      />
      <input {...pickerRef.current.getInputProps()} />
    </div>
  );
}
```

---

### Utility Functions

#### Random Color Generation

```typescript
interface RandomColorOptions {
  luminance?: 'light' | 'dark'    // Constrain lightness
  saturation?: [number, number]   // Range [min, max] (0-100)
  hue?: [number, number]          // Range [min, max] (0-360)
  alpha?: number                  // Alpha value (0-1)
}

randomColor(): Color
randomColor({ luminance: 'light' }): Color
randomColor({ hue: [0, 60], saturation: [80, 100] }): Color  // Warm colors

randomHex(): string  // Returns '#xxxxxx'

randomPalette(count?: number): Color[]  // Default: 5 colors
```

#### Color Distance

```typescript
// Euclidean RGB distance
colorDistance('#ff0000', '#0000ff'): number  // ~360.62

// Delta E (CIE76) - perceptual difference
deltaE('#ff0000', '#ff0001'): number  // Very small
deltaE('#ff0000', '#0000ff'): number  // Large difference
```

#### Gradient Utilities

```typescript
interface GradientStop {
  color: ColorInput
  position: number  // 0-100
}

interface GradientOptions {
  type?: 'linear' | 'radial'  // Default: 'linear'
  angle?: number              // Default: 90
}

// Create CSS gradient string
createGradient([
  { color: '#ff0000', position: 0 },
  { color: '#0000ff', position: 100 }
], { angle: 45 });
// Returns: 'linear-gradient(45deg, #ff0000 0%, #0000ff 100%)'

// Parse CSS gradient
parseGradient('linear-gradient(90deg, #ff0000 0%, #0000ff 100%)');
// Returns: { type: 'linear', angle: 90, stops: [...] }
```

#### Math Utilities

```typescript
// Clamping
clamp(value: number, min: number, max: number): number
clamp01(value: number): number      // 0-1
clamp0255(value: number): number    // 0-255
clamp0100(value: number): number    // 0-100
clamp0360(value: number): number    // 0-360

// Rounding
round(value: number, decimals?: number): number
roundToByte(value: number): number  // Round to 0-255
roundTo1(value: number): number     // Round to 1 decimal

// Interpolation
lerp(a: number, b: number, t: number): number  // Linear interpolation
```

---

## Types & Interfaces

### Color Format Interfaces

```typescript
// RGB (0-255 range)
interface RgbColor {
  r: number  // 0-255
  g: number  // 0-255
  b: number  // 0-255
}

interface RgbaColor extends RgbColor {
  a: number  // 0-1
}

// HSL
interface HslColor {
  h: number  // 0-360 (hue)
  s: number  // 0-100 (saturation)
  l: number  // 0-100 (lightness)
}

interface HslaColor extends HslColor {
  a: number  // 0-1
}

// HSV (HSB)
interface HsvColor {
  h: number  // 0-360
  s: number  // 0-100
  v: number  // 0-100 (value/brightness)
}

interface HsvaColor extends HsvColor {
  a: number  // 0-1
}

// HWB
interface HwbColor {
  h: number  // 0-360
  w: number  // 0-100 (whiteness)
  b: number  // 0-100 (blackness)
  a?: number // 0-1
}

// CMYK
interface CmykColor {
  c: number  // 0-100 (cyan)
  m: number  // 0-100 (magenta)
  y: number  // 0-100 (yellow)
  k: number  // 0-100 (black)
}
```

### Other Types

```typescript
// Color format identifiers
type ColorFormat =
  | 'hex' | 'hex8'
  | 'rgb' | 'rgba'
  | 'hsl' | 'hsla'
  | 'hsv' | 'hsva'
  | 'hwb'
  | 'cmyk'
  | 'name'

// WCAG types
type WcagLevel = 'AA' | 'AAA'
type TextSize = 'normal' | 'large'

// Harmony options
interface HarmonyOptions {
  count?: number  // Number of colors
  angle?: number  // Angle between colors
}

// Palette options
interface PaletteOptions {
  tints?: number
  shades?: number
  tones?: number
}

// Random color options
interface RandomColorOptions {
  luminance?: 'light' | 'dark'
  saturation?: [number, number]
  hue?: [number, number]
  alpha?: number
}
```

### Type Imports

```typescript
import type {
  // Color formats
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

  // Accessibility
  WcagLevel,
  TextSize,

  // Picker
  ColorPickerConfig,
  ColorPickerState,
  PickerEvent,
  Position,

  // Utilities
  BlendMode,
  PaletteOptions,
  RandomColorOptions,
  GradientStop,
  GradientOptions,
  Gradient,
  HarmonyOptions
} from '@oxog/colorkit';
```

---

## Usage Patterns

### Pattern 1: Basic Color Manipulation

**Use Case:** Adjust a brand color for different UI states

```typescript
import { color } from '@oxog/colorkit';

const primary = color('#3498db');

const styles = {
  primary: primary.toHex(),
  primaryHover: primary.lighten(10).toHex(),
  primaryActive: primary.darken(10).toHex(),
  primaryDisabled: primary.desaturate(50).fade(0.5).toHex(),
  primaryFocus: primary.lighten(5).toHex(),
};
```

### Pattern 2: Generating Theme Palettes

**Use Case:** Create a complete color system from a single brand color

```typescript
import { color, generateTailwindPalette, getComplementary } from '@oxog/colorkit';

const brand = color('#6366f1');

// Primary palette
const primary = generateTailwindPalette(brand);

// Accent (complementary) palette
const accent = getComplementary(brand)[0];
const accentPalette = generateTailwindPalette(accent);

// Neutral palette (desaturated)
const neutral = generateTailwindPalette(brand.desaturate(90));

export const theme = {
  colors: {
    primary,
    accent: accentPalette,
    neutral,
  }
};
```

### Pattern 3: Accessible Color Pairs

**Use Case:** Ensure text/background combinations meet WCAG standards

```typescript
import { color, isReadable, getReadableColor, getContrast } from '@oxog/colorkit';

function getAccessibleTextColor(bg: string, level: 'AA' | 'AAA' = 'AA') {
  const background = color(bg);
  const black = color('#000000');
  const white = color('#ffffff');

  // Check white first (usually preferred for dark backgrounds)
  if (isReadable(white, background, level)) {
    return '#ffffff';
  }

  if (isReadable(black, background, level)) {
    return '#000000';
  }

  // Neither works - return the better option with a warning
  const whiteContrast = getContrast(white, background);
  const blackContrast = getContrast(black, background);

  console.warn(`Color ${bg} doesn't meet ${level} requirements`);
  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

// Usage
getAccessibleTextColor('#3498db');  // '#ffffff'
getAccessibleTextColor('#ecf0f1');  // '#000000'
```

### Pattern 4: Dynamic Color Schemes

**Use Case:** Generate harmonious color schemes for data visualization

```typescript
import { color, getAnalogous, getTriadic, getTetradic } from '@oxog/colorkit';

function getChartColors(baseColor: string, count: number) {
  const base = color(baseColor);

  if (count <= 3) {
    return getAnalogous(base, { count }).map(c => c.toHex());
  }

  if (count <= 4) {
    return getTetradic(base).map(c => c.toHex()).slice(0, count);
  }

  // For more colors, use triadic with tints/shades
  const triadic = getTriadic(base);
  const colors: string[] = [];

  for (const c of triadic) {
    colors.push(c.toHex());
    if (colors.length < count) colors.push(c.lighten(20).toHex());
    if (colors.length < count) colors.push(c.darken(20).toHex());
  }

  return colors.slice(0, count);
}
```

### Pattern 5: Color Input Component

**Use Case:** Build a color input with format switching

```typescript
import { color, parseColor } from '@oxog/colorkit';
import type { ColorFormat } from '@oxog/colorkit';

function ColorInput({ value, onChange }) {
  const [format, setFormat] = useState<ColorFormat>('hex');
  const c = color(value);

  const displayValue = c ? c.toString(format) : value;

  const handleChange = (newValue: string) => {
    const parsed = parseColor(newValue);
    if (parsed) {
      onChange(parsed.toHex());  // Always store as HEX
    }
  };

  return (
    <div>
      <input value={displayValue} onChange={e => handleChange(e.target.value)} />
      <select value={format} onChange={e => setFormat(e.target.value as ColorFormat)}>
        <option value="hex">HEX</option>
        <option value="rgb">RGB</option>
        <option value="hsl">HSL</option>
      </select>
    </div>
  );
}
```

---

## Integration Examples

### With React

```typescript
import { color, createColorPicker } from '@oxog/colorkit';
import { useEffect, useRef, useState, useCallback } from 'react';

// Hook for using the color picker
function useColorPicker(initialColor: string) {
  const picker = useRef(createColorPicker({ value: initialColor }));
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    return picker.current.subscribe((c) => {
      setCurrentColor(c.toHex());
    });
  }, []);

  const setColor = useCallback((value: string) => {
    picker.current.setValue(value);
  }, []);

  return { color: currentColor, setColor, picker: picker.current };
}

// Component using the hook
function ColorPickerDemo() {
  const { color: currentColor, setColor, picker } = useColorPicker('#ff6b6b');

  return (
    <div>
      <div
        style={{
          width: 200,
          height: 200,
          background: currentColor
        }}
      />
      <input
        type="color"
        value={currentColor}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}
```

### With Tailwind CSS

```typescript
import { generateTailwindPalette } from '@oxog/colorkit';

// Generate custom Tailwind palette
const brandPalette = generateTailwindPalette('#6366f1');

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: brandPalette,
        // Results in: brand-50, brand-100, ..., brand-950
      }
    }
  }
};
```

### With CSS-in-JS

```typescript
import { color, generateShades, generateTints } from '@oxog/colorkit';
import styled from 'styled-components';

const primary = color('#3498db');

const theme = {
  colors: {
    primary: primary.toHex(),
    primaryLight: primary.lighten(15).toHex(),
    primaryDark: primary.darken(15).toHex(),
    primaryAlpha50: primary.fade(0.5).toRgbaString(),
  }
};

const Button = styled.button`
  background: ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
  }

  &:active {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.primaryAlpha50};
  }
`;
```

### With Node.js / Server-Side

```typescript
import { color, isReadable, getContrast } from '@oxog/colorkit';

// Validate color accessibility in CI/CD
function validateBrandColors(colors: Record<string, string>) {
  const results: { pair: string; contrast: number; passes: boolean }[] = [];

  for (const [bgName, bgColor] of Object.entries(colors)) {
    for (const [fgName, fgColor] of Object.entries(colors)) {
      if (bgName === fgName) continue;

      const contrast = getContrast(fgColor, bgColor);
      results.push({
        pair: `${fgName} on ${bgName}`,
        contrast: Math.round(contrast * 100) / 100,
        passes: isReadable(fgColor, bgColor, 'AA'),
      });
    }
  }

  return results;
}

const brandColors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ffffff',
  text: '#2c3e50',
};

console.table(validateBrandColors(brandColors));
```

---

## Tree Shaking

ColorKit is fully tree-shakeable. Import only what you need:

```typescript
// Full import (includes everything)
import { color, mix, getContrast } from '@oxog/colorkit';

// Core only (smaller bundle)
import { color } from '@oxog/colorkit/core';
```

### Bundle Size by Module

| Import | Approx. Size |
|--------|-------------|
| Core only (`/core`) | ~1.5KB |
| + Conversion | ~2KB |
| + Manipulation | ~2.5KB |
| + Mixing | ~2.7KB |
| + Harmony | ~3KB |
| + Palette | ~3.2KB |
| + Accessibility | ~3.4KB |
| + Picker | ~3.8KB |
| Full package | ~4KB gzipped |

---

## Performance Considerations

### Bundle Size

- **Full package:** < 4KB gzipped
- **Tree-shakeable:** Yes
- **Side effects:** None (`sideEffects: false`)

### Optimization Tips

1. **Import only what you need:**
   ```typescript
   // Good - tree-shakeable
   import { color, lighten } from '@oxog/colorkit';

   // Avoid - imports everything
   import * as ColorKit from '@oxog/colorkit';
   ```

2. **Reuse Color instances:**
   ```typescript
   // Good - create once, reuse
   const primary = color('#3498db');
   const variants = [primary.lighten(10), primary.darken(10)];

   // Avoid - recreating on each use
   const variants = [color('#3498db').lighten(10), color('#3498db').darken(10)];
   ```

3. **Use core-only for minimal needs:**
   ```typescript
   // If you only need color parsing and conversion
   import { color } from '@oxog/colorkit/core';
   ```

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Node.js 18+

---

## Common Issues & Solutions

### Issue: `color()` returns null

**Cause:** Invalid color format passed

**Solution:**
```typescript
const c = color(input);
if (!c) {
  console.error('Invalid color:', input);
  // Use fallback
  return color('#000000');
}
```

### Issue: Colors look different after conversion

**Cause:** Color space conversions can cause minor rounding differences

**Solution:** This is expected behavior. For exact color matching, store colors in their original format and only convert for display.

### Issue: Contrast ratio seems wrong

**Cause:** May be confusing contrast ratio with perceived brightness

**Solution:** WCAG contrast is calculated using relative luminance, not visual brightness. A ratio of 4.5:1 is the minimum for AA compliance.

```typescript
// Check the actual contrast ratio
console.log(getContrast('#ff0000', '#ffffff'));  // ~3.998

// Red on white fails AA for normal text (< 4.5)
isReadable('#ff0000', '#ffffff', 'AA');  // false

// But passes for large text (>= 3.0)
isReadable('#ff0000', '#ffffff', 'AA', 'large');  // true
```

---

## Changelog (Recent)

### v1.0.0 (2026-01-03)

- Initial release with full feature set
- Core `Color` class with immutable representation
- Color parsing from 6+ formats (HEX, RGB, HSL, HSV, HWB, CMYK, named)
- Format conversion methods
- Color manipulation functions (lighten, darken, saturate, etc.)
- Color mixing utilities (mix, tint, shade, blend)
- Color harmony generators (6 types)
- Palette generation (5 types + Tailwind)
- Accessibility utilities (WCAG AA/AAA)
- Headless color picker
- Full TypeScript support with strict mode
- Tree-shakeable ESM exports
- Zero runtime dependencies
- 100% test coverage

---

## Links

- **NPM:** https://www.npmjs.com/package/@oxog/colorkit
- **GitHub:** https://github.com/ersinkoc/colorkit
- **Documentation:** https://colorkit.oxog.dev
- **Issues:** https://github.com/ersinkoc/colorkit/issues

---

## LLM Usage Notes

### Recommended Prompts

When helping users with this package:

1. "Create a color palette from my brand color `#3498db`"
2. "Check if this color combination is accessible"
3. "Generate complementary colors for my design"
4. "Convert this HEX color to HSL"
5. "Create a Tailwind-style palette from my primary color"

### Common Misconceptions

1. **Misconception:** `color()` modifies the original color
   **Reality:** All operations return new Color instances (immutable)

2. **Misconception:** HSL and HSV are the same
   **Reality:** HSL uses Lightness (0-100), HSV uses Value/Brightness (0-100). They produce different results.

3. **Misconception:** 4.5:1 contrast ratio means the colors are clearly visible
   **Reality:** 4.5:1 is the minimum for WCAG AA with normal text. Higher is better.

### Code Generation Guidelines

When generating code for this package:

- Always import types separately: `import type { ColorInput } from '@oxog/colorkit'`
- Use the latest API patterns (v1.0.0+)
- Include null checks when using `color()`: `const c = color(input); if (!c) return;`
- Use method chaining for multiple operations: `color('#fff').lighten(10).saturate(20)`
- Prefer specific imports over full package imports for tree-shaking

---

## Named Colors Reference

ColorKit supports all 147 CSS named colors. Common ones include:

| Name | HEX | RGB |
|------|-----|-----|
| `red` | #ff0000 | 255, 0, 0 |
| `green` | #008000 | 0, 128, 0 |
| `blue` | #0000ff | 0, 0, 255 |
| `white` | #ffffff | 255, 255, 255 |
| `black` | #000000 | 0, 0, 0 |
| `transparent` | #00000000 | 0, 0, 0, 0 |
| `rebeccapurple` | #663399 | 102, 51, 153 |
| `tomato` | #ff6347 | 255, 99, 71 |
| `coral` | #ff7f50 | 255, 127, 80 |
| `gold` | #ffd700 | 255, 215, 0 |
| `navy` | #000080 | 0, 0, 128 |
| `teal` | #008080 | 0, 128, 128 |

Get all named colors:
```typescript
import { namedColors } from '@oxog/colorkit';
console.log(namedColors());  // ['aliceblue', 'antiquewhite', ...]
```

---

## Document Metadata

- **Generated:** 2026-01-04
- **Package Version:** 1.0.0
- **Documentation Version:** 1.0
- **Format:** LLM-Optimized Markdown
- **Estimated Tokens:** ~12,000
