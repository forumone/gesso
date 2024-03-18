import Drupal from 'drupal';
import once from 'once';

const TABLE = `.c-table.is-sortable`;
const SORTED = 'aria-sort';
const ASCENDING = 'ascending';
const DESCENDING = 'descending';
const SORT_OVERRIDE = 'data-sort-value';
const SORT_BUTTON_CLASS = `c-table__header-button`;
const SORT_BUTTON = `.${SORT_BUTTON_CLASS}`;
const SORTABLE_ATTRIBUTE = `data-sortable`;
const SORTABLE_HEADER = `th[${SORTABLE_ATTRIBUTE}]`;
const ANNOUNCEMENT_CLASS = `c-table__announcement-region`;
const ANNOUNCEMENT_REGION = `.${ANNOUNCEMENT_CLASS}[aria-live="polite"]`;
const SORT_ALL_COLUMNS = true;

/**
 * Gets the data-sort-value attribute value, if provided — otherwise, gets
 * the innerText or textContent of the child element (HTMLTableCellElement)
 * at the specified index of the given table row.
 */
const getCellValue = (
  tr: HTMLTableRowElement,
  index: number
): string | number | null =>{
  const item = tr.children[index];
  if (item instanceof HTMLTableCellElement) {
    return (
      item.getAttribute(SORT_OVERRIDE) || item.innerText || item.textContent
    );
  }
  // Item not HTMLTableCellElement.
  return null;
}

/**
 * Compares the values of two row array items at the given index, then sorts
 * by the given direction.
 */
const compareFunction =
  (index: number, isAscending: boolean) =>
  (thisRow: HTMLTableRowElement, nextRow: HTMLTableRowElement): number => {
    // Get values to compare from data attribute or cell content.
    const value1 = getCellValue(isAscending ? thisRow : nextRow, index);
    const value2 = getCellValue(isAscending ? nextRow : thisRow, index);

    if (!value1 || !value2) {
      return 0;
    }

    // Compare numerically if they’re numbers.
    const number1 = Number(value1);
    const number2 = Number(value2);
    if (!Number.isNaN(number1) && !Number.isNaN(number2)) {
      return number1 - number2;
    }

    // Otherwise, compare alphabetically based on current user locale.
    return value1
      .toString()
      .localeCompare(value2.toString(), navigator.language, {
        numeric: true,
        ignorePunctuation: true,
      });
  };

/**
 * Get an Array of column headers elements belonging directly to the given
 * table element.
 */
const getColumnHeaders = (table: HTMLTableElement): HTMLTableCellElement[] => {
  const headers = Array.from(
    table.querySelectorAll<HTMLTableCellElement>(SORTABLE_HEADER)
  );
  return headers.filter(header => header.closest(TABLE) === table);
};

/**
 * Update the button label within the given header element, resetting it
 * to the default state (ready to sort ascending) if it’s no longer sorted.
 */
const updateSortLabel = (header: HTMLTableCellElement): void => {
  const headerName = header.innerText;
  const sortedAscending = header.getAttribute(SORTED) === ASCENDING;
  const isSorted =
    header.getAttribute(SORTED) === ASCENDING ||
    header.getAttribute(SORTED) === DESCENDING ||
    false;
  const headerLabel = `${headerName}, sortable column, currently ${
    isSorted
      ? `${sortedAscending ? `sorted ${ASCENDING}` : `sorted ${DESCENDING}`}`
      : 'unsorted'
  }`;
  const headerButtonLabel = `Click to sort by ${headerName} in ${
    sortedAscending ? DESCENDING : ASCENDING
  } order.`;
  header.setAttribute('aria-label', headerLabel);
  header.querySelector(SORT_BUTTON)?.setAttribute('title', headerButtonLabel);
};

/**
 * Remove the aria-sort attribute on the given header element, and reset the
 * label and button icon.
 */
const unsetSort = (header: HTMLTableCellElement): void => {
  header.removeAttribute(SORTED);
  updateSortLabel(header);
};

/**
 * Sort rows either ascending or descending, based on a given header’s
 * aria-sort attribute.
 */
const sortRows = (
  header: HTMLTableCellElement,
  isAscending: boolean
): boolean => {
  header.setAttribute(SORTED, isAscending === true ? DESCENDING : ASCENDING);
  updateSortLabel(header);

  const table = header.closest(TABLE);
  const headerRow = header.parentNode;

  if (!table || !headerRow) {
    return false;
  }

  const tbody = table.querySelector('tbody');
  const siblingHeaders = headerRow.children;

  if (!tbody) {
    return false;
  }

  Array.from(tbody.querySelectorAll('tr'))
    .sort(
      compareFunction(Array.from(siblingHeaders).indexOf(header), !isAscending)
    )
    .forEach(tr => tbody.appendChild(tr));

  return true;
};

