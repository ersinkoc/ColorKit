// ============ CORE ============
export { ColorClass, ColorClass as Color, color } from './core/color.js'
export { rgb, hsl, hsv, hwb, hex, cmyk } from './core/factory.js'
export { isValidColor, parseColorTyped as parseColor } from './core/validate.js'

// ============ TYPES ============
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
  WcagLevel,
  TextSize,
  ColorPickerConfig,
  ColorPickerState,
  PickerEvent,
  BlendMode,
  PaletteOptions,
  RandomColorOptions,
  GradientStop,
  GradientOptions,
  Gradient,
  HarmonyOptions
} from './types.js'

// ============ CONVERSION ============
export {
  hexToRgb,
  rgbToHex,
  rgbToHex8
} from './conversion/hex.js'

export {
  rgbToHsl,
  hslToRgb
} from './conversion/hsl.js'

export {
  rgbToHsv,
  hsvToRgb,
  hsvToHsl,
  hslToHsv
} from './conversion/hsv.js'

export {
  rgbToHwb,
  hwbToRgb
} from './conversion/hwb.js'

export {
  rgbToCmyk,
  cmykToRgb
} from './conversion/cmyk.js'

export {
  NAMED_COLORS,
  getNamedColor,
  rgbToName,
  findClosestNamedColor,
  namedColors
} from './conversion/named.js'

// ============ MANIPULATION ============
export {
  lighten,
  darken
} from './manipulation/lighten.js'

export {
  saturate,
  desaturate
} from './manipulation/saturate.js'

export {
  brighten
} from './manipulation/brighten.js'

export {
  spin
} from './manipulation/spin.js'

export {
  grayscale,
  invert,
  complement
} from './manipulation/invert.js'

export {
  fade,
  fadeIn,
  fadeOut,
  opaque,
  transparent
} from './manipulation/alpha.js'

// ============ MIXING ============
export {
  mix
} from './mixing/mix.js'

export {
  tint,
  shade,
  tone
} from './mixing/tint.js'

export {
  blend
} from './mixing/blend.js'

// ============ HARMONY ============
export {
  getComplementary
} from './harmony/complementary.js'

export {
  getTriadic
} from './harmony/triadic.js'

export {
  getTetradic
} from './harmony/tetradic.js'

export {
  getAnalogous
} from './harmony/analogous.js'

export {
  getSplitComplementary
} from './harmony/split.js'

export {
  getMonochromatic
} from './harmony/monochromatic.js'

// ============ PALETTE ============
export {
  generatePalette
} from './palette/generate.js'

export {
  generateShades
} from './palette/shades.js'

export {
  generateTints
} from './palette/tints.js'

export {
  generateTones
} from './palette/tones.js'

export {
  generateScale
} from './palette/scale.js'

export {
  generateTailwindPalette
} from './palette/tailwind.js'

// ============ ACCESSIBILITY ============
export {
  getLuminance
} from './accessibility/luminance.js'

export {
  getContrast
} from './accessibility/contrast.js'

export {
  isReadable,
  getReadableColor,
  suggestForeground
} from './accessibility/readable.js'

// ============ PICKER ============
export {
  ColorPicker,
  createColorPicker
} from './picker/picker.js'

// ============ UTILITIES ============
export {
  randomColor,
  randomHex,
  randomPalette
} from './utils/random.js'

export {
  getNamedColor as getNamedColorUtil,
  findClosestNamedColor as findClosestNamedColorUtil,
  namedColors as namedColorsUtil
} from './utils/named.js'

export {
  createGradient,
  parseGradient
} from './utils/gradient.js'

export {
  colorDistance,
  deltaE
} from './utils/distance.js'

// ============ UTILS (clamp, round, lerp) ============
export {
  clamp,
  clamp01,
  clamp0255,
  clamp0100,
  clamp0360
} from './utils/clamp.js'

export {
  round,
  roundToByte,
  roundTo1
} from './utils/round.js'

export {
  lerp
} from './utils/lerp.js'
