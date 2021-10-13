// Require all SVGs in the sprite so that they are processed through
// webpack.

require.context('.', true, /\.svg$/);
