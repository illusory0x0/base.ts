import { Functor } from "./functor";
type Constructor<name extends string> = {
  readonly constructor: {
    readonly name: name;
  };
};

export type Nil = Constructor<"List"> & { readonly tag: "Nil" };

export type Cons<a> = Constructor<"List"> & {
  readonly tag: "Cons";
  readonly head: a;
  readonly tail: List<a>;
};

export type List<a> = Nil | Cons<a>;

export let Nil: { tag: "Nil" } & Constructor<"List"> = {
  tag: "Nil",
  constructor: {
    name: "List",
  },
};

export let Cons = <a>(x: a, xs: List<a>): List<a> => {
  return {
    tag: "Cons",
    constructor: {
      name: "List",
    },
    head: x,
    tail: xs,
  };
};

export let List: {
  readonly name: "List";
  readonly map: <a, b>(xs: List<a>, f: (x: a) => b) => List<b>;
  readonly from_array: <a>(xs: a[]) => List<a>;
} = {
  name: "List",
  map: (xs, f) => {
    if (xs.tag === "Nil") {
      return Nil;
    } else {
      return Cons(f(xs.head), List.map(xs.tail, f));
    }
  },
  from_array: <a>(xs: a[]) => {
    let result: List<a> = Nil;
    for (let i = 0; i !== xs.length; i++) {
      let e = xs[xs.length - 1 - i] as a;
      result = Cons(e, result);
    }
    return result;
  },
};

declare module "./functor" {
  interface Functor {
    map<a, b>(xs: List<a>, f: (x: a) => b): List<b>;
  }
}

Functor.instances[List.name] = {
  map: List.map,
};
