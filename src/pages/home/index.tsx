// Componentes que vou usar na página home
import type React from "react";
import { Container } from "../../components/Container"; // Container para layout
import { CountDown } from "../../components/CountDown"; // Timer do Pomodoro
import { MainForm } from "../../components/MainForm"; // Formulário principal
import type { TaskStateModel } from "../../models/TaskStateModel";
import { MainTemplate } from "../../templates/MainTemplate"; // Template com header/footer

export type HomeProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

// Página principal do meu app
export function Home(props: HomeProps) {
  return (
    <MainTemplate>
      <Container>
        <CountDown {...props} /> {/* Mostra o tempo restante */}
      </Container>

      {/* Seção do formulário */}
      <Container>
        <MainForm {...props} /> {/* Formulário para criar tarefas */}
      </Container>
    </MainTemplate>
  );
}
