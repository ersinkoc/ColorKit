import { describe, it, expect } from 'vitest'
import { getContrast } from '../../src/accessibility/contrast.js'
import { ColorClass } from '../../src/core/color.js'

describe('getContrast', () => {
  it('should return 21 for black on white', () => {
    const black = new ColorClass(0, 0, 0)
    const white = new ColorClass(255, 255, 255)
    expect(getContrast(black, white)).toBeCloseTo(21, 0)
  })

  it('should return 21 for white on black', () => {
    const white = new ColorClass(255, 255, 255)
    const black = new ColorClass(0, 0, 0)
    expect(getContrast(white, black)).toBeCloseTo(21, 0)
  })

  it('should return 1 for same colors', () => {
    const color = new ColorClass(128, 128, 128)
    expect(getContrast(color, color)).toBe(1)
  })

  it('should accept HEX strings', () => {
    expect(getContrast('#000000', '#ffffff')).toBeCloseTo(21, 0)
  })

  it('should accept RGB objects', () => {
    expect(getContrast({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).toBeCloseTo(21, 0)
  })

  it('should calculate red on white', () => {
    const red = new ColorClass(255, 0, 0)
    const white = new ColorClass(255, 255, 255)
    expect(getContrast(red, white)).toBeCloseTo(4, 0)
  })

  it('should calculate blue on white', () => {
    const blue = new ColorClass(0, 0, 255)
    const white = new ColorClass(255, 255, 255)
    expect(getContrast(blue, white)).toBeCloseTo(8.6, 0)
  })

  it('should be symmetric', () => {
    const color1 = new ColorClass(100, 100, 100)
    const color2 = new ColorClass(200, 200, 200)
    const contrast1 = getContrast(color1, color2)
    const contrast2 = getContrast(color2, color1)
    expect(contrast1).toBeCloseTo(contrast2, 4)
  })
})
