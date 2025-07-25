import Drupal from 'drupal';
import once from 'once';

Drupal.behaviors.externalLink = {
  attach(context, settings) {
    const { imagePath } = settings.gesso;
    const exitDisclaimer =
      settings?.gesso?.externalLinkExitDisclaimer ??
      Drupal.t('Exit this website');
    const allowedDomains = settings?.gesso?.externalLinkAllowedDomains ?? [];
    const allowedLinks = settings?.gesso?.externalLinkAllowedLinks ?? [];
    const externalLinks = once(
      'external-link',
      "a:not([data-not-external-link], [href=''], [href^='#'], [href^='?'], [href^='/'], [href^='.'], [href^='javascript:'], [href^='mailto:'], [href^='tel:'])",
      context
    ).filter(elem => elem instanceof HTMLAnchorElement);

    function linkIsExternal(link: HTMLAnchorElement) {
      let external = true;

      if (link.host === window.location.host) {
        external = false;
      }

      allowedDomains.forEach(domain => {
        if (link.host === domain || link.host.endsWith(`.${domain}`)) {
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
        const accessibleLabel = exitDisclaimer;

        link.insertAdjacentHTML(
          'beforeend',
          `<svg class="c-icon c-icon--exit is-spaced-before" role="img"><title>${accessibleLabel}</title><use xlink:href="${imagePath}/sprite.artifact.svg#arrow-up-right-from-square"></use></svg>`
        );
      }
    });
  },
};
