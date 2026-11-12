// Local type declaration for @forumone/tiny-mustache, which ships no types and
// has no @types package. This file must stay ambient (no top-level import or
// export) so that `declare module` declares the module instead of augmenting it.
declare module '@forumone/tiny-mustache' {
  /** A Mustache lambda: receives the raw section text and a render function. */
  type MustacheLambda = (
    this: MustacheContext,
    text: string,
    render: (template: string) => string
  ) => string;

  /** Values that a template can reference. */
  interface MustacheContext {
    [key: string]: unknown;
  }

  /**
   * Renders a Mustache template.
   * @param template - Template string
   * @param self - Data (or array of data, for sections) to render with
   * @param parent - Parent context (internal use when recursing)
   * @param invert - Render inverted sections (internal use when recursing)
   */
  export default function mustache(
    template: string,
    self?: unknown,
    parent?: MustacheContext,
    invert?: boolean
  ): string;
}
