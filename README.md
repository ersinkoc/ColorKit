# @oxog/colorkit

Zero-dependency headless color picker and utilities with format conversion and accessibility.

[![npm version](https://img.shields.io/npm/v/@oxog/colorkit.svg)](https://www.npmjs.com/package/@oxog/colorkit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@oxog/colorkit)](https://bundlephobia.com/package/@oxog/colorkit)
[![license](https://img.shields.io/npm/l/@oxog/colorkit.svg)](https://github.com/ersinkoc/colorkit/blob/main/LICENSE)

## Features

- **Zero dependencies** - No external packages
- **Tiny bundle** - < 4KB gzipped
- **TypeScript first** - Full type safety with strict mode
- **Tree-shakeable** - Import only what you need
- **Headless picker** - Framework-agnostic color picker logic
- **Format conversion** - HEX, RGB, HSL, HSV, HWB, CMYK, Named colors
- **Accessibility** - WCAG contrast ratio and readable color selection
- **Color manipulation** - Lighten, darken, saturate, desaturate, invert, mix
- **Harmonies** - Complementary, analogous, triadic, tetradic, split-complementary
- **Palette generation** - Shades, tints, tones, Tailwind-style palettes

## Installation

```bash
npm install @oxog/colorkit
```

## Quick Start

```typescript
import { color, mix, contrast, complementary } from '@oxog/colorkit';

// Create a color
const red = color('#ff0000');

// Convert formats
red.toRgb();     // { r: 255, g: 0, b: 0, a: 1 }
red.toHsl();     // { h: 0, s: 100, l: 50, a: 1 }
red.toHex();     // '#ff0000'

// Manipulate
red.lighten(20);     // Lighter red
red.darken(20);      // Darker red
red.saturate(10);    // More saturated
red.desaturate(10);  // Less saturated
red.invert();        // Cyan

// Mix colors
mix(red, color('#0000ff'), 0.5);  // Purple

// Accessibility
contrast(red, color('#ffffff'));  // 3.998...

// Color harmonies
complementary(red);  // [red, cyan]
```

## Core API

### Color Creation

```typescript
import { color } from '@oxog/colorkit';

// From various formats
color('#ff0000');
color('rgb(255, 0, 0)');
color('hsl(0, 100%, 50%)');
color({ r: 255, g: 0, b: 0 });
color('red');  // Named colors
```

### Format Conversion

```typescript
const c = color('#ff6b6b');

c.toHex();        // '#ff6b6b'
c.toHex8();       // '#ff6b6bff'
c.toRgb();        // { r: 255, g: 107, b: 107, a: 1 }
c.toRgbString();  // 'rgb(255, 107, 107)'
c.toHsl();        // { h: 0, s: 100, l: 71, a: 1 }
c.toHslString();  // 'hsl(0, 100%, 71%)'
c.toHsv();        // { h: 0, s: 58, v: 100, a: 1 }
c.toHwb();        // { h: 0, w: 42, b: 0, a: 1 }
c.toCmyk();       // { c: 0, m: 58, y: 58, k: 0 }
c.toName();       // null (not a named color)
```

### Color Manipulation

```typescript
import { color } from '@oxog/colorkit';

const c = color('#3498db');

c.lighten(20);      // Increase lightness by 20%
c.darken(20);       // Decrease lightness by 20%
c.saturate(20);     // Increase saturation by 20%
c.desaturate(20);   // Decrease saturation by 20%
c.spin(180);        // Rotate hue by 180 degrees
c.invert();         // Invert the color
c.alpha(0.5);       // Set alpha to 0.5
```

### Color Mixing

```typescript
import { color, mix, tint, shade, blend } from '@oxog/colorkit';

const red = color('#ff0000');
const blue = color('#0000ff');

mix(red, blue, 0.5);     // Purple (50% mix)
tint(red, 0.5);          // 50% towards white
shade(red, 0.5);         // 50% towards black
blend(red, blue, 'multiply');  // Multiply blend mode
```

### Color Harmonies

```typescript
import {
  color,
  complementary,
  analogous,
  triadic,
  tetradic,
  splitComplementary,
  monochromatic
} from '@oxog/colorkit';

const base = color('#3498db');

complementary(base);       // [base, complement]
analogous(base);           // [base, -30deg, +30deg]
triadic(base);             // [base, +120deg, +240deg]
tetradic(base);            // [base, +90deg, +180deg, +270deg]
splitComplementary(base);  // [base, +150deg, +210deg]
monochromatic(base, 5);    // 5 shades of the base color
```

### Palette Generation

```typescript
import { color, shades, tints, tones, scale, tailwindPalette } from '@oxog/colorkit';

const base = color('#3498db');

shades(base, 5);    // 5 darker versions
tints(base, 5);     // 5 lighter versions
tones(base, 5);     // 5 versions mixed with gray
scale([color('#ff0000'), color('#0000ff')], 10);  // 10 colors from red to blue

// Generate Tailwind-style palette (50-950)
tailwindPalette(base);
// { 50: '#...', 100: '#...', ..., 900: '#...', 950: '#...' }
```

### Accessibility

```typescript
import { color, contrast, isReadable, mostReadable, luminance } from '@oxog/colorkit';

const text = color('#000000');
const bg = color('#ffffff');

luminance(text);              // 0
contrast(text, bg);           // 21 (max contrast)
isReadable(text, bg);         // true (WCAG AA)
isReadable(text, bg, 'AAA');  // true (WCAG AAA)

// Find most readable color from options
mostReadable(bg, [
  color('#000000'),
  color('#333333'),
  color('#666666')
]);  // Returns black (highest contrast)
```

### Headless Color Picker

```typescript
import { createPicker } from '@oxog/colorkit';

const picker = createPicker({
  color: '#ff0000',
  onChange: (color) => console.log(color.toHex())
});

// Get current state
picker.getColor();        // Color instance
picker.getHsv();          // { h, s, v, a }

// Update color
picker.setColor('#00ff00');
picker.setHue(180);
picker.setSaturation(50);
picker.setValue(80);
picker.setAlpha(0.5);

// Position helpers (for UI)
picker.getAreaPosition();   // { x, y } for saturation/value area
picker.getHuePosition();    // Position for hue slider
picker.getAlphaPosition();  // Position for alpha slider

// Set from position
picker.setFromAreaPosition(x, y);
picker.setFromHuePosition(position);
picker.setFromAlphaPosition(position);
```

## Tree Shaking

Import only what you need for smaller bundles:

```typescript
// Full import
import { color, mix, contrast } from '@oxog/colorkit';

// Core only (smaller)
import { color } from '@oxog/colorkit/core';
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Documentation

Full documentation available at [colorkit.oxog.dev](https://colorkit.oxog.dev)

## License

MIT
