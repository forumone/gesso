// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import Tabs from './_Tabs.es6';

function createTabsMarkup(count = 3) {
  const container = document.createElement('div');
  let html = '';
  for (let i = 0; i < count; i += 1) {
    html += `<button role="tab" id="tab-${i}">Tab ${i}</button>`;
  }
  for (let i = 0; i < count; i += 1) {
    html += `<div role="tabpanel" id="panel-${i}"></div>`;
  }
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
}

describe('Tabs', () => {
  it('selects the first tab on init without moving focus', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const triggers = container.querySelectorAll('[role="tab"]');
    expect(triggers[0].getAttribute('aria-selected')).toBe('true');
    expect(triggers[1].getAttribute('aria-selected')).toBe('false');
    expect(document.activeElement).not.toBe(triggers[0]);
  });

  it('sets tabindex to -1 on all tabs except the selected one', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const triggers = container.querySelectorAll('[role="tab"]');
    expect(triggers[0].hasAttribute('tabindex')).toBe(false);
    expect(triggers[1].tabIndex).toBe(-1);
    expect(triggers[2].tabIndex).toBe(-1);
  });

  it('shows the panel corresponding to the selected tab', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const panels = container.querySelectorAll('[role="tabpanel"]');
    expect(panels[0].getAttribute('aria-hidden')).toBe('false');
    expect(panels[1].getAttribute('aria-hidden')).toBe('true');
  });

  it('selects a tab on click', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const triggers = container.querySelectorAll('[role="tab"]');
    triggers[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(triggers[1].getAttribute('aria-selected')).toBe('true');
    expect(triggers[0].getAttribute('aria-selected')).toBe('false');
  });

  it('moves to the next tab on ArrowRight and focuses it', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const triggers = container.querySelectorAll('[role="tab"]');
    triggers[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );

    expect(triggers[1].getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(triggers[1]);
  });

  it('wraps to the first tab when pressing ArrowRight on the last tab', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const triggers = container.querySelectorAll('[role="tab"]');
    tabs.setSelectedTab(triggers[2], false);
    triggers[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );

    expect(triggers[0].getAttribute('aria-selected')).toBe('true');
  });

  it('wraps to the last tab when pressing ArrowLeft on the first tab', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const triggers = container.querySelectorAll('[role="tab"]');
    triggers[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    );

    expect(triggers[2].getAttribute('aria-selected')).toBe('true');
  });

  it('jumps to the first tab on Home and the last tab on End', () => {
    const container = createTabsMarkup();
    const tabs = new Tabs(container);
    tabs.init();

    const triggers = container.querySelectorAll('[role="tab"]');
    triggers[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', bubbles: true })
    );
    expect(triggers[2].getAttribute('aria-selected')).toBe('true');

    triggers[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
    );
    expect(triggers[0].getAttribute('aria-selected')).toBe('true');
  });
});
