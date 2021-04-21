# Macros

Twig macros.

## Documentation
[Twig documentation on macros](https://twig.symfony.com/doc/2.x/tags/macro.html)

Macros can be imported into pattern files using the namespace `@macros`.
Example:
```
{% import '@macros/gesso.macro.twig' as macros %}
{% set nav_content = macros.sample_content('Nav Layout Content') %}
```
