export type ColorTheme = 'original' | 'earthy';

// Local development defaults to Earthy. Production remains Original pending approval.
// Set VITE_COLOR_THEME=original in .env.development.local to restore the approved palette.
export const activeTheme: ColorTheme = import.meta.env.DEV
  ? (import.meta.env.VITE_COLOR_THEME === 'original' ? 'original' : 'earthy')
  : 'original';

export function applyDevelopmentTheme() {
  if (activeTheme === 'earthy') document.documentElement.dataset.colorTheme = 'earthy';
  else document.documentElement.removeAttribute('data-color-theme');
}
