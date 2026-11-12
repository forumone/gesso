/** Coerce a caught value into an Error. */
export function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}
