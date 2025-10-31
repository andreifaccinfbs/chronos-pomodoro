// Tipo do estado que vou enviar para o worker
import type { TaskStateModel } from "../models/TaskStateModel";

// Variável global para manter uma única instância (padrão Singleton)
let instance: TimerWorkerManager | null = null;

// Classe que gerencia o Web Worker do timer
export class TimerWorkerManager {
  private worker: Worker; // Worker que vai rodar o timer em background

  // Construtor privado - só pode ser chamado internamente
  private constructor() {
    // Crio o worker apontando para o arquivo timerWorker.js
    this.worker = new Worker(new URL("./timerWorker.js", import.meta.url));
  }

  // Método estático para pegar a instância única (Singleton)
  static getInstance() {
    // Se ainda não existe instância, crio uma
    if (!instance) {
      instance = new TimerWorkerManager();
    }

    // Retorno a instância (sempre a mesma)
    return instance;
  }

  // Método para enviar mensagem para o worker
  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message);
  }

  // Método para escutar mensagens do worker
  onmessage(cb: (e: MessageEvent) => void) {
    this.worker.onmessage = cb; // Defino a função callback
  }

  // Método para finalizar o worker
  terminate() {
    this.worker.terminate(); // Paro o worker
    instance = null;         // Limpo a instância para poder criar uma nova depois
  }
}
