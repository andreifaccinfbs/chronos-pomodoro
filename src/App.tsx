// Importo os estilos globais do meu app
import "./styles/theme.css"; // Variáveis de tema (cores, etc)
import "./styles/global.css"; // Estilos gerais que se aplicam em todo lugar
// Página principal do app
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { MessagesContainer } from "./components/MessagesContainer";
import { MainRouter } from "./routers/MainRouter";
// Componente raiz do meu app
export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
