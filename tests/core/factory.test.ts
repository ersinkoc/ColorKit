import { describe, it, expect } from 'vitest'
import { color, rgb, hsl, hsv, hwb, hex, cmyk } from '../../src/core/factory'

describe('color factory', () => {
  it('creates color from hex string', () => {
    const c = color('#ff0000')
    expect(c.toHex()).toBe('#ff0000')
  })

  it('throws on invalid input', () => {
    expect(() => color('invalid')).toThrow()
  })

  it('creates color from RGB object', () => {
    const c = color({ r: 255, g: 0, b: 0 })
    expect(c.toHex()).toBe('#ff0000')
  })
})

describe('rgb factory', () => {
  it('creates color from RGB values', () => {
    const c = rgb(255, 0, 0)
    expect(c.red()).toBe(255)
    expect(c.green()).toBe(0)
    expect(c.blue()).toBe(0)
  })

  it('creates color with alpha', () => {
    const c = rgb(255, 0, 0, 0.5)
    expect(c.alpha()).toBe(0.5)
  })

  it('defaults alpha to 1', () => {
    const c = rgb(255, 0, 0)
    expect(c.alpha()).toBe(1)
  })
})

describe('hsl factory', () => {
  it('creates color from HSL values', () => {
    const c = hsl(0, 100, 50)
    expect(c.toHex()).toBe('#ff0000')
  })

  it('creates color with alpha', () => {
    const c = hsl(0, 100, 50, 0.5)
    expect(c.alpha()).toBe(0.5)
  })
})

describe('hsv factory', () => {
  it('creates color from HSV values', () => {
    const c = hsv(0, 100, 100)
    expect(c.toHex()).toBe('#ff0000')
  })

  it('creates color with alpha', () => {
    const c = hsv(0, 100, 100, 0.5)
    expect(c.alpha()).toBe(0.5)
  })
})

describe('hwb factory', () => {
  it('creates color from HWB values', () => {
    const c = hwb(0, 0, 0)
    expect(c.toHex()).toBe('#ff0000')
  })

  it('creates color with alpha', () => {
    const c = hwb(0, 0, 0, 0.5)
    expect(c.alpha()).toBe(0.5)
  })
})

describe('hex factory', () => {
  it('creates color from hex string', () => {
    const c = hex('#ff0000')
    expect(c.toHex()).toBe('#ff0000')
  })

  it('works without hash', () => {
    const c = hex('ff0000')
    expect(c.toHex()).toBe('#ff0000')
  })
})

describe('cmyk factory', () => {
  it('creates color from CMYK values', () => {
    const c = cmyk(0, 100, 100, 0)
    expect(c.toHex()).toBe('#ff0000')
  })

  it('creates cyan from CMYK', () => {
    const c = cmyk(100, 0, 0, 0)
    expect(c.toHex()).toBe('#00ffff')
  })
})
