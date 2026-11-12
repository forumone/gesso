/**
 * Shared Twig.js types for the Storybook mocks of Drupal Twig functions and
 * filters.
 *
 * `@types/twig` types everything as `any`, so these narrower types make mocks
 * validate their inputs instead. Twig.js passes template data through untyped,
 * so mocks receive `unknown` and narrow it.
 */

/** Twig.js render context: the variables available to a template. */
export type TwigContext = Record<string, unknown>;

/**
 * The `this` value Twig.js gives to extended functions. It is the state of the
 * template being rendered; only `context` is used by the mocks.
 */
export interface TwigTemplateScope {
  context: TwigContext;
}

/** A function registered with `Twig.extendFunction()`. */
export type TwigFunction = (
  this: TwigTemplateScope,
  ...params: unknown[]
) => unknown;

/** A filter registered with `Twig.extendFilter()`. */
export type TwigFilter = (value: unknown, params: unknown[] | false) => unknown;

/** The slice of the Twig.js API the mocks need. */
export interface TwigExtendable {
  extendFunction(name: string, definition: TwigFunction): void;
  extendFilter(name: string, definition: TwigFilter): void;
}

/** A mock: registers one or more functions or filters on a Twig instance. */
export type TwigExtension = (twig: TwigExtendable) => void;
