import { Entries } from '../types';

// type safe OBject.entries
export function objectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}
