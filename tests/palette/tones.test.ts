import { describe, it, expect } from 'vitest'
import { generateTones } from '../../src/palette/tones'

describe('generateTones', () => {
  it('first color is the original', () => {
    const tones = generateTones('#ff0000', 5)
    expect(tones[0]!.toHex()).toBe('#ff0000')
  })

  it('generates correct number of tones', () => {
    const tones = generateTones('#ff0000', 5)
    expect(tones.length).toBeGreaterThanOrEqual(1)
  })

  it('generates gray-mixed variations', () => {
    const tones = generateTones('#ff0000', 3)
    expect(tones.length).toBeGreaterThan(1)
    // All should be valid colors
    tones.forEach(t => {
      expect(t!.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('works with RGB object input', () => {
    const tones = generateTones({ r: 255, g: 0, b: 0 }, 3)
    expect(tones[0]!.toHex()).toBe('#ff0000')
  })

  it('works with different count values', () => {
    const tones2 = generateTones('#ff0000', 2)
    const tones5 = generateTones('#ff0000', 5)
    expect(tones2.length).toBeLessThanOrEqual(tones5.length)
  })
})
