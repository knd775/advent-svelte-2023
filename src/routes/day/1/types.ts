export type Person = {
  name: string;
  tally: number;
};

export type People = Record<string, Person>;
