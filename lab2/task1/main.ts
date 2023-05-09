type CalculateType = (number?: number) => number | CalculateType;
type AddType = (initValue: number) => Function;

const addWithTS: AddType = (intialValue) => {
  let sum = intialValue;

  const calculate: CalculateType = (number) => {
      sum += number || 0;

    return number ? calculate : sum;
  };

  return calculate;
};

console.log(addWithTS(1)(2)(3)(4)());
