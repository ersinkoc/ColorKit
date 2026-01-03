import { describe, it, expect } from 'vitest'
import { blend } from '../../src/mixing/blend.js'
import { ColorClass } from '../../src/core/color.js'

describe('blend', () => {
  it('should blend two colors with normal mode', () => {
    const top = new ColorClass(255, 0, 0, 0.5)
    const bottom = new ColorClass(0, 0, 255, 1)
    const result = blend(top, bottom, 'normal')

    expect(result).toBeInstanceOf(ColorClass)
  })

  it('should accept HEX strings', () => {
    const result = blend('#ff0000', '#0000ff', 'normal')
    expect(result).toBeInstanceOf(ColorClass)
  })

  it('should accept RGB objects', () => {
    const result = blend({ r: 255, g: 0, b: 0, a: 0.5 }, { r: 0, g: 0, b: 255, a: 1 }, 'normal')
    expect(result).toBeInstanceOf(ColorClass)
  })

  it('should handle multiply mode', () => {
    const top = new ColorClass(255, 0, 0, 0.5)
    const bottom = new ColorClass(0, 0, 255, 1)
    const result = blend(top, bottom, 'multiply')

    expect(result).toBeInstanceOf(ColorClass)
  })

  it('should handle screen mode', () => {
    const top = new ColorClass(255, 0, 0, 0.5)
    const bottom = new ColorClass(0, 0, 255, 1)
    const result = blend(top, bottom, 'screen')

    expect(result).toBeInstanceOf(ColorClass)
  })

  it('should handle overlay mode', () => {
    const top = new ColorClass(255, 0, 0, 0.5)
    const bottom = new ColorClass(0, 0, 255, 1)
    const result = blend(top, bottom, 'overlay')

    expect(result).toBeInstanceOf(ColorClass)
  })

  it('should return bottom when top alpha is 0', () => {
    const top = new ColorClass(255, 0, 0, 0)
    const bottom = new ColorClass(0, 0, 255, 1)
    const result = blend(top, bottom, 'normal')

    expect(result.toHex()).toBe(bottom.toHex())
  })

  it('should return top when top alpha is 1', () => {
    const top = new ColorClass(255, 0, 0, 1)
    const bottom = new ColorClass(0, 0, 255, 1)
    const result = blend(top, bottom, 'normal')

    expect(result.toHex()).toBe(top.toHex())
  })
})
