import { Document, ParsedNode, Scalar } from 'yaml';
import { SassValue } from './SassValue.cjs';

type CodeMap = import('./CodeMap.cjs');

export interface ParsedSource<
  Contents extends ParsedNode,
  Strict extends boolean
> {
  readonly ast: Document.Parsed<Contents, Strict>;
  readonly source: string;
  readonly map: CodeMap;
}

export type GessoScalar = string | number | boolean | SassValue;

export type GessoArray = Array<GessoData>;

export interface GessoObject {
  [key: string]: GessoScalar | GessoObject | GessoArray;
}

export type GessoData = GessoScalar | GessoObject | GessoArray;

export interface TransformedSource extends ParsedSource<ParsedNode, true> {
  readonly data: {
    gesso: GessoData;
  };
}

export type ScalarTransformer<
  Contents extends ParsedNode = ParsedNode,
  Strict extends boolean = true
> = (
  node: Scalar<GessoScalar>,
  doc: Document.Parsed<Contents, Strict>,
  map: CodeMap
) => GessoScalar;
