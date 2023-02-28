const setEmptyInterval = () => {
  const interval = setInterval(() => '');
  clearInterval(interval);
  return interval;
};

const setImmediateInterval = (callback: () => void, interval: number) => {
  callback();
  return setInterval(callback, interval);
};

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export { setEmptyInterval, setImmediateInterval, randomNumber };
