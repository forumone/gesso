// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { slideCollapse, slideExpand, slideToggle } from './_slide.es6';

function nextFrame() {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve);
    });
  });
}

function createTarget() {
  const target = document.createElement('div');
  Object.defineProperty(target, 'offsetHeight', {
    configurable: true,
    value: 100,
  });
  document.body.appendChild(target);
  return target;
}

describe('slideCollapse', () => {
  it('hides the target and dispatches finishslider once the transition ends', async () => {
    const target = createTarget();
    const finish = new Promise(resolve => {
      target.addEventListener('finishslider', resolve, { once: true });
    });

    slideCollapse(target, 10, 'ease', true);
    await nextFrame();
    await nextFrame();

    expect(target.style.height).toBe('0px');

    target.dispatchEvent(new Event('transitionend'));
    await finish;

    expect(target.style.display).toBe('none');
    expect(target.style.height).toBe('');
  });

  it('sets max-height to 0 instead of hiding when hideContent is false', async () => {
    const target = createTarget();
    const finish = new Promise(resolve => {
      target.addEventListener('finishslider', resolve, { once: true });
    });

    slideCollapse(target, 10, 'ease', false);
    await nextFrame();
    await nextFrame();

    target.dispatchEvent(new Event('transitionend'));
    await finish;

    expect(target.style.display).not.toBe('none');
    expect(target.style.maxHeight).toBe('0px');
  });

  it('clears the inline styles it set once the transition ends', async () => {
    const target = createTarget();
    const finish = new Promise(resolve => {
      target.addEventListener('finishslider', resolve, { once: true });
    });

    slideCollapse(target, 10, 'ease', true);
    await nextFrame();
    await nextFrame();

    target.dispatchEvent(new Event('transitionend'));
    await finish;

    expect(target.style.paddingBlockStart).toBe('');
    expect(target.style.paddingBlockEnd).toBe('');
    expect(target.style.marginBlockStart).toBe('');
    expect(target.style.marginBlockEnd).toBe('');
    expect(target.style.transitionDuration).toBe('');
    expect(target.style.transitionProperty).toBe('');
    expect(target.style.transitionTimingFunction).toBe('');
    expect(target.style.boxSizing).toBe('');
  });
});

describe('slideExpand', () => {
  it('reveals a display:none target and dispatches finishslider once the transition ends', async () => {
    const target = createTarget();
    target.style.display = 'none';
    const finish = new Promise(resolve => {
      target.addEventListener('finishslider', resolve, { once: true });
    });

    slideExpand(target, 10, 'ease', true);
    await nextFrame();
    await nextFrame();

    expect(target.style.display).not.toBe('none');
    expect(target.style.height).toBe('100px');

    target.dispatchEvent(new Event('transitionend'));
    await finish;

    expect(target.style.height).toBe('');
    expect(target.style.overflow).toBe('');
  });

  it('removes max-height instead of toggling display when hideContent is false', async () => {
    const target = createTarget();
    target.style.maxHeight = '0px';
    const finish = new Promise(resolve => {
      target.addEventListener('finishslider', resolve, { once: true });
    });

    slideExpand(target, 10, 'ease', false);
    await nextFrame();
    await nextFrame();

    target.dispatchEvent(new Event('transitionend'));
    await finish;

    expect(target.style.maxHeight).toBe('');
  });
});

describe('slideToggle', () => {
  it('expands a hidden target', async () => {
    const target = createTarget();
    target.style.display = 'none';

    slideToggle(target, 10, 'ease', true);
    await nextFrame();

    expect(target.dataset.isSliding).toBe('true');
  });

  it('collapses a visible target', async () => {
    const target = createTarget();

    slideToggle(target, 10, 'ease', true);
    await nextFrame();

    expect(target.dataset.isSliding).toBe('true');
    expect(target.style.height).toBe('0px');
  });

  it('does nothing while already sliding', async () => {
    const target = createTarget();
    target.dataset.isSliding = 'true';

    slideToggle(target, 10, 'ease', true);
    await nextFrame();

    expect(target.style.height).toBe('');
  });

  it('clears isSliding once the animation finishes', async () => {
    const target = createTarget();

    slideToggle(target, 10, 'ease', true);
    await nextFrame();
    await nextFrame();

    target.dispatchEvent(new Event('transitionend'));
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(target.dataset.isSliding).toBeUndefined();
  });
});
