// Ícone de play da biblioteca lucide
import { PlayCircleIcon } from "lucide-react";
// Componentes que vou usar no formulário
import { Cycles } from "../Cycles"; // Mostra os ciclos completados
import { DefaultButton } from "../DefaultButton"; // Botão customizado
import { DefaultInput } from "../DefaultInput"; // Input customizado
import type { HomeProps } from "../../pages/home";

// Formulário principal da aplicação
export function MainForm({ state, setState }: HomeProps) {
  function handleClick() {
    setState((prevState) => {
      return {
        ...prevState,
        config: {
          ...prevState.config,
          workTime: 34,
        },
        formattedSecondsRemaining: "30:34",
      };
    });
  }

  return (
    <form className="form" action="">
      <div>
        <button type="button" onClick={handleClick}>
          {" "}
          Clicar
        </button>
      </div>
      <div className="formRow">
        <DefaultInput
          labelText="Task" // Label do campo
          id="meuInput" // ID único
          type="text" // Tipo texto
          placeholder="Digite Algo" // Texto de exemplo
          defaultValue={"valor preenchido"} // Valor inicial (teste)
          disabled // Campo desabilitado por enquanto
        />
      </div>
      {/* Texto informativo (temporário) */}
      <div className="formRow">
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      {/* Componente que mostra os ciclos */}
      <div className="formRow">
        <Cycles /> {/* Bolinhas que mostram progresso */}
      </div>
      {/* Botão para iniciar o Pomodoro */}
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} />{" "}
        {/* Botão com ícone de play */}
      </div>
    </form>
  );
}
