import { describe, expect, it } from 'vitest';
import {
  buildFilePlan,
  buildTemplateData,
  cssPrefix,
  getComponentDir,
  getComponentLocation,
  getUsage,
  normalizeSpacing,
  optionsFromArgs,
  parseArgs,
  renderConfirmation,
  renderFile,
  renderSummary,
  validateArgs,
  type ComponentOptions,
} from './generator.ts';

const argv = (...args: string[]) => ['node', 'component.ts', ...args];

const options: ComponentOptions = {
  name: 'hero-banner',
  title: 'Hero Banner',
  folder: 'components',
  subfolder: '',
  js: false,
};

describe('parseArgs', () => {
  it('returns defaults with no arguments', () => {
    expect(parseArgs(argv())).toEqual({
      name: null,
      folder: null,
      title: null,
      subfolder: '',
      js: null,
      help: false,
    });
  });

  it('parses all flags', () => {
    expect(
      parseArgs(
        argv(
          '--name',
          'hero',
          '--folder',
          'layouts',
          '--title',
          'Hero Banner',
          '--subfolder',
          'sub',
          '--js'
        )
      )
    ).toEqual({
      name: 'hero',
      folder: 'layouts',
      title: 'Hero Banner',
      subfolder: 'sub',
      js: true,
      help: false,
    });
  });

  it('recognizes --help and -h', () => {
    expect(parseArgs(argv('--help')).help).toBe(true);
    expect(parseArgs(argv('-h')).help).toBe(true);
  });

  it('ignores unknown arguments', () => {
    expect(parseArgs(argv('--bogus', 'x')).name).toBeNull();
  });

  // Regression: a value flag used to consume whatever followed it, so
  // `--name --folder components` set name to "--folder".
  it('does not swallow a following flag as a value', () => {
    const parsed = parseArgs(argv('--name', '--folder', 'components'));
    expect(parsed.name).toBeNull();
    expect(parsed.folder).toBe('components');
  });

  // Regression: a trailing value flag used to set the value to undefined.
  it('leaves a trailing value flag unset', () => {
    const parsed = parseArgs(argv('--name', 'hero', '--title'));
    expect(parsed.title).toBeNull();
    expect(parseArgs(argv('--subfolder')).subfolder).toBe('');
  });
});

describe('getUsage', () => {
  it('describes the options', () => {
    const usage = getUsage();
    expect(usage).toContain('Usage: npm run component');
    expect(usage).toContain('--name <name>');
    expect(usage).toContain('--js');
  });
});

describe('validateArgs', () => {
  const folders = ['components', 'layouts'];

  it('accepts valid arguments', () => {
    const parsed = parseArgs(argv('--name', 'x', '--folder', 'layouts'));
    expect(validateArgs(parsed, folders)).toEqual([]);
  });

  it('requires name and folder', () => {
    const errors = validateArgs(parseArgs(argv('--js')), folders);
    expect(errors).toEqual(['--name is required', '--folder is required']);
  });

  it('rejects an unknown folder', () => {
    const parsed = parseArgs(argv('--name', 'x', '--folder', 'nope'));
    const errors = validateArgs(parsed, folders);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('Invalid folder "nope"');
    expect(errors[0]).toContain('components, layouts');
  });

  // Regression: a name with no letters or digits kebab-cased to an empty
  // string and generated files named ".twig" in the folder itself.
  it('rejects a name that is empty once kebab-cased', () => {
    const parsed = parseArgs(argv('--name', '!!!', '--folder', 'layouts'));
    expect(validateArgs(parsed, folders)[0]).toContain('no letters or numbers');
  });
});

describe('optionsFromArgs', () => {
  it('kebab-cases the name and derives the title', () => {
    const parsed = parseArgs(
      argv('--name', 'HeroBanner', '--folder', 'layouts')
    );
    expect(
      optionsFromArgs({ ...parsed, name: 'HeroBanner', folder: 'layouts' })
    ).toEqual({
      name: 'hero-banner',
      title: 'Hero Banner',
      folder: 'layouts',
      subfolder: '',
      js: false,
    });
  });

  it('uses the given title, subfolder and js flag', () => {
    const parsed = parseArgs(
      argv(
        '--name',
        'a',
        '--folder',
        'f',
        '--title',
        'T',
        '--subfolder',
        's',
        '--js'
      )
    );
    expect(optionsFromArgs({ ...parsed, name: 'a', folder: 'f' })).toEqual({
      name: 'a',
      title: 'T',
      folder: 'f',
      subfolder: 's',
      js: true,
    });
  });
});

describe('cssPrefix', () => {
  it('prefixes by folder', () => {
    expect(cssPrefix('x', 'layouts')).toBe('l-x');
    expect(cssPrefix('x', 'components')).toBe('c-x');
    expect(cssPrefix('x', 'other')).toBe('x');
  });
});

