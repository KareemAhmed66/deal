type AsyncFunction = (...args: any[]) => Promise<any>;
// express async handler
const asyncUtil = (fn: AsyncFunction) =>
  function asyncUtilWrap(...args: any[]): Promise<any> {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

export { asyncUtil };
