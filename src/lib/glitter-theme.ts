import type { AppTheme } from '@/hooks/use-theme'

export type GlitterPreset = {
  colors: number[][]
  /** Higher floor on light backgrounds — additive blend fades pale dots on white. */
  opacities?: number[]
  backgroundClass: string
  fadeFromClass: string
}

/** Edit dot colors (RGB 0–255) and background classes per theme. */
export function getGlitterPreset(theme: AppTheme): GlitterPreset {
  if (theme === 'light') {
    return {
      colors: [
        [255, 0, 0],
        [185, 55, 55],
      ],
      opacities: [0.45, 0.45, 0.45, 0.6, 0.6, 0.6, 0.85, 0.85, 0.85, 1],
      backgroundClass: 'bg-[var(--bg)]',
      fadeFromClass: 'from-[var(--bg)]',
    }
  }

  return {
    colors: [
      [255, 0, 0],
      [255, 255, 255],
    ],
    backgroundClass: 'bg-background',
    fadeFromClass: 'from-background',
  }
}
