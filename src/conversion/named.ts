import type { RgbColor, RgbaColor } from '../types.js'

// Named colors map (hex values)
export const NAMED_COLORS: Record<string, number> = {
  // Basic colors
  black: 0x000000,
  white: 0xffffff,
  red: 0xff0000,
  green: 0x008000,
  blue: 0x0000ff,
  yellow: 0xffff00,
  cyan: 0x00ffff,
  magenta: 0xff00ff,

  // Gray scale
  silver: 0xc0c0c0,
  gray: 0x808080,
  grey: 0x808080,
  maroon: 0x800000,
  olive: 0x808000,
  purple: 0x800080,
  teal: 0x008080,
  navy: 0x000080,

  // Extended colors
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  blanchedalmond: 0xffebcd,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgrey: 0xa9a9a9,
  darkgreen: 0x006400,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  goldenrod: 0xdaa520,
  gold: 0xffd700,
  greenyellow: 0xadff2f,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavenderblush: 0xfff0f5,
  lavender: 0xe6e6fa,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgrey: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  oldlace: 0xfdf5e6,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  whitesmoke: 0xf5f5f5,
  yellowgreen: 0x9acd32,

  // Modern color
  rebeccapurple: 0x663399,

  // Special
  transparent: 0x00000000,
}

/**
 * Get named color as RGB
 * @param name - Color name (case-insensitive)
 */
export function getNamedColor(name: string): RgbaColor | null {
  const key = name.toLowerCase()
  const value = NAMED_COLORS[key]

  if (value === undefined) return null

  // Handle transparent (special case)
  if (key === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0 }
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
    a: 1
  }
}

/**
 * Convert RGB to named color (find exact match)
 * @param rgb - RGB color (must have alpha=1 for match)
 */
export function rgbToName(rgb: RgbColor | RgbaColor): string | null {
  // Check alpha - must be 1 (or 0.9995+ due to floating point)
  if ('a' in rgb && rgb.a !== 1 && rgb.a < 0.9995) {
    return null
  }

  const value = (rgb.r << 16) | (rgb.g << 8) | rgb.b

  for (const [name, hex] of Object.entries(NAMED_COLORS)) {
    if (name === 'transparent') continue
    if ((hex & 0xffffff) === value) {
      return name
    }
  }

  return null
}

/**
 * Find closest named color
 * @param rgb - RGB color
 */
export function findClosestNamedColor(rgb: RgbColor | RgbaColor | null): string | null {
  if (!rgb) return null

  const r1 = rgb.r
  const g1 = rgb.g
  const b1 = rgb.b

  let minDistance = Infinity
  let closest: string | null = null

  for (const [name, hex] of Object.entries(NAMED_COLORS)) {
    if (name === 'transparent') continue

    const r2 = (hex >> 16) & 255
    const g2 = (hex >> 8) & 255
    const b2 = hex & 255

    // Euclidean distance
    const distance = Math.sqrt(
      Math.pow(r1 - r2, 2) +
      Math.pow(g1 - g2, 2) +
      Math.pow(b1 - b2, 2)
    )

    if (distance < minDistance) {
      minDistance = distance
      closest = name
    }
  }

  return closest
}

/**
 * Export named colors as array of color names
 */
export const namedColors: string[] = Object.keys(NAMED_COLORS).filter(name => name !== 'transparent')
