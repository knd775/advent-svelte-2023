export type HeartRateData = {
  [key: number]: number | undefined;
};

export type HeartRateEntry = {
  timestamp: number;
  heartRate: number | undefined;
};
