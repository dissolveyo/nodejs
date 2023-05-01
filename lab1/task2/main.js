const sortedString = (string) => {
  return string.split("").sort().join("")
}

const isAnnagram = (firstString, secondString) => {
  const firstSorted = sortedString(firstString.toLowerCase());
  const secondSorted = sortedString(secondString.toLowerCase());

  return firstSorted === secondSorted;
};
