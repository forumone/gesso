import Drupal from 'drupal';

Drupal.behaviors.backToTop = {
  attach(context, settings) {
    const threshold = settings?.gesso?.backToTopThreshold ?? 200;
    const smoothScroll = settings?.gesso?.backToTopSmoothScroll ?? true;
    const backToTop = context.querySelector(
      '.c-back-to-top'
    ) as HTMLAnchorElement;

    if (!backToTop) {
      return;
    }

    if (!Number.isNaN(threshold) && threshold > 0) {
      backToTop.setAttribute('aria-hidden', 'true');
      backToTop.setAttribute('tabIndex', '-1');
      const scrollHandler = () => {
        if (
          window.scrollY >= threshold &&
          backToTop.getAttribute('aria-hidden') === 'true'
        ) {
          backToTop.setAttribute('aria-hidden', 'false');
          backToTop.removeAttribute('tabIndex');
        } else if (
          window.scrollY < threshold &&
          backToTop.getAttribute('aria-hidden') === 'false'
        ) {
          backToTop.setAttribute('aria-hidden', 'true');
          backToTop.setAttribute('tabIndex', '-1');
        }
      };
      let stillScrolling: number;
      window.addEventListener('scroll', () => {
        if (typeof stillScrolling !== 'undefined') {
          window.clearTimeout(stillScrolling);
        }
        stillScrolling = window.setTimeout(scrollHandler, 60);
      });
    } else {
      backToTop.setAttribute('aria-hidden', 'false');
      backToTop.removeAttribute('tabIndex');
    }

    if (smoothScroll) {
      backToTop.addEventListener('click', event => {
        const targetId = backToTop.getAttribute('href') as string;
        const target = document.querySelector(targetId);

        if (target instanceof HTMLElement) {
          event.preventDefault();
          const coords = target.getBoundingClientRect();
          target.setAttribute('tabIndex', '-1');
          window.scrollTo({
            top: coords.top,
            behavior: 'smooth',
          });
          target.focus();
        }
      });
    }
  },
};
