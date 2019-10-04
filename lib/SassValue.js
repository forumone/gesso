// @ts-check

const { createNode } = require('yaml');
const { parseMap, stringifyString } = require('yaml/util');

/**
 * Class to represent a raw Sass value. This class acts as a signifier that the token
 * lookup process should be bypassed. The internal representation uses two slots:
 * 1. `sass`, which is a raw Sass string.
 * 2. `fallback`, an optional fallback token. This is only needed when generating output
 *    in a non-Sass environment (e.g., Pattern Lab swatches).
 *
 * A value of this class can be constructed in the design tokens file by using the `!sass`
 * tag. There are two accepted syntaxes:
 * 1. Single-value shorthand. This is used primarily for lookups when the developer knows
 *    that no design token will be needed in, e.g., Pattern Lab.
 *
 *    ```yaml
 *    foo: !sass some-function(foo,bar)
 *    ```
 *
 * 2. Object notation. This uses a map with `sass` and `fallback` keys. The `sass` key is
 *    injected raw into the stylesheet code, and `fallback` is used as mentioned above.
 *
 *    ```yaml
 *    foo: !sass
 *      sass: some-function(foo,bar)
 *      fallback: '#f00'
 *    ```
 */
class SassValue {
  /**
   * @param sass The raw Sass string to inject.
   * @param [fallback] The fallback value to output for other environments.
   */
  constructor(sass, fallback) {
    this.sass = sass;
    this.fallback = fallback;
  }
}

// YAML custom tag for the SassValue class (cf. https://eemeli.org/yaml/#custom-data-types)
// Do NOT use this tag on output; Pattern Lab uses YAML.safeLoad() which throws exceptions
// when it encounters unknown tags. We instead rely on the fact that the yaml package
// serializes class instances as YAML maps - this gives us the ['sass' => ..., 'fallback' => ...]
// structure we need in Twig.
const tag = {
  identify: value => value instanceof SassValue,
  tag: '!sass',
  resolve(doc, cst) {
    // This is a two-value YAML document: { sass, fallback } - deserialize into a full
    // SassValue instance.
    if (cst.type === 'MAP') {
      const map = parseMap(doc, cst);
      return new SassValue(map.get('sass'), map.get('fallback'));
    }

    // We assume this is a scalar - this means that if you say !sass [foo], the results
    // won't quite be what you expect.
    return new SassValue(cst.strValue);
  },
};

SassValue.tag = tag;

module.exports = SassValue;
