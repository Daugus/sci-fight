const setEmptyInterval = () => {
  const interval = setInterval(() => '');
  clearInterval(interval);
  return interval;
};

const setImmediateInterval = (callback: () => void, interval: number) => {
  callback();
  return setInterval(callback, interval);
};

export { setEmptyInterval, setImmediateInterval };
