// Estilos do rodapé
import styles from "./styles.module.css";
import { RouterLink } from "../RouterLink";

// Componente do rodapé do site
export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Link para explicação da técnica Pomodoro */}
      <RouterLink href="/about-pomodoro/">
        {" "}
        Entenda como funciona a técnica Pomodoro
      </RouterLink>

      {/* Copyright com ano dinâmico */}
      <RouterLink href="/">
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </RouterLink>
    </footer>
  );
}
