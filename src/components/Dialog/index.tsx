// Componentes e ícones que vou usar
import { DefaultButton } from "../DefaultButton";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
// Estilos do diálogo
import styles from "./styles.module.css";
// Tipo das props do react-toastify
import type { ToastContentProps } from "react-toastify";

// Componente de diálogo de confirmação (usado dentro de toasts)
export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        {/* Mensagem do diálogo */}
        <p>{data}</p>

        {/* Container dos botões */}
        <div className={styles.buttonsContainer}>
          {/* Botão de confirmar (verde com ícone de joinha) */}
          <DefaultButton
            onClick={() => closeToast(true)}  // Fecha o toast retornando true
            icon={<ThumbsUpIcon />}
            aria-label="Confirmar ação e fechar"
            title="Confirmar ação e fechar"
          />
          {/* Botão de cancelar (vermelho com ícone de joinha para baixo) */}
          <DefaultButton
            onClick={() => closeToast(false)} // Fecha o toast retornando false
            icon={<ThumbsDownIcon />}
            color="red"
            aria-label="Cancelar ação e fechar"
            title="Cancelar ação e fechar"
          />
        </div>
      </div>
    </>
  );
}
