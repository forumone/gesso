declare module "drupal" {
  interface GessoSettings {
    gesso: {
      backToTopThreshold?: number;
      backToTopSmoothScroll?: boolean;
    };
  }

  type Settings = object & GessoSettings;

  interface Behavior {
    attach?: (context: HTMLElement | Document, settings: Settings) => void;

    detach?: (
      context: HTMLElement | Document,
      settings: Settings,
      trigger: string
    ) => void;
  }

  const Drupal: {
    attachBehaviors(context?: HTMLElement | Document, settings?: Settings): void;

    throwError(error: Error | string): void;

    checkPlain(str: string): string;

    formatString(str: string, args: object): string;

    stringReplace(str: string, args: object, keys?: unknown): string;

    t(str: string, args?: unknown, options?: string): string;

    formatPlural(
      count: number,
      singular: string,
      plural: string,
      args?: object,
      options?: object
    ): string;

    encodePath(item: string): string;

    url: {
      (path: string): string;

      toAbsolute(url: string): string;

      isLocal(url: string): boolean;
    };

    theme: {
      (func: string, options: unknown): string | HTMLElement;

      placeholder(str: string): string;

      [key: string]: unknown;
    };

    behaviors: Record<string, Behavior>;

    [key: string]: unknown;
  }

  export default Drupal;
}
