module.exports = function keysort(twigInstance) {
  // JS ksort via https://stackoverflow.com/a/31102605
  twigInstance.extendFilter('keysort', value => {
    if (typeof value !== 'object') return value;
    return Object.keys(value)
      .sort()
      .reduce((obj, key) => {
        obj[key] = value[key];
        return obj;
      }, {});
  });
};
