// Importo os estilos específicos deste componente
import type { HomeProps } from "../../pages/home";
import styles from "./styles.module.css";

// Componente que vai mostrar o timer do Pomodoro
export function CountDown({ state }: HomeProps) {
  // Por enquanto só mostra 00:00, mas depois vai mostrar o tempo real
  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
