import type { PageLoad } from './$types';
import type { NamesList } from './types';

export const load = (async ({ fetch }) => {
  const getNames = () =>
    fetch('https://advent.sveltesociety.dev/data/2023/day-eleven.json')
      .then((res) => res.json())
      .then((res: NamesList) => res);

  return {
    names: await getNames()
  };
}) satisfies PageLoad;
