import { Functor } from "./functor";

export let Array: {
  name: "Array";
  map<a, b>(xs: a[], f: (x: a) => b): b[];
} = {
  name: "Array",
  map: (xs, f) => {
    return xs.map(f);
  },
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
