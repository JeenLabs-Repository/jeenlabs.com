export const CANVAS_BACKGROUND_COLORS = {
  dark: [
    [220, 38, 38],
    [255, 255, 255],
  ],
  light: [
    [220, 38, 38],
    [23, 23, 23],
  ],
} as const satisfies Record<"dark" | "light", number[][]>;
