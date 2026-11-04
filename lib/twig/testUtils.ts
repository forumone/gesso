import Twig from 'twig';
import type { TwigContext, TwigExtension } from './types.ts';

/**
 * Registers the extension on the real Twig.js instance and renders a template.
 * Extensions are global to the Twig instance, so tests register what they use
 * before each render.
 */
export function render(
  extension: TwigExtension,
  template: string,
  context: TwigContext = {}
): string {
  Twig.cache(false);
  extension(Twig);
  return Twig.twig({ data: template }).render(context);
}
