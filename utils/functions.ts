const setImmediateInterval = (callback: () => void, interval: number) => {
  callback();
  return setInterval(callback, interval);
};

export { setImmediateInterval };
