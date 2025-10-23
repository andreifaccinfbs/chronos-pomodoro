// Ícone de timer da biblioteca lucide-react
import { TimerIcon } from "lucide-react";
// Estilos do meu logo
import styles from "./styles.module.css";

// Componente do logo do meu app
export function Logo() {
  return (
    <div className={styles.logo}>
      {/* Link do logo (por enquanto só # mas depois pode ir para home) */}
      <a className={styles.logoLink} href="#">
        <TimerIcon />        {/* Ícone de relógio */}
        <span>Chronos</span>  {/* Nome do app */}
      </a>
    </div>
  );
}
