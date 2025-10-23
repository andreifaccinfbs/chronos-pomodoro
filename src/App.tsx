// Importo os estilos globais do meu app
import "./styles/theme.css"; // Variáveis de tema (cores, etc)
import "./styles/global.css"; // Estilos gerais que se aplicam em todo lugar
// Hook do React para gerenciar estado
import { useState } from "react";
// Página principal do app
import { Home } from "./pages/home";
import type { TaskStateModel } from "./models/TaskStateModel";

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

// Componente raiz do meu app
export function App() {
  const [state, setState] = useState(initialState);
  // Por enquanto só renderiza a página Home
  return <Home state={state} setState={setState} />;
}
