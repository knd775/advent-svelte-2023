import { nanoid } from 'nanoid';
import type { PageLoad } from './$types';
import type { People, Person } from './types';

export const load: PageLoad = async ({ fetch }) => {
  const getData = async () =>
    await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')
      .then((r) => r.json())
      .then((r: Person[]) => r.reduce((a, v) => ({ ...a, [nanoid()]: v }), {}));

  return {
    list: (await getData()) as People
  };
};
