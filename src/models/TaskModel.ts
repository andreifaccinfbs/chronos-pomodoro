// Preciso do TaskStateModel para pegar os tipos de configuração
import type { TaskStateModel } from "./TaskStateModel";

// Modelo que define como uma tarefa vai ser estruturada no meu app
export type TaskModel = {
  id: string; // ID único para cada tarefa
  name: string; // Nome que o usuário vai dar para a tarefa
  duration: number; // Quantos minutos a tarefa vai durar
  startDate: number; // Quando a tarefa começou (timestamp)
  completeDate: number; // Quando a tarefa foi finalizada (timestamp)
  interruptDate: number | null; // Se a tarefa foi interrompida, quando foi (pode ser null)
  type: keyof TaskStateModel["config"]; // Que tipo de tarefa é (pomodoro, pausa curta, pausa longa, etc)
};
