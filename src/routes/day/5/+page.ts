import type { PageLoad } from './$types';
import type { Task } from './types';

export const load: PageLoad = async ({ fetch }) => {
  const getData = async (): Promise<Task[]> =>
    await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json').then((r) => r.json());

  return {
    list: await getData()
  };
};
