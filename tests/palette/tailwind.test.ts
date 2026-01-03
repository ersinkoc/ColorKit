import { describe, it, expect } from 'vitest'
import { generateTailwindPalette } from '../../src/palette/tailwind'

describe('generateTailwindPalette', () => {
  it('generates all standard Tailwind shades', () => {
    const palette = generateTailwindPalette('#3b82f6')
    expect(palette).toHaveProperty('50')
    expect(palette).toHaveProperty('100')
    expect(palette).toHaveProperty('200')
    expect(palette).toHaveProperty('300')
    expect(palette).toHaveProperty('400')
    expect(palette).toHaveProperty('500')
    expect(palette).toHaveProperty('600')
    expect(palette).toHaveProperty('700')
    expect(palette).toHaveProperty('800')
    expect(palette).toHaveProperty('900')
    expect(palette).toHaveProperty('950')
  })

  it('500 shade is the original color', () => {
    const palette = generateTailwindPalette('#3b82f6')
    expect(palette[500]).toBe('#3b82f6')
  })

  it('lighter shades are lighter (50-400)', () => {
    const palette = generateTailwindPalette('#3b82f6')
    // 50 should be lightest
    expect(palette[50]).toMatch(/^#[0-9a-f]{6}$/i)
    expect(palette[100]).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('darker shades are darker (600-950)', () => {
    const palette = generateTailwindPalette('#3b82f6')
    expect(palette[950]).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('works with different colors', () => {
    const palette = generateTailwindPalette('#ff0000')
    expect(palette[500]).toBe('#ff0000')
  })

  it('works with RGB object input', () => {
    const palette = generateTailwindPalette({ r: 59, g: 130, b: 246 })
    expect(palette).toHaveProperty('500')
  })
})
