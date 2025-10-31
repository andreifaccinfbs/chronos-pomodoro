// Hook do React para usar contextos
import { useContext } from "react";
// Meu contexto de tarefas
import { TaskContext } from "./TaskContext";

// Hook customizado para usar o TaskContext de forma mais fácil
// Em vez de usar useContext(TaskContext) em todo lugar, uso useTaskContext()
export function useTaskContext() {
  return useContext(TaskContext); // Retorna { state, dispatch }
}
