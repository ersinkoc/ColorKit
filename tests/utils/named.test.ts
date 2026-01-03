import { describe, it, expect } from 'vitest'
import { getNamedColor, findClosestNamedColor, namedColors } from '../../src/utils/named'

describe('getNamedColor', () => {
  it('returns ColorClass for valid named color', () => {
    const c = getNamedColor('red')
    expect(c).not.toBeNull()
    expect(c!.toHex()).toBe('#ff0000')
  })

  it('returns null for invalid named color', () => {
    const c = getNamedColor('notacolor')
    expect(c).toBeNull()
  })

  it('is case insensitive', () => {
    const c = getNamedColor('Blue')
    expect(c).not.toBeNull()
    expect(c!.toHex()).toBe('#0000ff')
  })
})

describe('findClosestNamedColor', () => {
  it('finds closest named color for exact match', () => {
    const name = findClosestNamedColor('#ff0000')
    expect(name).toBe('red')
  })

  it('finds closest named color for similar color', () => {
    const name = findClosestNamedColor('#ff0001')
    expect(name).toBe('red')
  })

  it('returns null for invalid input', () => {
    const name = findClosestNamedColor('invalid')
    expect(name).toBeNull()
  })
})

describe('namedColors', () => {
  it('is an array of color names', () => {
    expect(Array.isArray(namedColors)).toBe(true)
    expect(namedColors.length).toBeGreaterThan(0)
  })

  it('contains common color names', () => {
    expect(namedColors).toContain('red')
    expect(namedColors).toContain('blue')
    expect(namedColors).toContain('green')
  })
})