/**
 * Update the live region immediately following the table whenever the sort
 * changes.
 */
const updateLiveRegion = (
  table: HTMLTableElement,
  sortedHeader: HTMLTableCellElement
): void => {
  const caption = table.querySelector('caption')?.innerText;
  const sortedAscending = sortedHeader.getAttribute(SORTED) === ASCENDING;
  const headerLabel = sortedHeader.innerText;
  const liveRegion = table.nextElementSibling;

  if (!liveRegion || !(liveRegion instanceof HTMLElement)) {
    return;
  }

  if (liveRegion.matches(ANNOUNCEMENT_REGION)) {
    let tableName = '';
    if (caption) {
      tableName = ` named “${caption}”`;
    }

    const sortAnnouncement = `The table${tableName} is now sorted by ${headerLabel} in ${
      sortedAscending ? ASCENDING : DESCENDING
    } order.`;
    liveRegion.innerText = sortAnnouncement;
  } else {
    // eslint-disable-next-line no-console
    console.error(
      'Table containing a sortable column header is not followed by an aria-live region.'
    );
  }
};

/**
 * Toggle a header’s sort state, optionally providing a target state. If no
 * state is provided, the current state will be toggled (from false to true,
 * and vice-versa).
 */
const toggleSort = (
  header: HTMLTableCellElement,
  isAscending: boolean
): void => {
  const table = header.closest(TABLE);

  let safeAscending = isAscending;

  if (typeof safeAscending !== 'boolean') {
    safeAscending = header.getAttribute(SORTED) === ASCENDING;
  }

  if (!table || !(table instanceof HTMLTableElement)) {
    throw new Error(`${SORTABLE_HEADER} is missing outer ${TABLE}`);
  }

  safeAscending = sortRows(header, isAscending);

  if (safeAscending) {
    getColumnHeaders(table).forEach((otherHeader: HTMLTableCellElement) => {
      if (otherHeader !== header) {
        unsetSort(otherHeader);
      }
    });
    updateLiveRegion(table, header);
  }
};

/**
 ** Inserts a button with icon inside a sortable header.
 */

const createHeaderButton = (
  header: HTMLTableCellElement,
  imagePath: string
): void => {
  const buttonEl = document.createElement('button');
  buttonEl.setAttribute('tabindex', '0');
  buttonEl.classList.add(SORT_BUTTON_CLASS);

  // Add button icons.
  buttonEl.innerHTML = `
        <svg class="c-icon c-table__sort-icon"><use xlink:href="${imagePath}/sprite.artifact.svg#sort"></use></svg>
        <svg class="c-icon c-table__sorted-icon"><use xlink:href="${imagePath}/sprite.artifact.svg#sorted"></use></svg>
      `;
  const headerInnerElem = document.createElement('div');
  headerInnerElem.innerHTML = header.innerHTML;
  headerInnerElem.classList.add('c-table__header-inner');
  headerInnerElem.appendChild(buttonEl);
  header.innerHTML = '';
  header.appendChild(headerInnerElem);
  updateSortLabel(header);
};

Drupal.behaviors.sortableTable = {
  attach(context, settings) {
    const { imagePath } = settings.gesso;

    const tables = once(
      'sort-buttons',
      '.c-table.is-sortable',
      context
    ) as NodeListOf<HTMLElement>;

    tables.forEach(table => {
      // Add sortable attribute to all column headers if wanted.
      if (SORT_ALL_COLUMNS) {
        table.querySelectorAll<HTMLTableCellElement>('thead th').forEach(th => {
          th.setAttribute(SORTABLE_ATTRIBUTE, '');
        });
      }

      // Add aria-live region for sort announcements.
      const liveRegion = table.nextElementSibling;

      if (!liveRegion || !liveRegion.matches(ANNOUNCEMENT_REGION)) {
        table.insertAdjacentHTML(
          'afterend',
          `<div class="${ANNOUNCEMENT_CLASS}" aria-live="polite"></div>`
        );
      }

      const sortableHeaders =
        table.querySelectorAll<HTMLTableCellElement>(SORTABLE_HEADER);
      sortableHeaders.forEach(header => {
        createHeaderButton(header, imagePath || '');
      });

      const sortButtons: NodeListOf<HTMLButtonElement> =
        table.querySelectorAll(SORT_BUTTON);
      sortButtons.forEach(button => {
        button.addEventListener('click', event => {
          const target = event.target as HTMLElement;
          const targetHeader = target.closest(SORTABLE_HEADER);
          event.preventDefault();

          if (targetHeader instanceof HTMLTableCellElement) {
            toggleSort(
              targetHeader,
              targetHeader.getAttribute(SORTED) === ASCENDING,
            );
          }
        });
      });
    });
  },
};
