import { nanoid } from 'nanoid';
import type { PageLoad } from './$types';
import type { Gift, Gifts } from './types';

export const load: PageLoad = async ({ fetch }) => {
  const getData = async (): Promise<Gifts> =>
    await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json')
      .then((r) => r.json())
      .then((r: Gift[]) => r.reduce((a, v) => ({ ...a, [nanoid()]: v }), {}));

  return {
    list: await getData()
  };
};
