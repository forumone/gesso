import Drupal from 'drupal';
import once from 'once';

Drupal.behaviors.externalLink = {
  attach(context, settings) {
    const ALLOWED_DOMAINS = [
      'allowed-domain.com',
    ];
    const ALLOWED_LINKS = [
      'https://www.example.com/another-allowed-link',
    ];
    const LABEL_TEXT ='Exit website';
    const ICON_NAME= 'arrow-up-right-from-square';

    const { imagePath } = settings.gesso;
    const externalLinks: NodeListOf<HTMLAnchorElement> = once(
      'external-link',
      "a:not([data-not-external-link], [href=''], [href^='#'], [href^='?'], [href^='/'], [href^='.'], [href^='javascript:'], [href^='mailto:'], [href^='tel:'])",
      context
    );

    function linkIsExternal(link: HTMLAnchorElement) {
      let external = true;

      if (
        link.host === window.location.host
      ) {
        external = false;
      }

      ALLOWED_DOMAINS.forEach(domain => {
        if (
          link.host === domain ||
          link.host.endsWith(`.${domain}`)
        ) {
          external = false;
        }
      });

      if (ALLOWED_LINKS.includes(link.href.toLowerCase())) {
        external = false;
      }

      return external;
    }

    externalLinks.forEach(link => {
      if (link.hasAttribute('href') && linkIsExternal(link)) {
        const accessibleLabel = Drupal.t(LABEL_TEXT);

        link.insertAdjacentHTML(
          'beforeend',
          `<svg class="c-icon c-icon--exit is-spaced-before" role="img"><title>${accessibleLabel}</title><use xlink:href="${imagePath}/sprite.artifact.svg#${ICON_NAME}"></use></svg>`
        );
      }
    });
  },
};
