function cleanString(stringToClean) {
  return stringToClean.toLowerCase().replace(/ /g, '-');
}

export default cleanString;
