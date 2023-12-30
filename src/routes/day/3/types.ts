export type Gift = {
  name: string;
  weight: number;
  loaded: boolean;
};

export type Gifts = Record<string, Gift>;
