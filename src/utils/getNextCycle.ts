// Função que calcula qual é o próximo ciclo do Pomodoro
export function getNextCycle(currentCycle: number) {
  // Se estou no ciclo 0 (inicial) ou no 8 (último), volto para 1
  // Senão, apenas incremento o ciclo atual
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}

/* Lógica dos ciclos:
0 (inicial) -> 1 (primeiro ciclo)
1 -> 2
2 -> 3
3 -> 4
4 -> 5
5 -> 6
6 -> 7
7 -> 8
8 (último) -> 1 (reinicia o ciclo)

Total: 8 ciclos (4 trabalhos + 3 pausas curtas + 1 pausa longa)
*/