describe('getComponentLocation / getComponentDir', () => {
  it('handles no subfolder', () => {
    expect(getComponentLocation(options)).toBe('components');
    expect(getComponentDir(options)).toBe('components/components/hero-banner');
  });

  it('kebab-cases the subfolder', () => {
    const withSub = { ...options, subfolder: 'Card Parts' };
    expect(getComponentLocation(withSub)).toBe('components/card-parts');
    expect(getComponentDir(withSub)).toBe(
      'components/components/card-parts/hero-banner'
    );
  });
});

describe('buildTemplateData', () => {
  it('provides template variables', () => {
    const data = buildTemplateData(options);
    expect(data).toMatchObject({
      componentName: 'hero-banner',
      componentTitle: 'Hero Banner',
      componentLocation: 'components',
      componentCssClass: 'c-hero-banner',
      componentJs: false,
      storybookImportPath: '../../../.storybook',
    });
  });

  it('deepens the storybook path for subfolders', () => {
    const data = buildTemplateData({ ...options, subfolder: 'sub' });
    expect(data.storybookImportPath).toBe('../../../../.storybook');
  });

  it('provides case lambdas', () => {
    const data = buildTemplateData(options);
    const render = (text: string) => text;
    const lambdas = data as unknown as Record<
      string,
      (text: string, render: (t: string) => string) => string
    >;
    expect(lambdas.pascalCase('hero-banner', render)).toBe('HeroBanner');
    expect(lambdas.machineName('hero-banner', render)).toBe('HeroBanner');
    expect(lambdas.camelCase('hero-banner', render)).toBe('heroBanner');
    expect(lambdas.humanName('hero-banner', render)).toBe('heroBanner');
    expect(lambdas.titleCase('hero-banner', render)).toBe('Hero Banner');
  });
});

describe('buildFilePlan', () => {
  it('plans the standard files', () => {
    expect(buildFilePlan(options).map(entry => entry.path)).toEqual([
      'components/components/hero-banner/hero-banner.twig',
      'components/components/hero-banner/hero-banner.yml',
      'components/components/hero-banner/hero-banner.component.yml',
      'components/components/hero-banner/hero-banner.source.scss',
      'components/components/hero-banner/hero-banner.stories.jsx',
    ]);
  });

  it('adds the JavaScript file when requested', () => {
    const plan = buildFilePlan({ ...options, js: true });
    expect(plan.at(-1)).toMatchObject({
      path: 'components/components/hero-banner/hero-banner.source.js',
      template: 'Javascript.hbs',
    });
  });

  it('normalizes spacing only for the story', () => {
    const flagged = buildFilePlan(options).filter(e => e.normalizeSpacing);
    expect(flagged.map(e => e.template)).toEqual(['Story.hbs']);
  });
});

describe('normalizeSpacing', () => {
  it('collapses stacked blank lines', () => {
    expect(normalizeSpacing('a\n\n\n\nb')).toBe('a\n\nb');
  });

  it('keeps single blank lines', () => {
    expect(normalizeSpacing('a\n\nb\nc')).toBe('a\n\nb\nc');
  });

  // Regression: the pattern was built from os.EOL, so CRLF output was never
  // normalized on Windows (and LF output wasn't either).
  it('handles CRLF line endings', () => {
    expect(normalizeSpacing('a\r\n\r\n\r\nb')).toBe('a\r\n\r\nb');
  });
});

describe('renderFile', () => {
  const entry = { path: 'x.txt', template: 't', normalizeSpacing: false };

  it('renders mustache variables', () => {
    const data = buildTemplateData(options);
    expect(renderFile(entry, 'Hi {{ componentTitle }}', data)).toEqual({
      path: 'x.txt',
      contents: 'Hi Hero Banner',
    });
  });

  it('renders the jsClassName partial', () => {
    const data = buildTemplateData(options);
    expect(renderFile(entry, '{{> jsClassName }}', data).contents).toBe(
      'HeroBanner'
    );
  });

  it('normalizes spacing when flagged', () => {
    const data = buildTemplateData(options);
    const flagged = { ...entry, normalizeSpacing: true };
    expect(renderFile(flagged, 'a\n\n\n\nb', data).contents).toBe('a\n\nb');
    expect(renderFile(entry, 'a\n\n\n\nb', data).contents).toBe('a\n\n\n\nb');
  });
});

describe('renderSummary / renderConfirmation', () => {
  it('renders the non-interactive summary', () => {
    expect(renderSummary(buildTemplateData(options))).toBe(
      `Creating SDC:
  Name: hero-banner
  Title: Hero Banner
  Location: components/components
  JavaScript: false`
    );
  });

  it('renders the interactive confirmation', () => {
    expect(renderConfirmation(buildTemplateData({ ...options, js: true })))
      .toBe(`---
Component Name: hero-banner
Component Title: Hero Banner
Component Location: components/components
JavaScript: true
---`);
  });
});
