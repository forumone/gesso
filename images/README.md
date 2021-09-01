# Images

Gesso comes with a Gulp task that will automatically create a sprite from SVG
images located in `images/_sprite-source-files/`. The generated SVG sprite
(`images/sprite.artifact.svg`) is used in the icon component in Pattern Lab.

The filename of the SVG image in `images/_sprite-source-files/` will become the
id used for its `<symbol>` in `images/sprite.artifact.svg`.
