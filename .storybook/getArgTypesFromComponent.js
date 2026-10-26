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

function getArgTypesFromComponent(componentInfo) {
  return {
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
}

export default getArgTypesFromComponent;
