type DeepCopyType = <T>(obj: T) => T;

const testObject = {
  x: 1,
  y: 2,
}

const deepCopy: DeepCopyType = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

console.log(testObject === deepCopy(testObject));
