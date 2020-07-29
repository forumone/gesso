const stylelint = require('stylelint');
const parseSelector = require('stylelint/lib/utils/parseSelector');

const ruleName = 'plugin/selector-pseudo-class-lvhfa';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: 'Expected pseudo class selectors to follow LVHFA order.',
});
const correctOrder = [':link', ':visited', ':hover', ':focus', ':active'];

const plugin = stylelint.createPlugin(ruleName, primaryOption => {
  return function(postCssRoot, postCssResult) {
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

    postCssRoot.walkRules(rule => {
      if (!rule.parent || rule.parent !== parent) {
        selectorOrder = [];
        parent = rule.parent;
      }
      parseSelector(rule.selector, postCssResult, rule, fullSelector => {
        if (
          fullSelector.type === 'pseudo' &&
          correctOrder.indexOf(fullSelector.value) !== -1
        ) {
          selectorOrder.push(fullSelector.value);
        } else {
          fullSelector.walkPseudos(pseudo => {
            if (correctOrder.indexOf(pseudo.value) !== -1) {
              selectorOrder.push(pseudo.value);
            }
          });
        }
      });
      if (selectorOrder.length > 0) {
        const testOrder = correctOrder.filter(pseudo =>
          selectorOrder.includes(pseudo)
        );
        const finalResult = testOrder.every(
          (pseudo, index) => pseudo === selectorOrder[index]
        );
        if (!finalResult) {
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
module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
