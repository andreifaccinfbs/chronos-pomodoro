import type { TaskModel } from "./taskModel";

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number; // sao as bolinahs q vao de 1 a 8
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
