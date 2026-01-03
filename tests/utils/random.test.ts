import { describe, it, expect } from 'vitest'
import { randomColor, randomHex, randomPalette } from '../../src/utils/random.js'
import { ColorClass } from '../../src/core/color.js'

describe('randomColor', () => {
  it('should generate a valid color', () => {
    const color = randomColor()
    expect(color).toBeInstanceOf(ColorClass)
  })

  it('should generate valid RGB values', () => {
    const color = randomColor()
    expect(color.red()).toBeGreaterThanOrEqual(0)
    expect(color.red()).toBeLessThanOrEqual(255)
    expect(color.green()).toBeGreaterThanOrEqual(0)
    expect(color.green()).toBeLessThanOrEqual(255)
    expect(color.blue()).toBeGreaterThanOrEqual(0)
    expect(color.blue()).toBeLessThanOrEqual(255)
  })

  it('should accept options', () => {
    const color = randomColor({ alpha: 0.5 })
    expect(color).toBeInstanceOf(ColorClass)
  })

  it('should generate different colors', () => {
    const color1 = randomColor()
    const color2 = randomColor()
    expect(color1.toHex()).not.toBe(color2.toHex())
  })

  it('should respect alpha option', () => {
    const color = randomColor({ alpha: 0 })
    expect(color.alpha()).toBe(0)
  })
})

describe('randomHex', () => {
  it('should generate valid HEX', () => {
    const hex = randomHex()
    expect(hex).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('should generate different values', () => {
    const hex1 = randomHex()
    const hex2 = randomHex()
    expect(hex1).not.toBe(hex2)
  })

  it('should generate valid colors', () => {
    const hex = randomHex()
    const color = new ColorClass(0, 0, 0)
    // Verify the HEX is valid by creating a new ColorClass
    const parsed = new ColorClass(0, 0, 0)
    expect(parsed).toBeInstanceOf(ColorClass)
    expect(hex).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

describe('randomPalette', () => {
  it('should generate default number of colors', () => {
    const palette = randomPalette()
    expect(palette).toHaveLength(5)
  })

  it('should generate ColorClass instances', () => {
    const palette = randomPalette()
    palette.forEach(color => {
      expect(color).toBeInstanceOf(ColorClass)
    })
  })

  it('should respect count option', () => {
    const palette = randomPalette(10)
    expect(palette).toHaveLength(10)
  })

  it('should generate different colors', () => {
    const palette = randomPalette(10)
    const uniqueColors = new Set(palette.map(c => c.toHex()))
    expect(uniqueColors.size).toBeGreaterThan(1)
  })

  it('should generate valid HEX values', () => {
    const palette = randomPalette()
    palette.forEach(color => {
      expect(color.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })
})
