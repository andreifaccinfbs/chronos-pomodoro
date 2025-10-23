// Estilos do botão customizado
import styles from "./styles.module.css";

// Props que meu botão customizado vai receber
type DefaultButtonProps = {
  icon: React.ReactNode;           // Ícone que vai aparecer no botão
  color?: "green" | "red";         // Cor do botão (verde por padrão)
} & React.ComponentProps<"button">;  // Mais todas as props normais de botão HTML

// Botão reutilizável com ícone e cores
export function DefaultButton({
  icon,
  color = "green",  // Se não passar cor, usa verde
  ...props          // Pego todas as outras props
}: DefaultButtonProps) {
  return (
    <>
      {/* Botão com classes dinâmicas baseadas na cor */}
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}  {/* Renderiza o ícone passado */}
      </button>
    </>
  );
}
