/**
 * @file
 * Get the next or previous sibling that matches a selector, like .closest()
 * but sideways.
 * @see https://gomakethings.com/finding-the-next-and-previous-sibling-elements-that-match-a-selector-with-vanilla-js/
 */

/**
 * Get the next matching sibling.
 * @param {HTMLElement} elem - The starting element.
 * @param {string} selector - The CSS-style selector to match against.
 * @return {Element|null} - The closest matching sibling, or null, if no
 * sibling matches the selector.
 */
export function getNextSibling(elem, selector) {
  let nextSibling = elem.nextElementSibling;
  // No selector? Then just grab the next sibling.
  if (!selector) {
    return nextSibling;
  }
  while (nextSibling) {
    if (nextSibling.matches(selector)) {
      return nextSibling;
    }
    nextSibling = nextSibling.nextElementSibling;
  }
  return null;
}

/**
 * Get the previous matching sibling.
 * @param {HTMLElement} elem - The starting element.
 * @param {string} selector - The CSS-style selector to match against.
 * @return {Element|null} - The closest matching sibling, or null, if no
 * sibling matches the selector.
 */
export function getPreviousSibling(elem, selector) {
  let prevSibling = elem.previousElementSibling;
  // No selector? Then just grab the previous sibling.
  if (!selector) {
    return prevSibling;
  }
  while (prevSibling) {
    if (prevSibling.matches(selector)) {
      return prevSibling;
    }
    prevSibling = prevSibling.previousElementSibling;
  }
  return null;
}
