import { Document, ParsedNode, Scalar } from 'yaml';

type CodeMap = import('./CodeMap');
type SassValue = import('./SassValue');

export interface ParsedSource<Contents, Strict> {
  readonly ast: Document.Parsed<Contents, Strict>;
  readonly source: string;
  readonly map: CodeMap;
}

export type GessoScalar = string | number | boolean;
export interface GessoObject {
  [key: string]: GessoScalar | GessoObject;
}
export type GessoArray = Array<GessoData>;

export type GessoData = GessoScalar | GessoObject | GessoArray;

export interface TransformedSource extends ParsedSource<ParsedNode, true> {
  readonly data: GessoData;
}

export type ScalarTransformer = (
  node: Scalar,
  doc: Document,
  map: CodeMap
) => string | number | boolean | SassValue;
