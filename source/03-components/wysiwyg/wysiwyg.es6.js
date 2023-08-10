import Drupal from 'drupal';
import once from 'once';

Drupal.behaviors.wysiwyg = {
  attach(context) {
    once('wysiwyg', '[data-wysiwyg]', context).forEach(wysiwyg => {

      // Wrap all tables output via WYSIWYG with a responsive table layout.
      const tables = wysiwyg.querySelectorAll('[data-wysiwyg] table');
      tables.forEach((table, i) => {
        const tableParent = table.parentNode;

        // Don’t add wrapper if it already has one.
        if (!tableParent.classList.contains('l-responsive-table')) {
          const responsiveTable = document.createElement('div');
          const caption = table.querySelector('caption');

          responsiveTable.classList.add('l-responsive-table');
          responsiveTable.setAttribute('tabindex', '0');
          responsiveTable.setAttribute('role', 'region');

          if (caption) {
            const captionId = `table-caption-${i}`;
            caption.setAttribute('id', captionId);
            responsiveTable.setAttribute('aria-labelledby', captionId);
          } else {
            responsiveTable.setAttribute('aria-label', 'Table');
          }

          responsiveTable.appendChild(table.cloneNode(true));
          tableParent.replaceChild(responsiveTable, table);
        }
      });
    });
  },
};
