// @ts-check

"use strict";

const { NaniError } = require("nani");

const SassValue = require("./SassValue");
const cleanValue = require("./cleanValue");

function createSassMap(data, indent = 2) {
  let output = "";
  const prefix = " ".repeat(indent);

  output += "(\n";
  for (const [key, value] of Object.entries(data)) {
    output += `${prefix}${key}: `;
    switch (typeof value) {
      case "number":
      case "string":
        output += cleanValue(value);
        break;

      default:
        if (value === null || value === undefined) {
          output += "null";
        } else if (value instanceof SassValue) {
          // Don't output the `fallback' field for raw Sass.
          output += value.sass;
        } else {
          output += createSassMap(value, indent + 2);
        }

        break;
    }

    output += ",\n";
  }
  output += " ".repeat(indent - 2) + ")";

  return output;
}

/**
 *
 * @param {import('./types').GessoData} data
 */
function renderSass(data) {
  if (typeof data === "string") {
    try {
      return data;
    } catch (error) {
      throw new NaniError({
        shortMessage: "Unable to compile tokens to Sass",
        cause: error,
      });
    }
  }
  if (typeof data !== "object" || Array.isArray(data)) {
    throw new NaniError({
      shortMessage: `Expecting non-array object for rendering sass; got ${typeof data}`,
    });
  }

  try {
    return `$gesso: ${createSassMap(data.gesso)};`;
  } catch (error) {
    throw new NaniError({
      shortMessage: "Unable to compile tokens to Sass",
      cause: error,
    });
  }
}

module.exports = renderSass;
