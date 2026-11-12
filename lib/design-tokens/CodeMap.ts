import { NaniError } from 'nani';
import type { Range } from 'yaml';

export interface SourceInfo {
  /** The full text of every line touched by the range. */
  source: string;
  /** The 1-based line on which the range starts. */
  startLine: number;
  /** The 1-based line on which the range ends. */
  endLine: number;
}

export class CodeMap {
  readonly source: string;

  /**
   * Maps the offset of each newline character to the 1-based number of the
   * line that follows it.
   */
  readonly positions: Map<number, number>;

  constructor(source: string) {
    const positions = new Map<number, number>();

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

  getSource(start: number, end: number): SourceInfo {
    // Look for the newline *before* `start`, so that a range beginning on a
    // newline character is attributed to the line that newline ends.
    const startLine = start > 0 ? this.source.lastIndexOf('\n', start - 1) : -1;
    const endLine = this.source.indexOf('\n', end);

    const startOffset = startLine === -1 ? 0 : startLine + 1;
    const endOffset = endLine === -1 ? this.source.length : endLine;

    const display = this.source.slice(startOffset, endOffset);

    // No preceding newline means the range starts on the first line, and no
    // following newline means it ends on the last line.
    const displayStartLine =
      startLine === -1 ? 1 : this.positions.get(startLine);
    const displayEndLine =
      endLine === -1
        ? this.positions.size + 1
        : this.positions.get(endLine)! - 1;

    return {
      source: display,
      startLine: displayStartLine ?? 1,
      endLine: displayEndLine,
    };
  }

  /**
   * Creates an error message. The passed-in string will have the string `" on line $line"`
   * appended to it, so be sure that it makes grammatical sense.
   */
  errorForRange(message: string, range: Range, cause?: Error): NaniError {
    const [start, end] = range;

    const info = this.getSource(start, end);

    return new NaniError({
      shortMessage: `${message} on line ${info.startLine}`,
      info,
      cause,
    });
  }
}
