// Export Color class
export { ColorClass, ColorClass as Color, color } from './color.js'

// Export factory functions
export { rgb, hsl, hsv, hwb, hex, cmyk } from './factory.js'

// Export parse function
export { parseColor } from './parse.js'

// Export validation
export { isValidColor } from './validate.js'

// Re-export types
export type { ColorInput, ColorFormat } from '../types.js'
