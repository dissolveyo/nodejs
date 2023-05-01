const add = (intialValue = 0) => {
  let sum = intialValue;

  const calculate = (number) => {
    sum += number || 0;

    return number ? calculate : sum;
  };

  return intialValue ? calculate : intialValue;
};