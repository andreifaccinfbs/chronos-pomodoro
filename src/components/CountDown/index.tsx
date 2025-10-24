// Importo os estilos específicos deste componente
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import styles from "./styles.module.css";

// Componente que vai mostrar o timer do Pomodoro
export function CountDown() {
  const { state } = useTaskContext();
  // Mostra o tempo formatado do contexto
  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}
