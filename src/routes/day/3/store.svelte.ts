import { persisted } from 'svelte-persisted-store';
import { get, type Writable } from 'svelte/store';
import type { Gifts } from './types';

export class Store {
  data = $state<Gifts>({});
  #persistedData: Writable<Gifts>;
  #unloadedArray = $derived(
    Object.entries(this.data)
      .map(([k, v]) => ({ id: k, ...v }))
      .filter((v) => !v.loaded)
      .sort((a, b) => b.weight - a.weight)
  );
  #loadedArray = $derived(
    Object.entries(this.data)
      .map(([k, v]) => ({ id: k, ...v }))
      .filter((v) => v.loaded)
      .sort((a, b) => b.weight - a.weight)
  );

  constructor(initial: Gifts) {
    this.#persistedData = persisted('day-3-data', initial);
    this.data = get(this.#persistedData);

    $effect(() => {
      this.#persistedData.set(this.data);
    });

    // Sync data with persisted store to keep multiple windows in sync
    this.#persistedData.subscribe((v) => {
      // Prevent infinite loop
      if (v === this.data) return;
      this.data = v;
    });
  }

  get loaded() {
    return this.#loadedArray;
  }

  get unloaded() {
    return this.#unloadedArray;
  }

  get currentWeight() {
    return Object.values(this.#loadedArray).reduce((acc, v) => acc + v.weight, 0);
  }

  load(id: string) {
    const gift = this.data[id];
    if (!gift) return;

    gift.loaded = true;
  }

  unload(id: string) {
    const gift = this.data[id];
    if (!gift) return;

    gift.loaded = false;
  }
}
