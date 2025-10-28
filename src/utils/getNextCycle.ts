export function getNextCycle(currentCycle: number) {
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}

/* 
0 -> 1
1 -> 2
2 -> 3
...
8 -> 1
vai ate 8 ciclos por isso quando chega no ultimo, ele deve voltar para o ciclo 1
*/
