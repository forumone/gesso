import * as YAML from 'yaml';

type CodeMap = import('./CodeMap');

export interface ParsedSource {
  readonly path: string;
  readonly source: string;
  readonly ast: YAML.ast.Document;
  readonly map: CodeMap;
}

export type GessoScalar = string | number | boolean;
export interface GessoObject {
  [key: string]: GessoScalar | GessoObject;
}
export type GessoArray = Array<GessoData>;

export type GessoData = GessoScalar | GessoObject | GessoArray;

export interface TransformedSource extends ParsedSource {
  readonly data: GessoData;
}

export type ScalarTransformer = (
  node: YAML.ast.ScalarNode,
  doc: YAML.ast.Document,
  map: CodeMap,
) => string | number | boolean;
