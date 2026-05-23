import type { AppTheme } from '@/hooks/use-theme'

export type GlitterPreset = {
  colors: number[][]
  backgroundClass: string
  fadeFromClass: string
}

/** Edit dot colors (RGB 0–255) and background classes per theme. */
export function getGlitterPreset(theme: AppTheme): GlitterPreset {
  if (theme === 'light') {
    return {
      colors: [
        [26, 26, 26],
        [170, 59, 255],
      ],
      backgroundClass: 'bg-[var(--bg)]',
      fadeFromClass: 'from-[var(--bg)]',
    }
  }

  return {
    colors: [
      [243, 244, 246],
      [192, 132, 252],
    ],
    backgroundClass: 'bg-background',
    fadeFromClass: 'from-background',
  }
}
