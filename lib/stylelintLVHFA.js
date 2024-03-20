import stylelint from 'stylelint';
import selectorParser from 'postcss-selector-parser';

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
 * Imported from https://github.com/stylelint/stylelint/blob/main/lib/utils/parseSelector.js
 *
 * @param {string} selector
 * @param {import('stylelint').PostcssResult} result
 * @param {import('postcss').Node} node
 * @param {(root: import('postcss-selector-parser').Root) => void} callback
 * @see https://github.com/stylelint/stylelint/blob/main/lib/utils/parseSelector.js
 * @returns {string | undefined}
 */
function parseSelector(selector, result, node, callback) {
  try {
    return selectorParser(callback).processSync(selector);
  } catch (err) {
    result.warn(`Cannot parse selector (${err})`, {
      node,
      stylelintType: 'parseError',
    });

    return undefined;
  }
}

const plugin = stylelint.createPlugin(ruleName, primaryOption => {
  return function (postCssRoot, postCssResult) {
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

    let selectorOrder = [];
    let parent = postCssRoot;
    let nestedPseudo = false;

    postCssRoot.walkRules(rule => {
      const currentRuleIsNestedPseudo = rule.selector.indexOf('&:') === 0;
      if (
        !rule.parent ||
        rule.parent !== parent ||
        nestedPseudo !== currentRuleIsNestedPseudo
      ) {
        selectorOrder = [];
        parent = rule.parent;
      }
      nestedPseudo = currentRuleIsNestedPseudo;
      parseSelector(rule.selector, postCssResult, rule, fullSelector => {
        if (
          fullSelector.type === 'pseudo' &&
          correctOrder.indexOf(fullSelector.value) !== -1 &&
          selectorOrder[selectorOrder.length - 1] !== fullSelector.value
        ) {
          selectorOrder.push(fullSelector.value);
        } else {
          fullSelector.walkPseudos(pseudo => {
            if (pseudo.value === ':not') {
              return false;
            }
            if (
              correctOrder.indexOf(pseudo.value) !== -1 &&
              selectorOrder[selectorOrder.length - 1] !== pseudo.value
            ) {
              selectorOrder.push(pseudo.value);
            }
            return true;
          });
        }
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
});
export default plugin;
export { ruleName, messages };
