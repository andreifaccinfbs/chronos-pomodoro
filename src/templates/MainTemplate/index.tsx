// Estilos globais (importo aqui para garantir que carregem)
import "../../styles/theme.css";   // Variáveis de tema
import "../../styles/global.css";  // Estilos gerais

// Componentes que fazem parte do layout padrão
import { Container } from "../../components/Container";  // Wrapper de layout
import { Logo } from "../../components/Logo";            // Logo do app
import { Menu } from "../../components/Menu";            // Menu de navegação
import { Footer } from "../../components/Footer";        // Rodapé

// Props do template - recebe conteúdo como children
type MainTemplateProps = {
  children: React.ReactNode;  // Conteúdo que vai no meio do template
};

// Template principal que "embrulha" todas as páginas
export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      {/* Cabeçalho com logo */}
      <Container>
        <Logo />
      </Container>

      {/* Menu de navegação */}
      <Container>
        <Menu />
      </Container>

      {/* Conteúdo dinâmico da página */}
      {children}

      {/* Rodapé */}
      <Container>
        <Footer />
      </Container>
    </>
  );
}
