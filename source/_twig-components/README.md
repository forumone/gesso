# Twig Components

Custom Twig filters and functions.

## Documentation
[Example of custom Twig functions](https://github.com/pattern-lab/patternlab-node/blob/dev/packages/edition-twig/alter-twig.php)

New files need to be added to pattern-lab-config.json. [Example](https://github.com/pattern-lab/patternlab-node/blob/dev/packages/edition-twig/patternlab-config.json#L48-L56)

Any filters and functions shared with Drupal also need to be added to the [Gesso Helper module](../../gesso_helper/src/TwigExtension/GessoExtensionLoader.php).

For more about extending Twig, see the [Twig documentation](https://twig.symfony.com/doc/2.x/advanced.html) and [Drupal examples](https://api.drupal.org/api/drupal/core%21modules%21system%21tests%21modules%21twig_extension_test%21src%21TwigExtension%21TestExtension.php/9).
