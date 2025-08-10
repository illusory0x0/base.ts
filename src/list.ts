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

let constructor: {
  readonly name: "List";
} = {
  name: "List",
};

export let Nil: { tag: "Nil" } & Constructor<"List"> = {
  tag: "Nil",
  constructor,
};

export let Cons = <a>(x: a, xs: List<a>): List<a> => {
  return {
    tag: "Cons",
    constructor,
    head: x,
    tail: xs,
  };
};

export let map = <a, b>(xs: List<a>, f: (x: a) => b): List<b> => {
  if (xs.tag === "Nil") {
    return Nil;
  } else {
    return Cons(f(xs.head), List.map(xs.tail, f));
  }
};

export let from_array = <a>(xs: a[]): List<a> => {
  let result: List<a> = Nil;
  for (let i = 0; i !== xs.length; i++) {
    let e = xs[xs.length - 1 - i] as a;
    result = Cons(e, result);
  }
  return result;
};
export let List: {
  readonly name: "List";
  readonly map: <a, b>(xs: List<a>, f: (x: a) => b) => List<b>;
  readonly from_array: <a>(xs: a[]) => List<a>;
  readonly Nil: { tag: "Nil" } & Constructor<"List">;
  readonly Cons: <a>(x: a, xs: List<a>) => List<a>;
} = {
  Nil,
  Cons,
  name: "List",
  map,
  from_array,
};

declare module "./functor" {
  interface Functor {
    map<a, b>(xs: List<a>, f: (x: a) => b): List<b>;
  }
}

Functor.instances[List.name] = {
  map: List.map,
};
