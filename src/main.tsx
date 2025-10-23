// Imports do React para inicializar o app
import { StrictMode } from "react";           // Modo estrito para detectar problemas
import { createRoot } from "react-dom/client"; // Função para criar a raiz do React
import { App } from "./App";                   // Meu componente principal

// Pego o elemento HTML onde vou "pendurar" meu app React
const rootElement = document.getElementById("root");
// Verifico se o elemento existe (segurança)
if (!rootElement) {
  throw new Error("Root element not found");
}

// Crio a raiz do React e renderizo meu app
createRoot(rootElement).render(
  <StrictMode>  {/* Modo estrito ajuda a encontrar bugs */}
    <App />     {/* Meu app principal */}
  </StrictMode>
);
