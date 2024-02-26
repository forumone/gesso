import Drupal from 'drupal';
import once from 'once';

Drupal.behaviors.externalLink = {
  attach(context, settings) {
    const { imagePath } = settings.gesso;
    const externalLinks: NodeListOf<HTMLAnchorElement> = once(
      'external-link',
      "a:not([data-not-external-link], [href=''], [href^='#'], [href^='?'], [href^='/'], [href^='.'], [href^='javascript:'], [href^='mailto:'], [href^='tel:'])",
      context
    );
    const allowedDomains = [
      'example-allowed-domain.com',
    ];
    const allowedLinks = [
      'https://www.youtube.com/example-allowed-link',
    ];

    function linkIsExternal(link: HTMLAnchorElement) {
      let external = true;

      if (
        link.host === 'forumone.github.io' ||
        link.host.endsWith('.forumone.github.io') ||
        link.host === window.location.host
      ) {
        external = false;
      }

      allowedDomains.forEach(domain => {
        if (
          link.host === domain ||
          link.host.endsWith(`.${domain}`)
        ) {
          external = false;
        }
      });

      if (allowedLinks.includes(link.href.toLowerCase())) {
        external = false;
      }

      return external;
    }

    externalLinks.forEach(link => {
      if (link.hasAttribute('href') && linkIsExternal(link)) {
        const accessibleLabel = Drupal.t('Exit this website');

        link.insertAdjacentHTML(
          'beforeend',
          `<svg class="c-icon c-icon--exit is-spaced-before" role="img"><title>${accessibleLabel}</title><use xlink:href="${imagePath}/sprite.artifact.svg#arrow-up-right-from-square"></use></svg>`
        );
      }
    });
  },
};
