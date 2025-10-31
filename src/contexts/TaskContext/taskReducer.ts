// Tipos e utilidades que vou usar no reducer
import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { initialTaskState } from "./initialTaskState";
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

// Função reducer que gerencia todas as mudanças de estado
// Recebe o estado atual e uma ação, retorna o novo estado
export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel {
  // Switch para tratar cada tipo de ação
  switch (action.type) {
    // Quando uma nova tarefa é iniciada
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;                    // Pego a tarefa do payload
      const nextCycle = getNextCycle(state.currentCycle); // Calculo próximo ciclo
      const secondsRemaining = newTask.duration * 60;    // Converto minutos para segundos

      return {
        ...state,                                         // Mantenho tudo do estado atual
        activeTask: newTask,                              // Defino a nova tarefa como ativa
        currentCycle: nextCycle,                          // Atualizo o ciclo
        secondsRemaining,                                 // Defino os segundos restantes
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining), // Formato para exibição
        tasks: [...state.tasks, newTask],                 // Adiciono a tarefa na lista
      };
    }
    
    // Quando uma tarefa é interrompida
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,                    // Limpo a tarefa ativa
        secondsRemaining: 0,                 // Zero o timer
        formattedSecondsRemaining: "00:00",  // Zero o timer formatado
        tasks: state.tasks.map((task) => {  // Atualizo a lista de tarefas
          // Se é a tarefa que estava ativa, marco como interrompida
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() }; // Salvo quando foi interrompida
          }
          return task; // Outras tarefas ficam iguais
        }),
      };
    }
    
    // Quando uma tarefa é completada
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,                    // Limpo a tarefa ativa
        secondsRemaining: 0,                 // Zero o timer
        formattedSecondsRemaining: "00:00",  // Zero o timer formatado
        tasks: state.tasks.map((task) => {  // Atualizo a lista de tarefas
          // Se é a tarefa que estava ativa, marco como completada
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() }; // Salvo quando foi completada
          }
          return task; // Outras tarefas ficam iguais
        }),
      };
    }
    
    // Quando quero resetar tudo para o estado inicial
    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState }; // Volto para o estado inicial
    }
    
    // Quando o timer faz countdown (a cada segundo)
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining, // Atualizo segundos restantes
        formattedSecondsRemaining: formatSecondsToMinutes( // Formato para exibição
          action.payload.secondsRemaining
        ),
      };
    }
    
    // Quando as configurações são alteradas
    case TaskActionTypes.CHANGE_SETTINGS: {
      return { ...state, config: { ...action.payload } }; // Atualizo as configurações
    }
  }

  // Se chegou aqui, a ação não foi reconhecida - retorno o estado sem mudanças
  return state;
}
