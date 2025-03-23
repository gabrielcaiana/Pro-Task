export {};

declare global {
  interface Bus {
    $on(event: string, callback: (...args: any[]) => void): void;
    $emit(event: string, ...args: any[]): void;
  }
}
