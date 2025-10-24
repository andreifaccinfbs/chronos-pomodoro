// Importo os estilos globais do meu app
import "./styles/theme.css"; // Variáveis de tema (cores, etc)
import "./styles/global.css"; // Estilos gerais que se aplicam em todo lugar
// Página principal do app
import { Home } from "./pages/home";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";

// Componente raiz do meu app
export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
