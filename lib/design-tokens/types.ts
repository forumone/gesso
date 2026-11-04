import type { Document, ParsedNode, Scalar } from 'yaml';
import type { CodeMap } from './CodeMap.ts';
import type { SassValue } from './SassValue.ts';

export interface ParsedSource<
  Contents extends ParsedNode = ParsedNode,
  Strict extends boolean = true,
> {
  readonly ast: Document.Parsed<Contents, Strict>;
  readonly source: string;
  readonly map: CodeMap;
}

export type GessoScalar = string | number | boolean | null | SassValue;

export type GessoArray = GessoData[];

export interface GessoObject {
  [key: string]: GessoScalar | GessoObject | GessoArray;
}

export type GessoData = GessoScalar | GessoObject | GessoArray;

export interface TransformedSource extends ParsedSource<ParsedNode, true> {
  readonly data: {
    gesso: GessoObject;
  };
}

export type ScalarTransformer<
  Contents extends ParsedNode = ParsedNode,
  Strict extends boolean = true,
> = (
  node: Scalar<GessoScalar>,
  doc: Document.Parsed<Contents, Strict>,
  map: CodeMap
) => GessoScalar;
