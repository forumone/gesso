// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import Drupal from 'drupal';
import './modal.es6';

function createModal({ defaultOpen = false } = {}) {
  const modal = document.createElement('dialog');
  modal.id = 'my-modal';
  modal.className = 'js-modal';
  if (defaultOpen) modal.setAttribute('data-default-open', '');
  modal.innerHTML = `
    <div class="js-modal-inner">
      <button class="js-modal-close" aria-controls="my-modal">Close</button>
      <a href="#" id="focus-0">Link</a>
      <input type="text" id="focus-1" />
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function createOpenButton(modalId) {
  const button = document.createElement('button');
  button.className = 'js-modal-open';
  button.setAttribute('aria-controls', modalId);
  document.body.appendChild(button);
  return button;
}

describe('modal behavior', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('opens the modal by default when data-default-open is set', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    expect(modal.open).toBe(true);
    expect(document.body.classList.contains('has-open-modal')).toBe(true);
  });

  it('does not open the modal by default without data-default-open', () => {
    const modal = createModal();
    Drupal.behaviors.gessoModal.attach(document.body);

    expect(modal.open).toBe(false);
  });

  it('opens the modal when the open button is clicked', () => {
    const modal = createModal();
    const openButton = createOpenButton('my-modal');
    Drupal.behaviors.gessoModal.attach(document.body);

    openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(modal.open).toBe(true);
    expect(document.body.classList.contains('has-open-modal')).toBe(true);
  });

  it('closes the modal when the close button is clicked', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    const closeButton = modal.querySelector('.js-modal-close');
    closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(modal.open).toBe(false);
    expect(document.body.classList.contains('has-open-modal')).toBe(false);
  });

  it('closes the modal when clicking the overlay outside the inner content', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(modal.open).toBe(false);
  });

  it('does not close the modal when clicking inside the inner content', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    const inner = modal.querySelector('.js-modal-inner');
    inner.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(modal.open).toBe(true);
  });

  it('closes the modal on Escape', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    modal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(modal.open).toBe(false);
  });

  it('traps focus: Tab on the last focusable element moves to the first', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    const focusable = modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    last.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    modal.dispatchEvent(event);

    expect(document.activeElement).toBe(first);
    expect(event.defaultPrevented).toBe(true);
  });

  it('traps focus: Shift+Tab on the first focusable element moves to the last', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    const focusable = modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const last = focusable[focusable.length - 1];
    focusable[0].focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    modal.dispatchEvent(event);

    expect(document.activeElement).toBe(last);
    expect(event.defaultPrevented).toBe(true);
  });

  it('dispatches an openmodal event when opened', () => {
    const modal = createModal();
    const openButton = createOpenButton('my-modal');
    Drupal.behaviors.gessoModal.attach(document.body);

    const openHandler = vi.fn();
    modal.addEventListener('openmodal', openHandler);

    openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(openHandler).toHaveBeenCalledTimes(1);
  });

  it('dispatches a closemodal event when closed', () => {
    const modal = createModal({ defaultOpen: true });
    Drupal.behaviors.gessoModal.attach(document.body);

    const closeHandler = vi.fn();
    modal.addEventListener('closemodal', closeHandler);

    modal
      .querySelector('.js-modal-close')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(closeHandler).toHaveBeenCalledTimes(1);
  });

  it('does nothing when the open/close button has no matching modal', () => {
    createOpenButton('nonexistent-modal');
    expect(() =>
      Drupal.behaviors.gessoModal.attach(document.body)
    ).not.toThrow();
  });

  it('does not process the same modal twice (once guard)', () => {
    const modal = createModal();
    const openButton = createOpenButton('my-modal');
    Drupal.behaviors.gessoModal.attach(document.body);
    Drupal.behaviors.gessoModal.attach(document.body);

    openButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(modal.open).toBe(true);
  });
});
