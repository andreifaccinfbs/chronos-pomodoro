// Estilos do meu input customizado
import styles from "./styles.module.css";

// Defino que props meu input vai receber
type DefaultInputProps = {
  id: string;           // ID único para o input
  labelText: string;    // Texto que vai aparecer no label
} & React.ComponentProps<"input">;  // Mais todas as props normais de um input HTML

// Componente de input reutilizável
export function DefaultInput({
  id,
  type,
  labelText,
  ...rest    // Pego todas as outras props que foram passadas
}: DefaultInputProps) {
  return (
    <>
      {/* Label conectado ao input pelo htmlFor */}
      <label htmlFor={id}>{labelText}</label>
      {/* Input com meus estilos e todas as props passadas */}
      <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}
