// Require all SVGs in the sprite so that they are processed through
// webpack.
function importAll(r) {
  r.keys().forEach(key => {
    console.log(key);
    r(key);
  });
}
importAll(require.context('./', false, /\.svg$/));
