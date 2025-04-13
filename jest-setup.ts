import '@testing-library/jest-dom';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      jest: typeof jest;
    }
  }
}

global.jest = jest;

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
  return 0;
};

global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
