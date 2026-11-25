export function navigateTo(url: string) {
  window.dispatchEvent(new CustomEvent('rcga:navigate', { detail: url }));
}
