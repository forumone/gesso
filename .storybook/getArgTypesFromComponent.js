function normalizeStorybookType(type) {
  const types = (Array.isArray(type) ? type : [type]).filter(
    t => t && t !== 'null'
  );
  const primary = types[0];
  if (!primary || primary === 'object' || primary === 'array') {
    return undefined;
  }
  if (primary === 'integer') {
    return 'number';
  }
  if (typeof primary === 'string' && primary.includes('\\')) {
    return undefined;
  }
  return primary;
}

/**
 * Builds argTypes from a component's YAML definition.
 *
 * Storybook shows a control for every arg, so args that are only passed to
 * the template (e.g. global data) can be hidden with the options below. These
 * use machine names (arg keys), not prop titles.
 *
 * @param {object} componentInfo - Parsed *.component.yml.
 * @param {object} [options]
 * @param {object} [options.hideArgs] - Extra args (e.g. global data) to pass
 *   to the template without showing controls. Keys that are props or slots in
 *   the component YAML stay visible unless listed in `hide`.
 * @param {string[]} [options.hide] - Keys to hide, including props/slots
 *   defined in the component YAML (e.g. image_path).
 * @param {string[]} [options.show] - Keys in `hideArgs` to keep visible.
 */
function getArgTypesFromComponent(
  componentInfo,
  { hideArgs = {}, hide = [], show = [] } = {}
) {
  const componentKeys = new Set([
    ...Object.keys(componentInfo.props?.properties || {}),
    ...Object.keys(componentInfo.slots || {}),
  ]);
  const argTypes = {
    ...Object.fromEntries(
      Object.entries(componentInfo.props?.properties || {}).map(([key, p]) => {
        const argTypeConfig = {};
        if (p.title) {
          argTypeConfig.name = p.title;
        }
        const storybookType = normalizeStorybookType(p.type);
        if (storybookType) {
          argTypeConfig.type = storybookType;
        } else {
          argTypeConfig.control = false;
        }
        if (p.description) {
          argTypeConfig.description = p.description;
        }
        argTypeConfig.table = { category: 'props' };
        if (typeof p.default !== 'undefined') {
          argTypeConfig.table.defaultValue = {
            summary: String(p.default),
          };
        }
        if (p.enum) {
          argTypeConfig.options = p.enum;
          argTypeConfig.control = { type: 'select' };
        }
        return [key, argTypeConfig];
      })
    ),
    ...Object.fromEntries(
      Object.entries(componentInfo.slots || {}).map(([key, p]) => {
        const argTypeConfig = {
          control: false,
          table: { category: 'slots' },
        };
        if (p.title) {
          argTypeConfig.name = p.title;
        }
        if (p.description) {
          argTypeConfig.description = p.description;
        }
        return [key, argTypeConfig];
      })
    ),
  };

  const hiddenKeys = new Set([
    ...Object.keys(hideArgs).filter(
      key => !componentKeys.has(key) && !show.includes(key)
    ),
    ...hide,
  ]);
  hiddenKeys.forEach(key => {
    argTypes[key] = {
      ...argTypes[key],
      table: { ...argTypes[key]?.table, disable: true },
    };
  });

  return argTypes;
}

export default getArgTypesFromComponent;
