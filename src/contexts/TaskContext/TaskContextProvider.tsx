// Hooks do React que vou usar
import { useEffect, useReducer, useRef } from "react";
// Arquivos do meu contexto
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TaskActionTypes } from "./taskActions";
// Worker para o timer e utilidades
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

// Props do Provider - só recebe os filhos para renderizar
type TaskContextProviderProps = {
  children: React.ReactNode;
};

// Componente que fornece o contexto para toda a aplicação
export function TaskContextProvider({ children }: TaskContextProviderProps) {
  // useReducer para gerenciar estado complexo + função de inicialização
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    // Tento recuperar estado salvo do localStorage
    const storageState = localStorage.getItem("state") || null;
    if (storageState === null) return initialTaskState; // Se não tem nada salvo, uso inicial
    
    // Se tem estado salvo, faço parse e reseto algumas coisas
    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;
    return {
      ...parsedStorageState,              // Mantenho tudo que estava salvo
      activeTask: null,                   // Mas reseto tarefa ativa
      secondsRemaining: 0,                // Reseto timer
      formattedSecondsRemaining: "00:00", // Reseto timer formatado
    };
  });
  
  // Ref para guardar a função de tocar o beep
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  // Pego a instância do worker (singleton)
  const worker = TimerWorkerManager.getInstance();

  // Escuto mensagens do worker (quando o timer atualiza)
  worker.onmessage((e) => {
    const countDownSeconds = e.data; // Segundos restantes vindos do worker

    // Se chegou a 0, tarefa terminou
    if (countDownSeconds <= 0) {
      // Toco o beep se tiver carregado
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null; // Limpo a referência
      }
      // Disparo ação de completar tarefa
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate(); // Paro o worker
    } else {
      // Se ainda tem tempo, atualizo o contador
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  // Effect que roda sempre que o estado muda
  useEffect(() => {
    // Salvo o estado no localStorage
    localStorage.setItem("state", JSON.stringify(state));

    // Se não tem tarefa ativa, paro o worker
    if (!state.activeTask) {
      worker.terminate();
    }

    // Atualizo o título da página com o timer
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    // Envio o estado atual para o worker
    worker.postMessage(state);
  }, [worker, state]);

  // Effect para gerenciar o áudio do beep
  useEffect(() => {
    // Se tem tarefa ativa e ainda não carregou o beep, carrego
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      // Senão, limpo a referência
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  // Renderizo o Provider com o estado e dispatch, envolvendo os filhos
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
