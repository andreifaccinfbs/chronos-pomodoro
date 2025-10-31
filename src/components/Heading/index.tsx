// Estilos do componente de título
import styles from "./styles.module.css";

// Props do componente - recebe qualquer conteúdo React como filho
type HeadingProps = {
  children: React.ReactNode;
};

// Componente de título reutilizável (sempre um h1)
export function Heading({ children }: HeadingProps) {
  // Renderiza um h1 com estilos customizados
  return <h1 className={styles.heading}>{children}</h1>;
}
