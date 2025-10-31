// Componentes que vou usar na página home
import { useEffect } from "react";
import { Container } from "../../components/Container"; // Container para layout
import { CountDown } from "../../components/CountDown"; // Timer do Pomodoro
import { MainForm } from "../../components/MainForm"; // Formulário principal
import { MainTemplate } from "../../templates/MainTemplate"; // Template com header/footer

// Página principal do meu app
export function Home() {
  useEffect(() => {
    document.title = "Chronos Pomodoro";
  }, []);
  return (
    <MainTemplate>
      <Container>
        <CountDown /> {/* Mostra o tempo restante */}
      </Container>

      {/* Seção do formulário */}
      <Container>
        <MainForm /> {/* Formulário para criar tarefas */}
      </Container>
    </MainTemplate>
  );
}
