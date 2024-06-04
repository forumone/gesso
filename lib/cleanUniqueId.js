function cleanUniqueId(twigInstance) {
  // unique ID generator via https://stackoverflow.com/a/48593447
  twigInstance.extendFilter(
    'clean_unique_id',
    value =>
      `${value}--${(Date.now() * 1000 + Math.random() * 1000)
        .toString(16)
        .replace(/\./g, '')
        .padEnd(14, '0')}`
  );
}

export default cleanUniqueId;
