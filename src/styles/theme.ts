export type ColorTheme = 'original' | 'earthy';

// Earthy is the shared development/production default.
// Set VITE_COLOR_THEME=original before starting/building to restore the approved palette.
export const activeTheme: ColorTheme = import.meta.env.VITE_COLOR_THEME === 'original'
  ? 'original'
  : 'earthy';

export function applyTheme() {
  if (activeTheme === 'earthy') document.documentElement.dataset.colorTheme = 'earthy';
  else document.documentElement.removeAttribute('data-color-theme');
}
