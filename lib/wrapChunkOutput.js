/**
 * Wraps non-entry chunk output in an IIFE so its "use strict" directive cannot
 * leak into files that a consumer concatenates after it.
 *
 * Webpack wraps entry chunks in an IIFE (output.iife, on by default for web
 * targets), so a chunk built entirely from ES modules emits its strict-mode
 * directive safely inside that function:
 *
 *   !function(){"use strict";var t,e={2588:function(){…
 *
 * Split and async chunks are not entry chunks. They use webpack's "array-push"
 * chunk format, which output.iife does not apply to, so the directive lands at
 * the top level of the file instead:
 *
 *   "use strict";(self.webpackChunkgesso=self.webpackChunkgesso||[]).push([[5202],{…
 *
 * A bare directive is harmless on its own but hostile to anything that
 * concatenates JS files. Drupal's asset aggregation merges library files into a
 * single script, and a leading directive becomes the prologue for the *whole*
 * concatenated script, silently putting every file after it into strict mode.
 * Drupal core ships files that assume sloppy mode, most notably
 * core/assets/vendor/loadjs/loadjs.min.js, which opens by assigning to an
 * undeclared global:
 *
 *   loadjs=function(){…}
 *
 * In strict mode that throws a ReferenceError, which aborts the rest of the
 * aggregate and takes out whatever core JS followed it. The visible symptom is
 * unrelated core behaviour going missing, e.g. Drupal.states never being defined
 * so every #states conditional field on the page stops working.
 *
 * Wrapping is preferable to stripping the directive: the chunk's modules were
 * compiled as ES modules and expect strict semantics, so keep strict mode for
 * the chunk and merely scope it to a function.
 *
 * Why processAssets and not a render hook: JavascriptModulesPlugin prepends the
 * directive *after* its renderChunk/renderContent/render hooks have run (see the
 * strictHeader ConcatSource at the end of its renderChunk method), so no
 * rendering hook can see or intercept it. processAssets is the first point at
 * which the finished chunk source is observable.
 *
 * OPTIMIZE_INLINE runs after minification (OPTIMIZE_SIZE) and source-map
 * generation (DEV_TOOLING), so Terser cannot undo the wrapper and source maps
 * stay aligned, but before OPTIMIZE_HASH, so any [contenthash] in a filename
 * still reflects the wrapped content.
 */
export default class WrapChunkOutputPlugin {
  constructor() {
    this.pluginName = 'WrapChunkOutputPlugin';
  }

  apply(compiler) {
    const { Compilation, sources } = compiler.webpack;
    const { ConcatSource } = sources;

    compiler.hooks.thisCompilation.tap(this.pluginName, compilation => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        () => {
          for (const chunk of compilation.chunks) {
            // Entry chunks carry the webpack runtime and are already wrapped by
            // output.iife. Only the bare array-push chunks need help.
            if (chunk.hasRuntime()) {
              continue;
            }
            for (const file of chunk.files) {
              if (!file.endsWith('.js')) {
                continue;
              }
              compilation.updateAsset(
                file,
                old => new ConcatSource('(function () {\n', old, '\n})();\n')
              );
            }
          }
        }
      );
    });
  }
}
