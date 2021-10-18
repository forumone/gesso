module.exports = function keysort(twigInstance) {
  // JS ksort via https://stackoverflow.com/a/31102605
  twigInstance.extendFilter('keysort', value => {
    if (typeof value !== 'object') return value;
    return Object.keys(value)
      .sort((a, b) => {
        let keyA = a;
        let keyB = b;
        if (!Number.isNaN(a) && !Number.isNaN(b)) {
          keyA = Number(a);
          keyB = Number(b);
        }
        if (keyA > keyB) {
          return 1;
        }
        return keyA < keyB ? -1 : 0;
      })
      .reduce((obj, key) => {
        let sortedKey = key;
        // Force keys to be strings.
        if (!Number.isNaN(key)) {
          sortedKey = `${key} `;
        }
        obj[sortedKey] = value[key];
        return obj;
      }, {});
  });
};
