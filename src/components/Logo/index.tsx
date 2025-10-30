// Ícone de timer da biblioteca lucide-react
import { TimerIcon } from "lucide-react";
// Estilos do meu logo
import styles from "./styles.module.css";
import { RouterLink } from "../RouterLink";

// Componente do logo do meu app
export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink className={styles.logoLink} href="/">
        <TimerIcon />
        <span>Chronos</span>
      </RouterLink>
    </div>
  );
}
