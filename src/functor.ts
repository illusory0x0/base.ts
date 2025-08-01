export type Instances<Instance extends Record<string, Function>> = Record<
  string,
  Instance
>;

export interface Functor {
  instances: Instances<{ map: Function }>;
}

export let Functor: Functor = {
  instances: {},
  map: (xs: object, f: any): any => {
    const xs_Functor = Functor.instances[xs.constructor.name];
    if (xs_Functor !== undefined) {
      return xs_Functor.map(xs, f);
    } else {
      throw new Error("No instance");
    }
  },
};
