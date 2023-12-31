type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

export type Task = {
  elf: string;
  task: TaskType;
  minutesTaken: number;
  date: string;
};
