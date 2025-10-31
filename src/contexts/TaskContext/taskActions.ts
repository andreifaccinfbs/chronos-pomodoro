// useReducer <- hook do React que recebe um reducer e um estado inicial
// reducer <- função que recebe o estado atual e uma ação, e retorna o novo estado
// state <- o estado atual
// action <- a ação disparada, geralmente é um objeto com type e (opcionalmente) payload
// type <- o tipo da ação, geralmente uma string (pode ser enum, constante, etc)
// payload <- os dados extras enviados junto com a action, se necessário para atualizar o estado

// Importo os tipos que vou usar nas actions
import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";

// Defino todas as ações possíveis do meu reducer como constantes
// Uso 'as const' para que o TypeScript trate como valores literais
export const TaskActionTypes = {
  START_TASK: "START_TASK",           // Iniciar uma nova tarefa
  INTERRUPT_TASK: "INTERRUPT_TASK",   // Interromper tarefa atual
  RESET_STATE: "RESET_STATE",         // Resetar todo o estado
  COUNT_DOWN: "COUNT_DOWN",           // Decrementar o timer
  COMPLETE_TASK: "COMPLETE_TASK",     // Completar tarefa atual
  CHANGE_SETTINGS: "CHANGE_SETTINGS", // Alterar configurações de tempo
} as const;

// Tipo que representa qualquer uma das ações disponíveis
export type TaskActionType =
  (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

// Actions que PRECISAM de dados extras (payload)
export type TaskActionsWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;                        // Precisa da tarefa para iniciar
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };     // Precisa dos segundos restantes
    }
  | {
      type: typeof TaskActionTypes.CHANGE_SETTINGS;
      payload: TaskStateModel["config"];         // Precisa das novas configurações
    };

// Actions que NÃO precisam de dados extras
export type TaskActionsWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE;    // Só reseta, não precisa de dados
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK; // Só interrompe, não precisa de dados
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK;  // Só completa, não precisa de dados
    };

// Tipo união que representa QUALQUER action válida do meu reducer
export type TaskActionModel =
  | TaskActionsWithPayload    // Actions com payload
  | TaskActionsWithoutPayload; // Actions sem payload
