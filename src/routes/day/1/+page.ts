import type { PageLoad } from './$types';
import type { Person } from './types';

export const load: PageLoad = async ({ fetch }) => {
  const getData = async () =>
    await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json').then((r) => r.json());
  // .then((r: Person[]) => Object.assign({}, r));

  return {
    list: (await getData()) as Person[]
  };
};
