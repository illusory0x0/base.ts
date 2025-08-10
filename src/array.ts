import { Functor } from "./functor";

export let map = <a, b>(xs: a[], f: (x: a) => b): b[] => {
  return xs.map(f);
};

export let Array: {
  readonly name: "Array";
  map<a, b>(xs: a[], f: (x: a) => b): b[];
} = {
  name: "Array",
  map,
};

export type Array<T> = globalThis.Array<T>;

Functor.instances[Array.name] = {
  map: Array.map,
};

declare module "./functor" {
  interface Functor {
    map<a, b>(xs: a[], f: (x: a) => b): b[];
  }
}
