// @ts-check

const { NaniError } = require('nani');

class CodeMap {
  /**
   * @param {string} source
   */
  constructor(source) {
    /** @type {Map.<number, number>} */
    const positions = new Map();

    let pos = 0;
    let line = 1;
    while (source.indexOf('\n', pos) !== -1) {
      pos = source.indexOf('\n', pos);
      positions.set(pos, (line += 1));
      pos += 1;
    }

    this.source = source;
    this.positions = positions;
  }

  /**
   * @param {number} start
   * @param {number} end
   */
  getSource(start, end) {
    const startLine = this.source.lastIndexOf('\n', start);
    const endLine = this.source.indexOf('\n', end);

    const startOffset = startLine === -1 ? 0 : startLine + 1;
    const endOffset = endLine === -1 ? this.source.length : endLine;

    const display = this.source.slice(startOffset, endOffset);

    const displayStartLine = this.positions.get(startLine);
    const displayEndLine = this.positions.get(endLine);

    return {
      source: display,
      startLine: displayStartLine,
      endLine: displayEndLine,
    };
  }

  /**
   * Creates an error message. The passed-in string will have the string `" on line $line"`
   * appended to it, so be sure that it makes grammatical sense.
   *
   * @param {string} message
   * @param {import ('yaml').Range} range
   * @param {Error} [cause]
   * @returns {import('nani').NaniError}
   */
  errorForRange(message, range, cause) {
    const [start, end, _nodeEnd] = range;

    const info = this.getSource(start, end);

    return new NaniError({
      shortMessage: `${message} on line ${info.startLine}`,
      info,
      cause,
    });
  }
}

module.exports = CodeMap;
