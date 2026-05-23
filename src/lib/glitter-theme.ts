import type { Theme } from '@/lib/theme'

export type GlitterThemePreset = {
  /** Tailwind background class for canvas wrapper */
  backgroundClass: string
  /** RGB tuples for WebGL dot colors */
  colors: number[][]
  /** Tailwind `from-*` class for edge fade overlays */
  fadeFromClass: string
  /** Center radial vignette overlay */
  vignetteBackground: string
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
    vignetteBackground:
      'radial-gradient(circle at center, var(--bg) 0%, transparent 72%)',
  },
  dark: {
    backgroundClass: 'bg-black',
    colors: [
      [255, 255, 255],
      [255, 255, 255],
    ],
    fadeFromClass: 'from-black',
    vignetteBackground:
      'radial-gradient(circle at center, rgba(0, 0, 0, 1) 0%, transparent 100%)',
  },
}

export function getGlitterPreset(theme: Theme): GlitterThemePreset {
  return GLITTER_THEME_PRESETS[theme]
}
