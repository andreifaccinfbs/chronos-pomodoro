// Estilos das bolinhas de ciclo
import styles from "./styles.module.css";

// Componente que mostra o progresso dos ciclos Pomodoro
export function Cycles() {
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>  {/* Label dos ciclos */}
      
      {/* Container das bolinhas que representam cada ciclo */}
      <div className={styles.cycleDots}>
        {/* Padrão Pomodoro: 4 trabalhos + 3 pausas curtas + 1 pausa longa */}
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>        {/* Trabalho 1 */}
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>  {/* Pausa curta 1 */}
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>        {/* Trabalho 2 */}
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>  {/* Pausa curta 2 */}
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>        {/* Trabalho 3 */}
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>  {/* Pausa curta 3 */}
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>        {/* Trabalho 4 */}
        <span className={`${styles.cycleDot} ${styles.longBreakTime}`}></span>   {/* Pausa longa */}
      </div>
    </div>
  );
}
