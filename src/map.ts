import { Functor } from "./functor";

export let Map: {
  name: "Map";
  map<k, a, b>(xs: Map<k, a>, f: (x: a) => b): Map<k, b>;
} = {
  name: "Map",
  map: (xs, f) => {
    const ys = new globalThis.Map();
    for (const item of xs) {
      const [k, x] = item;
      ys.set(k, f(x));
    }
    return ys;
  },
};

Functor.instances[Map.name] = {
  map: Map.map,
};

declare module "./functor" {
  interface Functor {
    map<k, a, b>(xs: Map<k, a>, f: (x: a) => b): Map<k, b>;
  }
}

export type Map<k, a> = globalThis.Map<k, a>;
