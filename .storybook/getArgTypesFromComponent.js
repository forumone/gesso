function getArgTypesFromComponent(componentInfo) {
  return {
    ...Object.fromEntries(
      Object.entries(componentInfo.props.properties).map(([key, p]) => {
        const argTypeConfig = {};
        if (p.title) {
          argTypeConfig.name = p.title;
        }
        if (p.type) {
          argTypeConfig.type = p.type;
        }
        if (p.description) {
          argTypeConfig.description = p.description;
        }
        argTypeConfig.table = {};
        argTypeConfig.table.category = 'props';
        if (typeof p.default !== 'undefined') {
          argTypeConfig.table.defaultValue = {
            summary: p.default,
          };
        }
        return [key, argTypeConfig];
      })
    ),
    ...Object.fromEntries(
      Object.entries(componentInfo.slots).map(([key, p]) => {
        const argTypeConfig = {};
        if (p.title) {
          argTypeConfig.name = p.title;
        }
        if (p.description) {
          argTypeConfig.description = p.description;
        }
        argTypeConfig.control = false;
        argTypeConfig.table = {};
        argTypeConfig.table.category = 'slots';
        return [key, argTypeConfig];
      })
    ),
  };
}

export default getArgTypesFromComponent;
