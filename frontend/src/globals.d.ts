export {};
declare global {
  interface Window {
    applyLanguage?: (language: string) => void;
  }
}
