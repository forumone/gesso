# Sass

[Sass](http://sass-lang.com/) is a scripting language that gets compiled into CSS. This theme uses the SCSS syntax, so any valid CSS you write is also valid SCSS. [Variables](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_), [Nesting](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#css_extensions), and [Mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) are just a few of Sass’s powerful features.

## File Structure

This Sass file structure uses many of the ideas discussed in Jonathan Snook’s [SMACSS](http://smacss.com) and Harry Robert’s [itcss](http://itcss.io), which provide a starting point for building modular, scalable CSS.

It’s recommended that you follow the [Drupal 8 CSS architecture guidelines](https://drupal.org/node/1887918).

### styles.scss
This file shouldn’t contain any CSS code. It only serves to combine the CSS contained in other Sass partials through @import directives.

### partials/_global.scss
Global variables, functions, and mixins that should be imported into all scss files.

### partials/_base.scss
CSS reset based on [Normalize.css](http://necolas.github.io/normalize.css) and default styles for HTML elements. Custom font declarations and extendables go here as well.

### partials/_module-tweaks.scss
Minor tweaks for styles provided by Drupal modules.

### partials/_layout.scss
The layout of major regions that components will be placed into.

### partials/_components.scss
Discrete, reusable UI components. (Think SMACSS “modules”.) The majority of your styles should be here.

### partials/_utilities.scss
Utility classes that aren’t components themselves, such as clearfix.

### partials/_quick-fixes.scss
Deadlines happen, so put your quick fixes here. Hopefully there will be time later to move/re-factor these styles into their proper place.

## SMACSS

You should try to abstract your components as much as possible to promote reuse throughout the theme. Components should be flexible enough to respond to any width and should never rely on context (e.g., .sidebar-first .component) for styling. This allows components to be placed anywhere in the markup with no risk of them breaking.

If you find you need to change the look of a component depending on its context, you should avoid using context based classes at all costs. Instead, it is better to add another modifier class to the component to alter the styling.

Sub-components are the individual parts that make up a component. As a general rule, adding a class to target a sub-component is a much better option than using descendant selectors or element selectors. In many cases sub-components can be made more reusable by making them components in their own right, so they can then be used within other components.
