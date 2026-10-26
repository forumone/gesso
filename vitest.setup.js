import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }

  if (
    typeof HTMLDialogElement !== 'undefined' &&
    !HTMLDialogElement.prototype.showModal
  ) {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function close() {
      this.open = false;
    };
  }

  // jsdom does not implement innerText, since it requires layout.
  // https://github.com/jsdom/jsdom/issues/1245
  if (
    typeof HTMLElement !== 'undefined' &&
    !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText')
  ) {
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
      configurable: true,
      get() {
        return this.textContent;
      },
      set(value) {
        this.textContent = value;
      },
    });
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});
