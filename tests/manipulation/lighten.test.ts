import { describe, it, expect } from 'vitest'
import { lighten, darken } from '../../src/manipulation/lighten.js'
import { ColorClass } from '../../src/core/color.js'

describe('lighten', () => {
  it('should lighten a color', () => {
    const color = new ColorClass(100, 100, 100)
    const originalL = color.toHsl().l
    const lightened = lighten(color, 10)
    expect(lightened.toHsl().l).toBeGreaterThan(originalL)
  })

  it('should accept HEX string', () => {
    const lightened = lighten('#808080', 10)
    expect(lightened).toBeInstanceOf(ColorClass)
  })

  it('should accept RGB object', () => {
    const lightened = lighten({ r: 128, g: 128, b: 128 }, 10)
    expect(lightened).toBeInstanceOf(ColorClass)
  })

  it('should default to 10%', () => {
    const color = new ColorClass(128, 128, 128)
    const originalL = color.toHsl().l
    const lightened = lighten(color)
    expect(lightened.toHsl().l).toBeGreaterThan(originalL)
  })

  it('should clamp to max lightness', () => {
    const color = new ColorClass(255, 255, 255)
    const lightened = lighten(color, 50)
    expect(lightened.toHsl().l).toBeLessThanOrEqual(100)
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(128, 128, 128, 0.5)
    const lightened = lighten(color, 10)
    expect(lightened.alpha()).toBe(0.5)
  })

  it('should return new color instance', () => {
    const original = new ColorClass(128, 128, 128)
    const lightened = lighten(original, 10)
    expect(lightened).not.toBe(original)
  })
})

describe('darken', () => {
  it('should darken a color', () => {
    const color = new ColorClass(150, 150, 150)
    const darkened = darken(color, 10)
    const hsl = darkened.toHsl()
    expect(hsl.l).toBeLessThan(60)
  })

  it('should accept HEX string', () => {
    const darkened = darken('#999999', 10)
    expect(darkened).toBeInstanceOf(ColorClass)
  })

  it('should clamp to min lightness', () => {
    const color = new ColorClass(0, 0, 0)
    const darkened = darken(color, 50)
    expect(darkened.toHsl().l).toBeGreaterThanOrEqual(0)
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(150, 150, 150, 0.5)
    const darkened = darken(color, 10)
    expect(darkened.alpha()).toBe(0.5)
  })

  it('should return new color instance', () => {
    const original = new ColorClass(150, 150, 150)
    const darkened = darken(original, 10)
    expect(darkened).not.toBe(original)
  })
})
