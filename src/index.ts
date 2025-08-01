import { Functor } from "./functor";

export { type Array } from "./array";
export { type Map } from "./map";

let xs = [1, 2, 3];
let ys = new Map([
  ["apple", "100.23"],
  ["orange", "24.5"],
]);


console.log(Functor.map(xs, (x) => x.toString()));
console.log(Functor.map(ys, (x) => Number.parseFloat(x)));

