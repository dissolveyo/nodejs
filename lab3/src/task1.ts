const runSequent = (arr: Array<unknown>, callback: Function): Array<unknown> => {
  return arr.map((item, index) => callback(item, index));
}

const arr: Array<string> = ["one", "two", "three"];

const resultsArray  = async () => {
  const results = await runSequent(arr, (item: string, index: number) =>
    Promise.resolve({
      item,
      index,
    })
  );

  return Promise.all(results);
}

resultsArray().then(data => {
  console.log(data);
});
