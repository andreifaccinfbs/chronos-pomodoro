// Biblioteca de toasts/notificações
import { toast } from "react-toastify";
// Meu componente de diálogo customizado
import { Dialog } from "../components/Dialog";

// Objeto que centraliza todas as funções de exibir mensagens
export const showMessage = {
  // Mensagem de sucesso (verde)
  success: (msg: string) => toast.success(msg),
  
  // Mensagem de erro (vermelho)
  error: (msg: string) => toast.error(msg),
  
  // Mensagem de aviso (amarelo)
  warn: (msg: string) => toast.warn(msg),
  warning: (msg: string) => toast.warning(msg), // Alias para warn
  
  // Mensagem informativa (azul)
  info: (msg: string) => toast.info(msg),
  
  // Fechar todas as mensagens
  dismiss: () => toast.dismiss(),
  
  // Diálogo de confirmação com botões Sim/Não
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast(Dialog, {                    // Uso meu componente Dialog customizado
      data,                            // Mensagem a ser exibida
      onClose: (confirmation) => {     // Callback quando o diálogo fecha
        if (confirmation) return onClosing(true);  // Se confirmou, chamo callback com true
        return onClosing(false);                   // Se cancelou, chamo callback com false
      },
      autoClose: false,                // Não fecha automaticamente
      closeOnClick: false,             // Não fecha ao clicar fora
      closeButton: false,              // Não mostra botão X
      draggable: false,                // Não permite arrastar
    }),
};
