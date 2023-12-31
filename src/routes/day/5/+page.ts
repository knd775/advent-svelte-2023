import { nanoid } from 'nanoid';
import type { PageLoad } from './$types';
import type { Task, Tasks } from './types';

export const load: PageLoad = async ({ fetch }) => {
  const getData = async (): Promise<Tasks> =>
    await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
      .then((r) => r.json())
      .then((r: Task[]) => r.reduce((a, v) => ({ ...a, [nanoid()]: v }), {}));

  return {
    list: await getData()
  };
};
