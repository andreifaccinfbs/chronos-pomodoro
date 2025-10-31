// Importo o tipo da tarefa para usar o tipo correto
import type { TaskModel } from "../models/TaskModel";

// Função que determina que tipo de ciclo é o próximo baseado no número atual
export function getNextCycleType(currentCycle: number): TaskModel["type"] {
  // Se o ciclo é múltiplo de 8 (ciclo 8), é pausa longa
  if (currentCycle % 8 === 0) return "longBreakTime";
  
  // Se o ciclo é par (2, 4, 6), é pausa curta
  if (currentCycle % 2 === 0) return "shortBreakTime";
  
  // Se o ciclo é ímpar (1, 3, 5, 7), é tempo de trabalho
  return "workTime";
}

/* Padrão dos ciclos:
1 -> workTime (trabalho)
2 -> shortBreakTime (pausa curta)
3 -> workTime (trabalho)
4 -> shortBreakTime (pausa curta)
5 -> workTime (trabalho)
6 -> shortBreakTime (pausa curta)
7 -> workTime (trabalho)
8 -> longBreakTime (pausa longa)
*/
