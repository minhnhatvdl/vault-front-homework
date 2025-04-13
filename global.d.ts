import '@types/jest';

declare global {
  namespace jest {
    function mock(moduleName: string, factory?: unknown): jest.Mock;
    function unmock(moduleName: string): void;
    function clearAllMocks(): void;
    function resetAllMocks(): void;
    function restoreAllMocks(): void;
    function fn<T = unknown>(implementation?: (...args: unknown[]) => T): jest.Mock<T>;
    function spyOn(object: unknown, methodName: string): jest.SpyInstance;
    function useFakeTimers(): void;
    function useRealTimers(): void;
    function advanceTimersByTime(msToRun: number): void;
    function setTimeout(timeout: number): void;
  }

  const expect: jest.Expect;

  interface Window {
    fs: {
      readFile: (path: string, options?: { encoding?: string }) => Promise<Uint8Array | string>;
    };
  }
}

export {};
