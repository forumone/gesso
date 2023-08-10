/**
 * Calculate the width of the vertical scrollbar.
 * via https://codepen.io/Mamboleoo/post/scrollbars-and-css-custom-properties
 */
function calculateScrollbarSize() {
  const containerWithScroll = document.createElement('div');
  containerWithScroll.style.visibility = 'hidden';
  containerWithScroll.style.overflow = 'scroll';
  const innerContainer = document.createElement('div');
  containerWithScroll.appendChild(innerContainer);
  document.body.appendChild(containerWithScroll);
  const width = containerWithScroll.offsetWidth - innerContainer.offsetWidth;
  document.body.removeChild(containerWithScroll);
  return width;
}

/**
 * Set a CSS variable with the width of the scrollbar.
 */
function setScrollbarProperty() {
  const scrollbarWidth = calculateScrollbarSize();
  if (!Number.isNaN(scrollbarWidth)) {
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth}px`
    );
  }
}

export default setScrollbarProperty;
