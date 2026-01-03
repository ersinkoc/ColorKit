import { describe, it, expect } from 'vitest'
import { mix } from '../../src/mixing/mix.js'
import { ColorClass } from '../../src/core/color.js'

describe('mix', () => {
  it('should mix two colors equally', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(0, 0, 255)
    const mixed = mix(color1, color2, 0.5)

    expect(mixed.red()).toBe(128)
    expect(mixed.green()).toBe(0)
    expect(mixed.blue()).toBe(128)
  })

  it('should favor first color at weight 0', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(0, 0, 255)
    const mixed = mix(color1, color2, 0)

    expect(mixed.toHex()).toBe(color1.toHex())
  })

  it('should favor second color at weight 1', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(0, 0, 255)
    const mixed = mix(color1, color2, 1)

    expect(mixed.toHex()).toBe(color2.toHex())
  })

  it('should handle HEX string inputs', () => {
    const mixed = mix('#ff0000', '#0000ff', 0.5)
    expect(mixed).toBeInstanceOf(ColorClass)
  })

  it('should handle RGB object inputs', () => {
    const mixed = mix({ r: 255, g: 0, b: 0 }, { r: 0, g: 0, b: 255 }, 0.5)
    expect(mixed).toBeInstanceOf(ColorClass)
  })

  it('should default to 0.5 weight', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(0, 0, 255)
    const mixed = mix(color1, color2)

    expect(mixed.red()).toBe(128)
  })

  it('should interpolate alpha', () => {
    const color1 = new ColorClass(255, 0, 0, 1)
    const color2 = new ColorClass(0, 0, 255, 0)
    const mixed = mix(color1, color2, 0.5)

    expect(mixed.alpha()).toBe(0.5)
  })

  it('should return new color instance', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(0, 0, 255)
    const mixed = mix(color1, color2, 0.5)

    expect(mixed).not.toBe(color1)
    expect(mixed).not.toBe(color2)
  })
})
