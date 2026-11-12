import stylelint, {
  type PostcssResult,
  type Rule as StylelintRule,
} from 'stylelint';
import selectorParser from 'postcss-selector-parser';
import type { Node, Rule } from 'postcss';

const ruleName = 'plugin/selector-pseudo-class-lvhfa';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: 'Expected pseudo class selectors to follow LVHFA order.',
});
const correctOrder = [
  ':link',
  ':visited',
  ':hover',
  ':focus',
  ':focus-visible',
  ':focus-within',
  ':active',
];

/**
 * Adapted from Stylelint's internal parseSelector utility.
 *
 * @see https://github.com/stylelint/stylelint/blob/main/lib/utils/parseSelector.js
 */
function parseSelector(
  selector: string,
  result: PostcssResult,
  node: Node,
  callback: (root: selectorParser.Root) => void
): void {
  try {
    selectorParser(callback).processSync(selector);
  } catch (err) {
    result.warn(`Cannot parse selector (${String(err)})`, {
      node,
      stylelintType: 'parseError',
    });
  }
}

/**
 * Whether a pseudo is inside the argument of a `:not()` (or nested in one).
 */
function isInsideNot(pseudo: selectorParser.Pseudo): boolean {
  let ancestor = pseudo.parent?.parent;
  while (ancestor) {
    if (ancestor.type === 'pseudo' && ancestor.value.toLowerCase() === ':not') {
      return true;
    }
    ancestor = ancestor.parent?.parent;
  }
  return false;
}

const lvhfaRule: StylelintRule = (primaryOption: unknown) =>
  function (postCssRoot, postCssResult) {
    const validOptions = stylelint.utils.validateOptions(
      postCssResult,
      ruleName,
      {
        actual: primaryOption,
      }
    );

    if (!validOptions) {
      return;
    }

    let selectorOrder: string[] = [];
    let parent: Rule['parent'] = postCssRoot;
    let nestedPseudo = false;

    postCssRoot.walkRules(rule => {
      const currentRuleIsNestedPseudo = rule.selector.startsWith('&:');
      if (
        !rule.parent ||
        rule.parent !== parent ||
        nestedPseudo !== currentRuleIsNestedPseudo
      ) {
        selectorOrder = [];
        ({ parent } = rule);
      }
      nestedPseudo = currentRuleIsNestedPseudo;
      parseSelector(rule.selector, postCssResult, rule, fullSelector => {
        fullSelector.walkPseudos(pseudo => {
          const value = pseudo.value.toLowerCase();
          if (
            !isInsideNot(pseudo) &&
            correctOrder.includes(value) &&
            selectorOrder[selectorOrder.length - 1] !== value
          ) {
            selectorOrder.push(value);
          }
        });
      });
      if (selectorOrder.length > 0) {
        const testOrder = correctOrder.filter(pseudo =>
          selectorOrder.includes(pseudo)
        );
        const finalResult = testOrder.every((pseudo, index) => {
          return pseudo === selectorOrder[index];
        });
        if (!finalResult || selectorOrder.length > testOrder.length) {
          stylelint.utils.report({
            message: messages.expected,
            node: rule,
            result: postCssResult,
            ruleName,
          });
        }
      }
    });
  };
lvhfaRule.ruleName = ruleName;
lvhfaRule.messages = messages;

const plugin = stylelint.createPlugin(ruleName, lvhfaRule);
export default plugin;
export { ruleName, messages };
