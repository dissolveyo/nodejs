const arrayChangeDelete = (arr: Array<unknown>, callback: Function): Array<unknown> => {
  const result: Array<unknown> = [];

  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      result.push(...arr.splice(i, 1))
    }
  }

  return result;
}

const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item: number) => item % 2 === 0);

console.log(array);
console.log(deletedElements);
