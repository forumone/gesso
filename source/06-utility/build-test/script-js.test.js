// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('script-js', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.resetModules();
    vi.doUnmock('react-dom');
  });

  it('renders the component into the #root-js element', async () => {
    const root = document.createElement('div');
    root.id = 'root-js';
    document.body.appendChild(root);

    const render = vi.fn();
    vi.doMock('react-dom', () => ({
      default: { render },
    }));

    await import('./script-js.js');

    expect(render).toHaveBeenCalledTimes(1);
    expect(render.mock.calls[0][1]).toBe(root);
  });
});
