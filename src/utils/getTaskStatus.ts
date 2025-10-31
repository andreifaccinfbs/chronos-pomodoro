// Importo o tipo da tarefa
import type { TaskModel } from "../models/TaskModel";

// Função que determina o status atual de uma tarefa
export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  // Se tem data de conclusão, foi completada
  if (task.completeDate) return "Completed";
  
  // Se tem data de interrupção, foi interrompida
  if (task.interruptDate) return "Interrompida";
  
  // Se o ID da tarefa é igual ao da tarefa ativa, está em progresso
  if (task.id === activeTask?.id) return "Em progresso";
  
  // Se não se encaixa em nenhuma das opções acima, foi abandonada
  return "Abandonada";
}
