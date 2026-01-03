// ============ CORE - Minimal bundle < 4KB ============
// This entry point contains only the essential Color class and HEX parsing
// All advanced features (HSL, HSV, HWB, CMYK, manipulation, etc.) are available
// from the main 'colorkit' entry point or via sub-path exports

export { MinimalColor as Color, rgb, hex, parseMinimalHex as parseHex } from './core/minimal.js'

// Core types
export type { RgbColor, RgbaColor } from './types.js'
