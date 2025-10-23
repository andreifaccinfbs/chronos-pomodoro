// Preciso importar o TaskModel para usar na lista de tarefas
import type { TaskModel } from "./taskModel";

// Modelo que vai controlar todo o estado do meu app Pomodoro
export type TaskStateModel = {
  tasks: TaskModel[];                    // Lista com todas as tarefas criadas
  secondsRemaining: number;              // Quantos segundos restam no timer atual
  formattedSecondsRemaining: string;     // Tempo formatado para mostrar na tela (ex: "25:00")
  activeTask: TaskModel | null;          // Qual tarefa está rodando agora (null se nenhuma)
  currentCycle: number;                  // Em qual ciclo estou (as bolinhas que vão de 1 a 8)
  config: {                              // Configurações de tempo do Pomodoro
    workTime: number;                    // Tempo de trabalho em minutos (padrão 25)
    shortBreakTime: number;              // Tempo de pausa curta em minutos (padrão 5)
    longBreakTime: number;               // Tempo de pausa longa em minutos (padrão 15)
  };
};
