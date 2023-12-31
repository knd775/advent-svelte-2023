import { persisted } from 'svelte-persisted-store';
import { get, type Writable } from 'svelte/store';
import type { HeartRateData } from './types';

const DATA_SOURCE = 'https://advent.sveltesociety.dev/data/2023/day-four.json';

export class SHRM {
  data = $state<HeartRateData>({});
  #persistedData: Writable<HeartRateData>;
  #dataArray = $derived(
    Object.entries(this.data).map(([k, v]) => ({ timestamp: Number(k), heartRate: v }))
  );
  #intervalId: number | undefined = $state(undefined);
  #last30Seconds = $derived(this.#getbyTime(30000));
  #lastMinute = $derived(this.#getbyTime(60000));
  #last5Minutes = $derived(this.#getbyTime(300000));
  #allHeartRates = $derived(
    this.#dataArray.map((v) => v.heartRate).filter((v) => v !== undefined) as number[]
  );
  #min = $derived(Math.min.apply(null, this.#allHeartRates));
  #max = $derived(Math.max.apply(null, this.#allHeartRates));

  constructor() {
    this.#persistedData = persisted('day-4-data', {});
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

  get allData() {
    return this.#dataArray;
  }

  get status() {
    return !!this.#intervalId;
  }

  get stats() {
    return {
      last30SecondsAvg: parseFloat(this.#mean(this.#last30Seconds ?? 0).toFixed(2)),
      lastMinuteAvg: parseFloat(this.#mean(this.#lastMinute ?? 0).toFixed(2)),
      last5MinutesAvg: parseFloat(this.#mean(this.#last5Minutes ?? 0).toFixed(2)),
      min: this.#min,
      max: this.#max
    };
  }

  async start() {
    if (this.#intervalId) return;

    if (Object.keys(this.data).length > 0) {
      const lastEntry = this.#dataArray.slice(-1).pop();
      const lastTimestamp = lastEntry?.timestamp;
      if (lastTimestamp) {
        this.data[lastTimestamp + 1000] = undefined;
      }
    }

    this.updateData();

    this.#intervalId = setInterval(async () => {
      await this.updateData();
    }, 1000);
  }

  stop() {
    clearInterval(this.#intervalId);
    this.#intervalId = undefined;
  }

  reset() {
    this.data = {};
  }

  async getCurrentValue(): Promise<number> {
    return await fetch(DATA_SOURCE)
      .then((res) => res.json())
      .then((res) => res.heartRate);
  }

  async updateData() {
    const currentValue = await this.getCurrentValue();
    this.data[this.#now()] = currentValue;
  }

  #getbyTime(ms: number) {
    return this.#dataArray
      .filter((v) => v.timestamp > this.#now() - ms && v.heartRate !== undefined)
      .map((v) => v.heartRate) as number[];
  }

  #now() {
    return Date.now();
  }

  #mean(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
}
