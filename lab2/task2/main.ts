type IsAnnagramType = (
  string1: string, 
  string2: string
) => boolean;

const getSortedString = (string: string): string => {
  return string.split("").sort().join("")
}

const isAnnagram: IsAnnagramType = (firstString, secondString) => {
  const firstSorted = getSortedString(firstString.toLowerCase());
  const secondSorted = getSortedString(secondString.toLowerCase());

  return firstSorted === secondSorted;
};

console.log(isAnnagram("nodejs", "jsnode"));
console.log(isAnnagram("nodejs", "nodeJSX"));
