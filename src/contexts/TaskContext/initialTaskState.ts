// Importo o tipo do estado para garantir que meu estado inicial esteja correto
import type { TaskStateModel } from "../../models/TaskStateModel";

// Estado inicial do meu app - como tudo começa quando o usuário abre pela primeira vez
export const initialTaskState: TaskStateModel = {
  tasks: [],                              // Lista vazia de tarefas
  secondsRemaining: 0,                    // Nenhum tempo restante
  formattedSecondsRemaining: "00:00",     // Timer mostra 00:00
  activeTask: null,                       // Nenhuma tarefa ativa
  currentCycle: 0,                        // Começando no ciclo 0
  config: {                               // Configurações padrão do Pomodoro
    workTime: 25,                         // 25 minutos de trabalho
    shortBreakTime: 5,                    // 5 minutos de pausa curta
    longBreakTime: 15,                    // 15 minutos de pausa longa
  },
};
