// Estilos do rodapé
import styles from "./styles.module.css";

// Componente do rodapé do site
export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Link para explicação da técnica Pomodoro */}
      <a href=""> Entenda como funciona a técnica Pomodoro</a>
      
      {/* Copyright com ano dinâmico */}
      <a href="">
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </a>
    </footer>
  );
}
