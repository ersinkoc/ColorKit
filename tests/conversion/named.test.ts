import { describe, it, expect } from 'vitest'
import { getNamedColor, rgbToName, findClosestNamedColor, NAMED_COLORS, namedColors } from '../../src/conversion/named.js'
import type { RgbaColor } from '../../src/types.js'

describe('getNamedColor', () => {
  it('should find basic colors', () => {
    expect(getNamedColor('red')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    expect(getNamedColor('green')).toEqual({ r: 0, g: 128, b: 0, a: 1 })
    expect(getNamedColor('blue')).toEqual({ r: 0, g: 0, b: 255, a: 1 })
  })

  it('should be case-insensitive', () => {
    expect(getNamedColor('RED')).toEqual(getNamedColor('red'))
    expect(getNamedColor('Red')).toEqual(getNamedColor('red'))
    expect(getNamedColor('ReD')).toEqual(getNamedColor('red'))
  })

  it('should find extended colors', () => {
    expect(getNamedColor('tomato')).toEqual({ r: 255, g: 99, b: 71, a: 1 })
    expect(getNamedColor('cornflowerblue')).toEqual({ r: 100, g: 149, b: 237, a: 1 })
  })

  it('should return null for unknown colors', () => {
    expect(getNamedColor('notacolor')).toBeNull()
    expect(getNamedColor('')).toBeNull()
  })

  it('should handle all named colors', () => {
    const color = getNamedColor('transparent')
    expect(color).toEqual({ r: 0, g: 0, b: 0, a: 0 })
  })
})

describe('rgbToName', () => {
  it('should find exact matches', () => {
    expect(rgbToName({ r: 255, g: 0, b: 0, a: 1 })).toBe('red')
    expect(rgbToName({ r: 0, g: 0, b: 255, a: 1 })).toBe('blue')
    expect(rgbToName({ r: 255, g: 255, b: 255, a: 1 })).toBe('white')
  })

  it('should return null for no match', () => {
    expect(rgbToName({ r: 1, g: 2, b: 3, a: 1 })).toBeNull()
    expect(rgbToName({ r: 100, g: 100, b: 100, a: 1 })).toBeNull()
  })

  it('should require exact match including alpha', () => {
    expect(rgbToName({ r: 255, g: 0, b: 0, a: 0.5 })).toBeNull()
  })
})

describe('findClosestNamedColor', () => {
  it('should find closest color', () => {
    expect(findClosestNamedColor({ r: 255, g: 0, b: 0, a: 1 })).toBe('red')
    expect(findClosestNamedColor({ r: 254, g: 0, b: 0, a: 1 })).toBe('red')
  })

  it('should find closest for similar colors', () => {
    // Close to red
    expect(findClosestNamedColor({ r: 250, g: 10, b: 10, a: 1 })).toBe('red')
  })

  it('should return null for invalid input', () => {
    expect(findClosestNamedColor(null as any)).toBeNull()
  })
})

describe('NAMED_COLORS', () => {
  it('should be a record of color names to hex values', () => {
    expect(typeof NAMED_COLORS).toBe('object')
    expect(NAMED_COLORS.red).toBe(0xff0000)
    expect(NAMED_COLORS.blue).toBe(0x0000ff)
  })

  it('should have all standard CSS colors', () => {
    expect(NAMED_COLORS.red).toBeDefined()
    expect(NAMED_COLORS.green).toBeDefined()
    expect(NAMED_COLORS.blue).toBeDefined()
    expect(NAMED_COLORS.white).toBeDefined()
    expect(NAMED_COLORS.black).toBeDefined()
  })
})

describe('namedColors', () => {
  it('should return an array of color names', () => {
    expect(Array.isArray(namedColors)).toBe(true)
    expect(namedColors.length).toBeGreaterThan(0)
    expect(namedColors).toContain('red')
    expect(namedColors).toContain('blue')
  })
})
