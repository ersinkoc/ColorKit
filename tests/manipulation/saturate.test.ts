import { describe, it, expect } from 'vitest'
import { saturate, desaturate } from '../../src/manipulation/saturate.js'
import { ColorClass } from '../../src/core/color.js'

describe('saturate', () => {
  it('should increase saturation', () => {
    const color = new ColorClass(150, 100, 100)
    const saturated = saturate(color, 20)
    const hsl = saturated.toHsl()
    const originalHsl = color.toHsl()
    expect(hsl.s).toBeGreaterThan(originalHsl.s)
  })

  it('should accept HEX string', () => {
    const saturated = saturate('#999999', 20)
    expect(saturated).toBeInstanceOf(ColorClass)
  })

  it('should clamp to max saturation', () => {
    const color = new ColorClass(255, 0, 0)
    const saturated = saturate(color, 50)
    expect(saturated.toHsl().s).toBeLessThanOrEqual(100)
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(150, 100, 100, 0.5)
    const saturated = saturate(color, 20)
    expect(saturated.alpha()).toBe(0.5)
  })

  it('should return new color instance', () => {
    const original = new ColorClass(150, 100, 100)
    const saturated = saturate(original, 20)
    expect(saturated).not.toBe(original)
  })
})

describe('desaturate', () => {
  it('should decrease saturation', () => {
    const color = new ColorClass(200, 100, 100)
    const desaturated = desaturate(color, 20)
    const hsl = desaturated.toHsl()
    const originalHsl = color.toHsl()
    expect(hsl.s).toBeLessThan(originalHsl.s)
  })

  it('should clamp to min saturation', () => {
    const color = new ColorClass(150, 150, 150)
    const desaturated = desaturate(color, 50)
    expect(desaturated.toHsl().s).toBeGreaterThanOrEqual(0)
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(200, 100, 100, 0.5)
    const desaturated = desaturate(color, 20)
    expect(desaturated.alpha()).toBe(0.5)
  })

  it('should return new color instance', () => {
    const original = new ColorClass(200, 100, 100)
    const desaturated = desaturate(original, 20)
    expect(desaturated).not.toBe(original)
  })
})
