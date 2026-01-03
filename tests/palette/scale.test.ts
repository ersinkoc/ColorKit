import { describe, it, expect } from 'vitest'
import { generateScale } from '../../src/palette/scale'

describe('generateScale', () => {
  it('generates correct number of colors', () => {
    const scale = generateScale('#ff0000', '#0000ff', 5)
    expect(scale).toHaveLength(5)
  })

  it('first color is start color', () => {
    const scale = generateScale('#ff0000', '#0000ff', 5)
    expect(scale[0]!.toHex()).toBe('#ff0000')
  })

  it('last color is end color', () => {
    const scale = generateScale('#ff0000', '#0000ff', 5)
    expect(scale[4]!.toHex()).toBe('#0000ff')
  })

  it('returns single color for count < 2', () => {
    const scale = generateScale('#ff0000', '#0000ff', 1)
    expect(scale).toHaveLength(1)
    expect(scale[0]!.toHex()).toBe('#ff0000')
  })

  it('generates intermediate colors', () => {
    const scale = generateScale('#000000', '#ffffff', 3)
    expect(scale).toHaveLength(3)
    // All colors should be valid
    expect(scale[0]!.toHex()).toBe('#000000')
    expect(scale[2]!.toHex()).toBe('#ffffff')
  })

  it('works with RGB object input', () => {
    const scale = generateScale({ r: 255, g: 0, b: 0 }, { r: 0, g: 0, b: 255 }, 3)
    expect(scale).toHaveLength(3)
  })
})
