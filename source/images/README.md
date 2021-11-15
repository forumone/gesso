# Images

Gesso comes with a task that will automatically create a sprite from SVG images
located in `source/images/_sprite-source-files/`. The generated SVG sprite
(`dist/images/sprite.artifact.svg`) is used in the icon component in Storybook.

The filename of the SVG image in `source/images/_sprite-source-files/` will
become the id used for its `<symbol>` in `dist/images/sprite.artifact.svg`.

Images used in CSS will be inlined or copied to a `dist/css/images` directory by
Webpack, depending on the size of the file. The image path should be
`../images/[whatever]`, regardless of the number of subdirectories your SCSS
file is nested within. The `svg-background` mixin can be used to create a
background image URL using an SVG file.
