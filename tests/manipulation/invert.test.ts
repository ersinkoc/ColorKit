import { describe, it, expect } from 'vitest'
import { grayscale, invert, complement } from '../../src/manipulation/invert'

describe('grayscale', () => {
  it('converts color to grayscale', () => {
    const result = grayscale('#ff0000')
    expect(result.red()).toBe(result.green())
    expect(result.green()).toBe(result.blue())
  })

  it('averages RGB values', () => {
    const result = grayscale({ r: 150, g: 100, b: 50 })
    const expected = (150 + 100 + 50) / 3
    expect(result.red()).toBe(expected)
  })

  it('preserves alpha', () => {
    const result = grayscale('rgba(255, 0, 0, 0.5)')
    expect(result.alpha()).toBe(0.5)
  })

  it('white stays white', () => {
    const result = grayscale('#ffffff')
    expect(result.toHex()).toBe('#ffffff')
  })

  it('black stays black', () => {
    const result = grayscale('#000000')
    expect(result.toHex()).toBe('#000000')
  })
})

describe('invert', () => {
  it('inverts red to cyan', () => {
    const result = invert('#ff0000')
    expect(result.red()).toBe(0)
    expect(result.green()).toBe(255)
    expect(result.blue()).toBe(255)
  })

  it('inverts black to white', () => {
    const result = invert('#000000')
    expect(result.toHex()).toBe('#ffffff')
  })

  it('inverts white to black', () => {
    const result = invert('#ffffff')
    expect(result.toHex()).toBe('#000000')
  })

  it('preserves alpha', () => {
    const result = invert('rgba(255, 0, 0, 0.5)')
    expect(result.alpha()).toBe(0.5)
  })

  it('double invert returns original', () => {
    const original = '#3366cc'
    const inverted = invert(original)
    const doubleInverted = invert(inverted)
    expect(doubleInverted.toHex()).toBe(original)
  })
})

describe('complement', () => {
  it('returns complementary color (180° rotation)', () => {
    const result = complement('#ff0000')
    expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('works with different colors', () => {
    const result = complement('#00ff00')
    expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
