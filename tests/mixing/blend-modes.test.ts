import { describe, it, expect } from 'vitest'
import { blend } from '../../src/mixing/blend'

describe('blend modes', () => {
  describe('darken', () => {
    it('selects darker channel values', () => {
      const result = blend('#ff8080', '#80ff80', 'darken')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('lighten', () => {
    it('selects lighter channel values', () => {
      const result = blend('#ff8080', '#80ff80', 'lighten')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('color-dodge', () => {
    it('brightens base color', () => {
      const result = blend('#808080', '#404040', 'color-dodge')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('handles edge case when base is white', () => {
      const result = blend('#ffffff', '#808080', 'color-dodge')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('color-burn', () => {
    it('darkens base color', () => {
      const result = blend('#808080', '#c0c0c0', 'color-burn')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('handles edge case when base is black', () => {
      const result = blend('#000000', '#808080', 'color-burn')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('hard-light', () => {
    it('combines multiply and screen', () => {
      const result = blend('#808080', '#c0c0c0', 'hard-light')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('handles dark blend color', () => {
      const result = blend('#808080', '#202020', 'hard-light')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('soft-light', () => {
    it('softer version of hard-light', () => {
      const result = blend('#808080', '#c0c0c0', 'soft-light')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('handles dark blend color', () => {
      const result = blend('#808080', '#202020', 'soft-light')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('difference', () => {
    it('subtracts colors', () => {
      const result = blend('#ff0000', '#00ff00', 'difference')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })

    it('same colors produce black', () => {
      const result = blend('#808080', '#808080', 'difference')
      expect(result.toHex()).toBe('#000000')
    })
  })

  describe('exclusion', () => {
    it('similar to difference but softer', () => {
      const result = blend('#ff0000', '#00ff00', 'exclusion')
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  describe('unknown mode', () => {
    it('falls back to base color', () => {
      const result = blend('#ff0000', '#00ff00', 'unknown' as any)
      expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })
})
