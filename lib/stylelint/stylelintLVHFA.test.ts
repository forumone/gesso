import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import stylelint from 'stylelint';
import { messages, ruleName } from './stylelintLVHFA.ts';

// Load the plugin by file path, as .stylelintrc.yml does, to prove Stylelint
// can load the TypeScript source through native type stripping.
const pluginPath = fileURLToPath(
  new URL('./stylelintLVHFA.ts', import.meta.url)
);

async function lint(code: string) {
  const result = await stylelint.lint({
    code,
    customSyntax: 'postcss-scss',
    config: {
      plugins: [pluginPath],
      rules: { [ruleName]: true },
    },
  });
  return result.results[0];
}

async function warningTexts(code: string): Promise<string[]> {
  return (await lint(code)).warnings.map(warning => warning.text);
}

const failure = messages.expected;

describe('plugin/selector-pseudo-class-lvhfa', () => {
  it('is loaded from the configured TypeScript path and flags bad order', async () => {
    const result = await lint('a:hover {}\na:link {}\n');
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].rule).toBe(ruleName);
    expect(result.warnings[0].text).toBe(failure);
  });

  it('passes correct LVHFA order across sibling rules', async () => {
    const code = `
a:link {}
a:visited {}
a:hover {}
a:focus {}
a:focus-visible {}
a:focus-within {}
a:active {}
`;
    expect(await warningTexts(code)).toEqual([]);
  });

  it('allows skipping pseudo classes', async () => {
    expect(await warningTexts('a:link {}\na:active {}\n')).toEqual([]);
  });

  it('flags out-of-order siblings', async () => {
    expect(await warningTexts('a:active {}\na:hover {}\n')).toEqual([failure]);
  });

  it('flags :focus-visible before :focus', async () => {
    expect(await warningTexts('a:focus-visible {}\na:focus {}\n')).toEqual([
      failure,
    ]);
  });

  it('checks compound selectors within a single rule', async () => {
    expect(await warningTexts('a:hover:focus {}')).toEqual([]);
    expect(await warningTexts('a:focus:hover {}')).toEqual([failure]);
  });

  it('checks selector lists within a single rule', async () => {
    expect(await warningTexts('a:hover, a:focus {}')).toEqual([]);
    expect(await warningTexts('a:focus, a:hover {}')).toEqual([failure]);
  });

  it('ignores pseudo classes that are not part of LVHFA', async () => {
    expect(
      await warningTexts('a:first-child {}\na:hover {}\na:last-child {}\n')
    ).toEqual([]);
  });

  it('is case-insensitive', async () => {
    expect(await warningTexts('a:HOVER {}\na:LINK {}\n')).toEqual([failure]);
  });

  describe('nested & selectors', () => {
    it('passes correct nested order', async () => {
      const code = `
.a {
  &:link {}
  &:visited {}
  &:hover {}
  &:focus {}
  &:active {}
}
`;
      expect(await warningTexts(code)).toEqual([]);
    });

    it('flags incorrect nested order', async () => {
      const code = `
.a {
  &:active {}
  &:hover {}
}
`;
      expect(await warningTexts(code)).toEqual([failure]);
    });

    it('does not carry order between different parents', async () => {
      const code = `
.a {
  &:active {}
}
.b {
  &:hover {}
}
`;
      expect(await warningTexts(code)).toEqual([]);
    });

    it('resets order when switching between nested pseudo and other rules', async () => {
      const code = `
.a {
  &:active {}
  .child:hover {}
}
`;
      expect(await warningTexts(code)).toEqual([]);
    });
  });

  describe(':not()', () => {
    it('ignores LVHFA pseudos inside :not()', async () => {
      expect(await warningTexts('a:hover {}\na:not(:link) {}\n')).toEqual([]);
    });

    // Regression: returning false from walkPseudos on :not stopped the whole
    // walk, so pseudos after a :not() were never recorded.
    it('still sees pseudos that come after :not()', async () => {
      expect(await warningTexts('a:not(.x):hover {}\na:link {}\n')).toEqual([
        failure,
      ]);
    });
  });

  it('reports parse errors instead of throwing', async () => {
    const result = await lint('a:hover[ {}');
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});
