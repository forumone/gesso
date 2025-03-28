function subheadingLevelTwigExtension(twigInstance) {
  twigInstance.extendFilter('subheading_level', value => {
    const lowerValue = value.toLowerCase();
    const matches = lowerValue.match(/^h(\d)$/);
    if (matches !== null && matches.length >= 2) {
      const newLevel = Math.min(Number(matches[1]) + 1, 6);
      return `h${newLevel}`;
    }
    return lowerValue;
  });
}

export default subheadingLevelTwigExtension;
