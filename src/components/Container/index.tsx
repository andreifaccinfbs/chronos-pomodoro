// Estilos do container
import styles from "./styles.module.css";

// Defino que o container pode receber qualquer conteúdo React como filho
type ContainerProps = {
  children: React.ReactNode;  // Qualquer coisa que o React pode renderizar
};

// Componente que "embrulha" outros componentes com layout padrão
export function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>      {/* Container externo */}
      <div className={styles.content}>      {/* Container interno para o conteúdo */}
        {children}                          {/* Renderiza o que foi passado como filho */}
      </div>
    </div>
  );
}
