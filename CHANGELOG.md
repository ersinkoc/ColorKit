# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Website: Improved CodeBlock component with Mac-style header, theme selector, and copy button
- Website: Fixed code alignment issue in CodeBlock (left-aligned instead of centered)
- Website: Added gradient animated titles to all pages
- Website: Added sidebar navigation to Documentation page with scroll tracking
- Website: Added footer with creator credit (Ersin KOC) and GitHub link
- CI: Fixed GitHub Actions deploy workflow (removed npm cache requirement)

## [1.0.0] - 2026-01-03

### Added

- Core `Color` class with immutable color representation
- Color parsing from multiple formats (HEX, RGB, HSL, HSV, HWB, CMYK, named colors)
- Format conversion methods (`toHex`, `toRgb`, `toHsl`, `toHsv`, `toHwb`, `toCmyk`, `toName`)
- Color manipulation functions (`lighten`, `darken`, `saturate`, `desaturate`, `spin`, `invert`, `alpha`)
- Color mixing utilities (`mix`, `tint`, `shade`, `blend`)
- Color harmony generators (`complementary`, `analogous`, `triadic`, `tetradic`, `splitComplementary`, `monochromatic`)
- Palette generation (`shades`, `tints`, `tones`, `scale`, `tailwindPalette`)
- Accessibility utilities (`luminance`, `contrast`, `isReadable`, `mostReadable`)
- Headless color picker (`createPicker`) with position helpers
- Full TypeScript support with strict mode
- Tree-shakeable ESM exports
- Zero runtime dependencies

[Unreleased]: https://github.com/ersinkoc/colorkit/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ersinkoc/colorkit/releases/tag/v1.0.0
