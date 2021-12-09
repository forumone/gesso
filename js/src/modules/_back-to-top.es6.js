/**
 * Additional functionality for Back to Top button.
 * @param {integer} threshold - Distance the user must scroll down the page
 *   before the back to top button is displayed.
 * @param {boolean} smoothScroll - Whether to animate the user's scroll back
 *   to the top.
 */
export default function (threshold = 200, smoothScroll = true) {
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    if (!isNaN(threshold)) {
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
          backToTop.getAttribute('aria-hidden', 'false')
        ) {
          backToTop.setAttribute('aria-hidden', 'true');
          backToTop.setAttribute('tabIndex', '-1');
        }
      };
      let stillScrolling = false;
      window.addEventListener('scroll', () => {
        if (stillScrolling !== false) {
          clearTimeout(stillScrolling);
        }
        stillScrolling = setTimeout(scrollHandler, 60);
      });
    }
    if (smoothScroll) {
      backToTop.addEventListener('click', event => {
        const targetId = backToTop.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
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
  }
}
