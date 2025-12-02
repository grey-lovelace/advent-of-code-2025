interface Array<T> {
  sum(this: number[]): number;
  product(this: number[]): number;
  max(this: number[]): number;
  min(this: number[]): number;
  toNums(this: string[]): number[];
  mapNonNull<T, K>(this: T[], callbackfn: (arg0: T, arg1: number) => K | null): K[];
  associateBy<T, K extends string | number>(this: T[], keyFunc: (item: T) => K): Record<K, T>
  groupedBy<T, K extends string | number | symbol>(
    this: T[],
    keyFunc: (item: T) => K
  ): Record<K, T[]>;
  groupedBy<T, K extends string | number | symbol, V>(
    this: T[],
    keyFunc: (item: T) => K,
    valFunc: (item: T) => V
  ): Record<K, V[]>;
  unique<T>(this: T[]): T[]
  count<T>(this: T[], item: T): number
  count<T>(this: T[], func: (item: T) => boolean): number
  look(this: T[], func?: (item: T) => void): T[];
  transposed<T>(this: T[][]): T[][];
  flatten<T>(this: T[][]): T[];
  windowed<T>(this: T[], windowSize: number): T[][];
  sliceInHalf<T>(this: T[]): T[][]
}
