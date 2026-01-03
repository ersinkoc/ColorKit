import { describe, it, expect } from 'vitest'
import { ColorClass } from '../../src/core/color.js'
import type { RgbaColor, HslaColor, HsvaColor, HwbColor } from '../../src/types.js'

describe('ColorClass', () => {
  describe('constructor', () => {
    it('should create a color from RGB values', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.red()).toBe(255)
      expect(color.green()).toBe(0)
      expect(color.blue()).toBe(0)
    })

    it('should clamp RGB values to 0-255', () => {
      const color = new ColorClass(300, -10, 128)
      expect(color.red()).toBe(255)
      expect(color.green()).toBe(0)
      expect(color.blue()).toBe(128)
    })

    it('should handle alpha channel', () => {
      const color = new ColorClass(255, 0, 0, 0.5)
      expect(color.alpha()).toBe(0.5)
    })

    it('should clamp alpha to 0-1', () => {
      const color1 = new ColorClass(255, 0, 0, 2)
      expect(color1.alpha()).toBe(1)

      const color2 = new ColorClass(255, 0, 0, -0.5)
      expect(color2.alpha()).toBe(0)
    })

    it('should default alpha to 1', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.alpha()).toBe(1)
    })
  })

  describe('getters', () => {
    it('should return red value', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.red()).toBe(255)
    })

    it('should return green value', () => {
      const color = new ColorClass(0, 255, 0)
      expect(color.green()).toBe(255)
    })

    it('should return blue value', () => {
      const color = new ColorClass(0, 0, 255)
      expect(color.blue()).toBe(255)
    })

    it('should return alpha value', () => {
      const color = new ColorClass(255, 0, 0, 0.5)
      expect(color.alpha()).toBe(0.5)
    })
  })

  describe('HEX conversion', () => {
    it('should convert to 6-digit HEX', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.toHex()).toBe('#ff0000')
    })

    it('should convert to 8-digit HEX with alpha', () => {
      const color = new ColorClass(255, 0, 0, 0.5)
      expect(color.toHex8()).toBe('#ff000080')
    })
  })

  describe('RGB conversion', () => {
    it('should convert to RGB object', () => {
      const color = new ColorClass(255, 0, 0, 0.5)
      const rgb = color.toRgb()
      expect(rgb).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
    })

    it('should convert to RGB string', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.toRgbString()).toBe('rgb(255, 0, 0)')
    })

    it('should convert to RGBA string', () => {
      const color = new ColorClass(255, 0, 0, 0.5)
      expect(color.toRgbString()).toBe('rgba(255, 0, 0, 0.5)')
    })
  })

  describe('HSL conversion', () => {
    it('should convert to HSL object', () => {
      const color = new ColorClass(255, 0, 0)
      const hsl = color.toHsl()
      expect(hsl.h).toBe(0)
      expect(hsl.s).toBe(100)
      expect(hsl.l).toBe(50)
    })

    it('should convert to HSL string', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.toHslString()).toBe('hsl(0, 100%, 50%)')
    })
  })

  describe('HSV conversion', () => {
    it('should convert to HSV object', () => {
      const color = new ColorClass(255, 0, 0)
      const hsv = color.toHsv()
      expect(hsv.h).toBe(0)
      expect(hsv.s).toBe(100)
      expect(hsv.v).toBe(100)
    })

    it('should convert to HSV string', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.toHsvString()).toBe('hsv(0, 100%, 100%)')
    })
  })

  describe('HWB conversion', () => {
    it('should convert to HWB object', () => {
      const color = new ColorClass(255, 0, 0)
      const hwb = color.toHwb()
      expect(hwb.h).toBe(0)
    })
  })

  describe('CMYK conversion', () => {
    it('should convert to CMYK object', () => {
      const color = new ColorClass(255, 0, 0)
      const cmyk = color.toCmyk()
      expect(cmyk.c).toBe(0)
      expect(cmyk.m).toBe(100)
    })
  })

  describe('luminance', () => {
    it('should calculate luminance', () => {
      const white = new ColorClass(255, 255, 255)
      expect(white.luminance()).toBeCloseTo(1, 4)

      const black = new ColorClass(0, 0, 0)
      expect(black.luminance()).toBe(0)
    })
  })

  describe('manipulation', () => {
    it('should lighten the color', () => {
      const color = new ColorClass(100, 100, 100)
      const lighter = color.lighten(10)
      expect(lighter.toHex()).not.toBe(color.toHex())
    })

    it('should darken the color', () => {
      const color = new ColorClass(100, 100, 100)
      const darker = color.darken(10)
      expect(darker.toHex()).not.toBe(color.toHex())
    })

    it('should saturate the color', () => {
      const color = new ColorClass(100, 100, 100)
      const saturated = color.saturate(10)
      expect(saturated.toHex()).not.toBe(color.toHex())
    })

    it('should desaturate the color', () => {
      const color = new ColorClass(255, 0, 0)
      const desaturated = color.desaturate(10)
      expect(desaturated.toHex()).not.toBe(color.toHex())
    })

    it('should spin the hue', () => {
      const color = new ColorClass(255, 0, 0)
      const spun = color.spin(90)
      expect(spun.toHsl().h).toBe(90)
    })
  })

  describe('utility methods', () => {
    it('should clone the color', () => {
      const original = new ColorClass(255, 0, 0, 0.5)
      const clone = original.clone()
      expect(clone.toHex()).toBe(original.toHex())
      expect(clone.alpha()).toBe(original.alpha())
      expect(clone).not.toBe(original)
    })

    it('should convert to string', () => {
      const color = new ColorClass(255, 0, 0)
      expect(color.toString()).toBe('#ff0000')
    })

    it('should return JSON representation', () => {
      const color = new ColorClass(255, 0, 0, 0.5)
      const json = color.toJSON()
      expect(json).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
    })
  })

  describe('immutability', () => {
    it('should not mutate original on lighten', () => {
      const original = new ColorClass(100, 100, 100)
      const originalHex = original.toHex()
      original.lighten(10)
      expect(original.toHex()).toBe(originalHex)
    })

    it('should not mutate original on darken', () => {
      const original = new ColorClass(100, 100, 100)
      const originalHex = original.toHex()
      original.darken(10)
      expect(original.toHex()).toBe(originalHex)
    })
  })
})
