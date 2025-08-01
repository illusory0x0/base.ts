import { test, expect } from "vitest";
import { Functor } from "./functor";

export { Array } from "./array";
export { Map } from "./map";
import { List } from "./list";

test("functor", () => {
  let xs = [1, 2, 3];
  let ys = new Map([
    ["apple", "100.23"],
    ["orange", "24.5"],
  ]);

  expect(Functor.map(xs, (x) => x.toString())).toMatchSnapshot();
  expect(Functor.map(ys, (x) => Number.parseFloat(x))).toMatchSnapshot();
  let zs = List.from_array([1, 2, 3, 4, 5]);

  expect(zs).toMatchSnapshot();
  expect(Functor.map(zs, (x) => x.toString())).toMatchSnapshot();
});
