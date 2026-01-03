# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-01-04

### Fixed

- Fixed TypeScript type errors in factory functions (`hsl`, `hsv`, `hwb`) by using proper `HslaColor`, `HsvaColor` types
- Fixed conversion function signatures to accept both base and alpha variants (`HslColor | HslaColor`, `HsvColor | HsvaColor`)
- Fixed GitHub Actions workflow to build library before website (workspace dependency resolution)

### Changed

- Website: Complete redesign of Home page with animated hero section and live demo
- Website: Added interactive Playground with tabs (Sliders, Harmonies, Contrast, Code)
- Website: Examples page now uses 2-column layout with interactive demos
- Website: Expanded Documentation with 12 comprehensive sections
- Website: Improved dark mode styling across all pages (better contrast and visibility)
- Website: Added JetBrains Mono font for code blocks
- Website: Enhanced color swatches with click-to-copy functionality
- CI: Added `src/**` and `package.json` to deploy workflow triggers

### Added

- Website: WCAG Contrast checker in Playground
- Website: Color harmonies visualization (Complementary, Triadic, Tetradic, Analogous)
- Website: Tailwind CSS palette generator demo
- Website: Gradient generation examples
- Website: Real-time color format conversion display

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

[Unreleased]: https://github.com/ersinkoc/colorkit/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/ersinkoc/colorkit/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ersinkoc/colorkit/releases/tag/v1.0.0
