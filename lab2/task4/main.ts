type WrappedFunction = (...numbers: number[]) => unknown;
type WrapperType = (fn: WrappedFunction) => WrappedFunction;

const calc: WrappedFunction = (a, b, c) => a + b + c;

const wrapper: WrapperType = (fn) => {
  const cache = new Map<string, unknown>();

  return (...args) => {
    const stringifiedArgs = JSON.stringify(args);
    const valueByKey = cache.get(stringifiedArgs);
    const fnResult = fn(...args);

    if (!valueByKey) {
      cache.set(stringifiedArgs, fnResult);
    }

    return valueByKey ? `${valueByKey} from cache` : `${fnResult} calculated`;
  };
};

const cachedCalc = wrapper(calc);

console.log(
cachedCalc(2,2,3),
cachedCalc(5,8,1), 
cachedCalc(2,2,3)
);