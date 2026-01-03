import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/core-entry.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  target: 'es2020',
  // Bundle size analysis
  esbuildOptions(options) {
    options.mangleProps = /^_/
    options.reserveProps = /^(ref|key|children|style|className)$/
  },
})
