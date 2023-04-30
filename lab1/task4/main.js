const calc = (a, b, c) => a + b + c;

const wrapper = (fn) => {
  const cache = new Map();

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

cachedCalc(2,2,3);
cachedCalc(5,8,1);
cachedCalc(2,2,3);
