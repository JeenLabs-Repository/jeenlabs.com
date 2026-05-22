import type { Theme } from '@/lib/theme'

export type GlitterThemePreset = {
  /** Tailwind background class for canvas wrapper */
  backgroundClass: string
  /** RGB tuples for WebGL dot colors */
  colors: number[][]
  /** Tailwind `from-*` class for edge fade overlays */
  fadeFromClass: string
}

/** Dot-matrix colors and fades per site theme */
export const GLITTER_THEME_PRESETS: Record<Theme, GlitterThemePreset> = {
  light: {
    backgroundClass: 'bg-[var(--bg)]',
    colors: [
      [8, 6, 13],
      [107, 99, 117],
    ],
    fadeFromClass: 'from-[var(--bg)]',
  },
  dark: {
    backgroundClass: 'bg-black',
    colors: [
      [255, 255, 255],
      [255, 255, 255],
    ],
    fadeFromClass: 'from-black',
  },
}

export function getGlitterPreset(theme: Theme): GlitterThemePreset {
  return GLITTER_THEME_PRESETS[theme]
}
