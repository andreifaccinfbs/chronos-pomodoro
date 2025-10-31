// Função do React para criar contextos
import { createContext } from "react";
// Estado inicial e tipos que vou usar no contexto
import { initialTaskState } from "./initialTaskState";
import type { TaskActionModel } from "./taskActions";
import type { TaskStateModel } from "../../models/TaskStateModel";

// Defino que tipo de dados meu contexto vai fornecer
type TaskContextProps = {
  state: TaskStateModel;                        // O estado atual do app
  dispatch: React.Dispatch<TaskActionModel>;    // Função para disparar ações
};

// Valor inicial do contexto (usado como fallback)
const initialContextValue = {
  state: initialTaskState,    // Estado inicial
  dispatch: () => {},         // Função vazia (será substituída pelo Provider)
};

// Crio o contexto que vai ser usado em toda a aplicação
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
