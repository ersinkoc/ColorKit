export const apiData = [
  {
    name: 'Color Class',
    id: 'color-class',
    description: 'Core color manipulation class',
    items: [
      {
        name: 'constructor',
        signature: 'new ColorClass(r: number, g: number, b: number, a?: number)',
        description: 'Creates a new color from RGB values.',
        params: [
          { name: 'r', type: 'number', description: 'Red channel (0-255)' },
          { name: 'g', type: 'number', description: 'Green channel (0-255)' },
          { name: 'b', type: 'number', description: 'Blue channel (0-255)' },
          { name: 'a', type: 'number', description: 'Alpha channel (0-1), optional' },
        ],
        returns: { type: 'ColorClass', description: 'New color instance' },
        example: `const color = new ColorClass(255, 0, 0)
const colorWithAlpha = new ColorClass(255, 0, 0, 0.5)`,
      },
      {
        name: 'toHex',
        signature: 'toHex(): string',
        description: 'Converts color to 6-digit HEX string.',
        returns: { type: 'string', description: 'HEX color string (e.g., "#ff0000")' },
        example: `new ColorClass(255, 0, 0).toHex() // "#ff0000"`,
      },
      {
        name: 'toRgb',
        signature: 'toRgb(): RgbaColor',
        description: 'Converts color to RGB object.',
        returns: { type: 'RgbaColor', description: 'RGB color object with r, g, b, a properties' },
        example: `new ColorClass(255, 0, 0).toRgb() // { r: 255, g: 0, b: 0, a: 1 }`,
      },
      {
        name: 'toHsl',
        signature: 'toHsl(): HslaColor',
        description: 'Converts color to HSL object.',
        returns: { type: 'HslaColor', description: 'HSL color object with h, s, l, a properties' },
        example: `new ColorClass(255, 0, 0).toHsl() // { h: 0, s: 100, l: 50, a: 1 }`,
      },
      {
        name: 'lighten',
        signature: 'lighten(amount: number): ColorClass',
        description: 'Lightens the color by a percentage.',
        params: [
          { name: 'amount', type: 'number', description: 'Percentage to lighten (0-100)' },
        ],
        returns: { type: 'ColorClass', description: 'New lightened color' },
        example: `new ColorClass(100, 0, 0).lighten(20)`,
      },
      {
        name: 'darken',
        signature: 'darken(amount: number): ColorClass',
        description: 'Darkens the color by a percentage.',
        params: [
          { name: 'amount', type: 'number', description: 'Percentage to darken (0-100)' },
        ],
        returns: { type: 'ColorClass', description: 'New darkened color' },
        example: `new ColorClass(200, 100, 100).darken(20)`,
      },
      {
        name: 'saturate',
        signature: 'saturate(amount: number): ColorClass',
        description: 'Increases saturation by a percentage.',
        params: [
          { name: 'amount', type: 'number', description: 'Percentage to saturate (0-100)' },
        ],
        returns: { type: 'ColorClass', description: 'New saturated color' },
        example: `new ColorClass(150, 100, 100).saturate(20)`,
      },
      {
        name: 'desaturate',
        signature: 'desaturate(amount: number): ColorClass',
        description: 'Decreases saturation by a percentage.',
        params: [
          { name: 'amount', type: 'number', description: 'Percentage to desaturate (0-100)' },
        ],
        returns: { type: 'ColorClass', description: 'New desaturated color' },
        example: `new ColorClass(255, 100, 100).desaturate(50)`,
      },
      {
        name: 'mix',
        signature: 'mix(color: ColorInput, amount: number): ColorClass',
        description: 'Mixes this color with another color.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Color to mix with' },
          { name: 'amount', type: 'number', description: 'Mix amount (0-1)' },
        ],
        returns: { type: 'ColorClass', description: 'New mixed color' },
        example: `new ColorClass(255, 0, 0).mix('#0000ff', 0.5)`,
      },
    ],
  },
  {
    name: 'Conversion Functions',
    id: 'conversion',
    description: 'Color format conversion utilities',
    items: [
      {
        name: 'rgbToHsl',
        signature: 'rgbToHsl(rgb: RgbColor): HslColor',
        description: 'Converts RGB to HSL.',
        params: [
          { name: 'rgb', type: 'RgbColor', description: 'RGB color object' },
        ],
        returns: { type: 'HslColor', description: 'HSL color object' },
        example: `rgbToHsl({ r: 255, g: 0, b: 0 }) // { h: 0, s: 100, l: 50 }`,
      },
      {
        name: 'hslToRgb',
        signature: 'hslToRgb(hsl: HslColor): RgbaColor',
        description: 'Converts HSL to RGB.',
        params: [
          { name: 'hsl', type: 'HslColor', description: 'HSL color object' },
        ],
        returns: { type: 'RgbaColor', description: 'RGB color object with alpha' },
        example: `hslToRgb({ h: 0, s: 100, l: 50 }) // { r: 255, g: 0, b: 0, a: 1 }`,
      },
      {
        name: 'rgbToHsv',
        signature: 'rgbToHsv(rgb: RgbColor): HsvaColor',
        description: 'Converts RGB to HSV.',
        params: [
          { name: 'rgb', type: 'RgbColor', description: 'RGB color object' },
        ],
        returns: { type: 'HsvaColor', description: 'HSV color object with alpha' },
        example: `rgbToHsv({ r: 255, g: 0, b: 0 }) // { h: 0, s: 100, v: 100, a: 1 }`,
      },
      {
        name: 'rgbToHwb',
        signature: 'rgbToHwb(rgb: RgbColor): HwbColor',
        description: 'Converts RGB to HWB.',
        params: [
          { name: 'rgb', type: 'RgbColor', description: 'RGB color object' },
        ],
        returns: { type: 'HwbColor', description: 'HWB color object' },
        example: `rgbToHwb({ r: 255, g: 0, b: 0 }) // { h: 0, w: 0, b: 0, a: 1 }`,
      },
      {
        name: 'rgbToCmyk',
        signature: 'rgbToCmyk(rgb: RgbColor): CmykColor',
        description: 'Converts RGB to CMYK.',
        params: [
          { name: 'rgb', type: 'RgbColor', description: 'RGB color object' },
        ],
        returns: { type: 'CmykColor', description: 'CMYK color object' },
        example: `rgbToCmyk({ r: 255, g: 0, b: 0 }) // { c: 0, m: 100, y: 100, k: 0 }`,
      },
    ],
  },
  {
    name: 'Mixing Functions',
    id: 'mixing',
    description: 'Color mixing and blending utilities',
    items: [
      {
        name: 'mix',
        signature: 'mix(color1: ColorInput, color2: ColorInput, amount?: number): ColorClass',
        description: 'Mixes two colors together.',
        params: [
          { name: 'color1', type: 'ColorInput', description: 'First color' },
          { name: 'color2', type: 'ColorInput', description: 'Second color' },
          { name: 'amount', type: 'number', description: 'Mix amount (0-1), default 0.5' },
        ],
        returns: { type: 'ColorClass', description: 'Mixed color' },
        example: `mix('#ff0000', '#0000ff', 0.5) // Purple`,
      },
      {
        name: 'tint',
        signature: 'tint(color: ColorInput, amount?: number): ColorClass',
        description: 'Mixes a color with white.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Input color' },
          { name: 'amount', type: 'number', description: 'Amount to mix (0-100), default 10' },
        ],
        returns: { type: 'ColorClass', description: 'Tinted color' },
        example: `tint('#ff0000', 20) // Lighter red`,
      },
      {
        name: 'shade',
        signature: 'shade(color: ColorInput, amount?: number): ColorClass',
        description: 'Mixes a color with black.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Input color' },
          { name: 'amount', type: 'number', description: 'Amount to mix (0-100), default 10' },
        ],
        returns: { type: 'ColorClass', description: 'Shaded color' },
        example: `shade('#ff0000', 20) // Darker red`,
      },
      {
        name: 'tone',
        signature: 'tone(color: ColorInput, amount?: number): ColorClass',
        description: 'Mixes a color with gray.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Input color' },
          { name: 'amount', type: 'number', description: 'Amount to mix (0-100), default 10' },
        ],
        returns: { type: 'ColorClass', description: 'Toned color' },
        example: `tone('#ff0000', 20) // Gray-ish red`,
      },
      {
        name: 'blend',
        signature: 'blend(color1: ColorInput, color2: ColorInput, mode: BlendMode): ColorClass',
        description: 'Blends two colors using blend mode.',
        params: [
          { name: 'color1', type: 'ColorInput', description: 'Top color' },
          { name: 'color2', type: 'ColorInput', description: 'Bottom color' },
          { name: 'mode', type: 'BlendMode', description: 'Blend mode (multiply, screen, overlay, etc.)' },
        ],
        returns: { type: 'ColorClass', description: 'Blended color' },
        example: `blend('#ff0000', '#0000ff', 'multiply')`,
      },
    ],
  },
  {
    name: 'Harmony Functions',
    id: 'harmony',
    description: 'Color harmony utilities',
    items: [
      {
        name: 'getComplementary',
        signature: 'getComplementary(color: ColorInput): ColorClass[]',
        description: 'Returns the complementary color (180° hue rotation).',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Input color' },
        ],
        returns: { type: 'ColorClass[]', description: 'Array with complementary color' },
        example: `getComplementary('#ff0000') // Cyan`,
      },
      {
        name: 'getTriadic',
        signature: 'getTriadic(color: ColorInput): ColorClass[]',
        description: 'Returns triadic colors (3 colors, 120° apart).',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Input color' },
        ],
        returns: { type: 'ColorClass[]', description: 'Array of 3 triadic colors' },
        example: `getTriadic('#ff0000') // Red, Green, Blue`,
      },
    ],
  },
  {
    name: 'Palette Functions',
    id: 'palette',
    description: 'Palette generation utilities',
    items: [
      {
        name: 'generateTints',
        signature: 'generateTints(color: ColorInput, count?: number): ColorClass[]',
        description: 'Generates tints (lighter variations) of a color.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Input color' },
          { name: 'count', type: 'number', description: 'Number of tints, default 11' },
        ],
        returns: { type: 'ColorClass[]', description: 'Array of tints including original' },
        example: `generateTints('#ff0000', 5) // Red to white`,
      },
      {
        name: 'generateShades',
        signature: 'generateShades(color: ColorInput, count?: number): ColorClass[]',
        description: 'Generates shades (darker variations) of a color.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Input color' },
          { name: 'count', type: 'number', description: 'Number of shades, default 11' },
        ],
        returns: { type: 'ColorClass[]', description: 'Array of shades including original' },
        example: `generateShades('#ff0000', 5) // Red to black`,
      },
      {
        name: 'generatePalette',
        signature: 'generatePalette(color: ColorInput, options?: PaletteOptions): Record<number, string>',
        description: 'Generates a full palette with tints and shades.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'Base color' },
          { name: 'options', type: 'PaletteOptions', description: 'Palette generation options' },
        ],
        returns: { type: 'Record<number, string>', description: 'Palette object with keys 50-950' },
        example: `generatePalette('#ff0000') // { 50: "#ff8080", ..., 950: "#500000" }`,
      },
    ],
  },
  {
    name: 'Accessibility Functions',
    id: 'accessibility',
    description: 'Color accessibility utilities',
    items: [
      {
        name: 'getContrast',
        signature: 'getContrast(foreground: ColorInput, background: ColorInput): number',
        description: 'Calculates WCAG contrast ratio between two colors.',
        params: [
          { name: 'foreground', type: 'ColorInput', description: 'Foreground color' },
          { name: 'background', type: 'ColorInput', description: 'Background color' },
        ],
        returns: { type: 'number', description: 'Contrast ratio (1-21)' },
        example: `getContrast('#ffffff', '#000000') // 21`,
      },
      {
        name: 'getReadableColor',
        signature: 'getReadableColor(background: ColorInput): ColorClass',
        description: 'Returns black or white whichever has better contrast.',
        params: [
          { name: 'background', type: 'ColorInput', description: 'Background color' },
        ],
        returns: { type: 'ColorClass', description: 'Black or white color' },
        example: `getReadableColor('#ff0000') // White`,
      },
    ],
  },
  {
    name: 'ColorPicker Class',
    id: 'colorpicker',
    description: 'Headless color picker class',
    items: [
      {
        name: 'constructor',
        signature: 'new ColorPicker(config?: ColorPickerConfig)',
        description: 'Creates a new ColorPicker instance.',
        params: [
          { name: 'config', type: 'ColorPickerConfig', description: 'Picker configuration' },
        ],
        returns: { type: 'ColorPicker', description: 'New ColorPicker instance' },
        example: `const picker = new ColorPicker({ value: '#ff0000' })`,
      },
      {
        name: 'getValue',
        signature: 'getValue(): ColorClass',
        description: 'Returns the current color value.',
        returns: { type: 'ColorClass', description: 'Current color' },
        example: `picker.getValue()`,
      },
      {
        name: 'setValue',
        signature: 'setValue(color: ColorInput): void',
        description: 'Sets the color value.',
        params: [
          { name: 'color', type: 'ColorInput', description: 'New color value' },
        ],
        returns: { type: 'void', description: 'None' },
        example: `picker.setValue('#00ff00')`,
      },
      {
        name: 'getInputProps',
        signature: 'getInputProps(): { value: string, onChange: (e: Event) => void }',
        description: 'Returns props for text input element.',
        returns: { type: 'object', description: 'Props object for input' },
        example: `<input {...picker.getInputProps()} />`,
      },
      {
        name: 'subscribe',
        signature: 'subscribe(callback: (color: ColorClass) => void): () => void',
        description: 'Subscribes to color changes.',
        params: [
          { name: 'callback', type: 'function', description: 'Callback function' },
        ],
        returns: { type: 'function', description: 'Unsubscribe function' },
        example: `const unsubscribe = picker.subscribe((color) => console.log(color))`,
      },
    ],
  },
]
