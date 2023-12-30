import { nanoid } from 'nanoid';
import { persisted } from 'svelte-persisted-store';
import { get, type Writable } from 'svelte/store';
import type { People } from './types';

export class Store {
  data = $state<People>({});
  #persistedData: Writable<People>;
  #array = $derived(Object.entries(this.data).map(([k, v]) => ({ id: k, ...v })));

  constructor(initial: People) {
    this.#persistedData = persisted('day-1-data', initial);
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

  get people() {
    return this.#array;
  }

  set(people: People) {
    this.data = people;
  }

  clear() {
    this.data = {};
  }

  addPerson(name: string) {
    this.data[nanoid()] = { name, tally: 0 };
  }

  increment(id: string) {
    return this.#updateTally(id, 1);
  }

  decrement(id: string) {
    return this.#updateTally(id, -1);
  }

  #updateTally(id: string, amount: number) {
    const person = this.data[id];
    if (!person) return;
    person.tally += amount;
  }
}
