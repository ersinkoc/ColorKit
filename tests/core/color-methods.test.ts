import { describe, it, expect } from 'vitest'
import { ColorClass, color } from '../../src/core/color'

describe('ColorClass format methods', () => {
  const red = new ColorClass(255, 0, 0)
  const halfRed = new ColorClass(255, 0, 0, 0.5)

  describe('toHexString', () => {
    it('returns hex string', () => {
      expect(red.toHexString()).toBe('#ff0000')
    })
  })

  describe('toHex8String', () => {
    it('returns hex8 string', () => {
      expect(red.toHex8String()).toMatch(/^#[0-9a-f]{6,8}$/i)
    })
  })

  describe('toRgbaString', () => {
    it('returns rgba string', () => {
      expect(halfRed.toRgbaString()).toBe('rgba(255, 0, 0, 0.5)')
    })
  })

  describe('toPercentageRgb', () => {
    it('returns percentage RGB', () => {
      const result = red.toPercentageRgb()
      expect(result.r).toBe(100)
      expect(result.g).toBe(0)
      expect(result.b).toBe(0)
    })
  })

  describe('toPercentageRgbString', () => {
    it('returns percentage string for opaque', () => {
      expect(red.toPercentageRgbString()).toMatch(/rgb\(\d+%/)
    })

    it('returns rgba for transparent', () => {
      expect(halfRed.toPercentageRgbString()).toMatch(/rgba\(\d+%/)
    })
  })

  describe('toHslaString', () => {
    it('returns hsla string', () => {
      expect(red.toHslaString()).toMatch(/hsla\(/)
    })
  })

  describe('toHsvString', () => {
    it('returns hsv string', () => {
      expect(red.toHsvString()).toMatch(/hsv\(/)
    })
  })

  describe('toHwbString', () => {
    it('returns hwb string', () => {
      expect(red.toHwbString()).toMatch(/hwb\(/)
    })
  })

  describe('toCmykString', () => {
    it('returns cmyk string', () => {
      expect(red.toCmykString()).toMatch(/cmyk\(/)
    })
  })

  describe('toString', () => {
    it('returns hex by default', () => {
      expect(red.toString()).toBe('#ff0000')
    })

    it('returns hex for hex format', () => {
      expect(red.toString('hex')).toBe('#ff0000')
    })

    it('returns hex8 for hex8 format', () => {
      expect(red.toString('hex8')).toMatch(/#[0-9a-f]{6,8}/i)
    })

    it('returns rgb for rgb format', () => {
      expect(red.toString('rgb')).toMatch(/rgb\(/)
    })

    it('returns rgba for rgba format', () => {
      expect(red.toString('rgba')).toMatch(/rgba\(/)
    })

    it('returns hsl for hsl format', () => {
      expect(red.toString('hsl')).toMatch(/hsl\(/)
    })

    it('returns hsla for hsla format', () => {
      expect(red.toString('hsla')).toMatch(/hsla\(/)
    })

    it('returns hsv for hsv format', () => {
      expect(red.toString('hsv')).toMatch(/hsv\(/)
    })

    it('returns hsva for hsva format', () => {
      expect(red.toString('hsva')).toMatch(/hsva\(/)
    })

    it('returns hwb for hwb format', () => {
      expect(red.toString('hwb')).toMatch(/hwb\(/)
    })

    it('returns cmyk for cmyk format', () => {
      expect(red.toString('cmyk')).toMatch(/cmyk\(/)
    })

    it('returns name for name format', () => {
      expect(red.toString('name')).toBe('red')
    })

    it('returns hex for unknown name', () => {
      const c = new ColorClass(128, 64, 32)
      expect(c.toString('name')).toMatch(/#[0-9a-f]{6}/i)
    })

    it('returns hex for unknown format', () => {
      expect(red.toString('unknown' as any)).toBe('#ff0000')
    })
  })

  describe('toJSON', () => {
    it('returns RGB object', () => {
      expect(red.toJSON()).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    })
  })
})

describe('ColorClass component getters', () => {
  const c = new ColorClass(255, 128, 64, 0.5)

  it('hue returns HSL hue', () => {
    expect(typeof c.hue()).toBe('number')
  })

  it('saturation returns HSL saturation', () => {
    expect(typeof c.saturation()).toBe('number')
  })

  it('lightness returns HSL lightness', () => {
    expect(typeof c.lightness()).toBe('number')
  })

  it('saturationv returns HSV saturation', () => {
    expect(typeof c.saturationv()).toBe('number')
  })

  it('brightness returns HSV value', () => {
    expect(typeof c.brightness()).toBe('number')
  })

  it('whiteness returns HWB whiteness', () => {
    expect(typeof c.whiteness()).toBe('number')
  })

  it('blackness returns HWB blackness', () => {
    expect(typeof c.blackness()).toBe('number')
  })
})

describe('ColorClass setters', () => {
  const red = new ColorClass(255, 0, 0)

  it('setRed returns new color', () => {
    const result = red.setRed(128)
    expect(result.red()).toBe(128)
  })

  it('setGreen returns new color', () => {
    const result = red.setGreen(128)
    expect(result.green()).toBe(128)
  })

  it('setBlue returns new color', () => {
    const result = red.setBlue(128)
    expect(result.blue()).toBe(128)
  })

  it('setHue returns new color', () => {
    const result = red.setHue(120)
    expect(result.toHex()).not.toBe('#ff0000')
  })

  it('setSaturation returns new color', () => {
    const result = red.setSaturation(50)
    expect(result.saturation()).toBeCloseTo(50, 0)
  })

  it('setLightness returns new color', () => {
    const result = red.setLightness(75)
    expect(result.lightness()).toBeCloseTo(75, 0)
  })

  it('setBrightness returns new color', () => {
    const result = red.setBrightness(50)
    expect(result.brightness()).toBeCloseTo(50, 0)
  })
})

describe('ColorClass manipulation methods', () => {
  const red = new ColorClass(255, 0, 0)

  it('brighten returns brighter color', () => {
    const result = red.brighten(20)
    expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('grayscale returns gray color', () => {
    const result = red.grayscale()
    expect(result.red()).toBe(result.green())
  })

  it('invert returns inverted color', () => {
    const result = red.invert()
    expect(result.red()).toBe(0)
    expect(result.green()).toBe(255)
  })

  it('complement returns complementary color', () => {
    const result = red.complement()
    expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

describe('ColorClass alpha methods', () => {
  const red = new ColorClass(255, 0, 0)

  it('fade sets alpha', () => {
    const result = red.fade(0.5)
    expect(result.alpha()).toBe(0.5)
  })

  it('fadeIn increases alpha', () => {
    const c = new ColorClass(255, 0, 0, 0.5)
    const result = c.fadeIn(0.2)
    expect(result.alpha()).toBeCloseTo(0.7)
  })

  it('fadeOut decreases alpha', () => {
    const c = new ColorClass(255, 0, 0, 0.5)
    const result = c.fadeOut(0.2)
    expect(result.alpha()).toBeCloseTo(0.3)
  })

  it('opaque sets alpha to 1', () => {
    const c = new ColorClass(255, 0, 0, 0.5)
    expect(c.opaque().alpha()).toBe(1)
  })

  it('transparent sets alpha to 0', () => {
    expect(red.transparent().alpha()).toBe(0)
  })
})

describe('ColorClass mixing methods', () => {
  const red = new ColorClass(255, 0, 0)

  it('tone mixes with gray', () => {
    const result = red.tone(50)
    expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

describe('ColorClass query methods', () => {
  it('isLight returns true for light colors', () => {
    const white = new ColorClass(255, 255, 255)
    expect(white.isLight()).toBe(true)
  })

  it('isDark returns true for dark colors', () => {
    const black = new ColorClass(0, 0, 0)
    expect(black.isDark()).toBe(true)
  })

  it('isValid always returns true', () => {
    const c = new ColorClass(255, 0, 0)
    expect(c.isValid()).toBe(true)
  })
})

describe('ColorClass accessibility methods', () => {
  const black = new ColorClass(0, 0, 0)
  const white = new ColorClass(255, 255, 255)

  it('contrast returns contrast ratio', () => {
    expect(black.contrast(white)).toBeGreaterThan(1)
  })

  it('isReadable checks readability', () => {
    expect(black.isReadable(white)).toBe(true)
    expect(black.isReadable(white, 'AAA', 'large')).toBe(true)
  })
})

describe('ColorClass equals method', () => {
  it('returns true for same color', () => {
    const c1 = new ColorClass(255, 0, 0)
    const c2 = new ColorClass(255, 0, 0)
    expect(c1.equals(c2)).toBe(true)
  })

  it('returns false for different colors', () => {
    const c1 = new ColorClass(255, 0, 0)
    const c2 = new ColorClass(0, 255, 0)
    expect(c1.equals(c2)).toBe(false)
  })

  it('returns false for invalid input', () => {
    const c = new ColorClass(255, 0, 0)
    expect(c.equals('invalid')).toBe(false)
  })
})

describe('color factory function', () => {
  it('creates color from RGB numbers', () => {
    const c = color(255, 0, 0)
    expect(c!.toHex()).toBe('#ff0000')
  })

  it('creates color with alpha', () => {
    const c = color(255, 0, 0, 0.5)
    expect(c!.alpha()).toBe(0.5)
  })

  it('parses color from string', () => {
    const c = color('#ff0000')
    expect(c!.toHex()).toBe('#ff0000')
  })

  it('returns null for invalid input', () => {
    const c = color('invalid')
    expect(c).toBeNull()
  })
})
