Fonts used in a `@font-face` declaration will be inlined or copied to
a `dist/fonts` directory by Webpack, depending on the size of the file.

Fonts used with services like typography.com, where the `@font-face` declaration
is **not** part of the theme SCSS should be placed in `dist/fonts/` and excluded
from the `.gitignore`.
