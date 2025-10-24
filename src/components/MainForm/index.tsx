// Ícone de play da biblioteca lucide
import { PlayCircleIcon } from "lucide-react";
// Componentes que vou usar no formulário
import { Cycles } from "../Cycles"; // Mostra os ciclos completados
import { DefaultButton } from "../DefaultButton"; // Botão customizado
import { DefaultInput } from "../DefaultInput"; // Input customizado
import { useRef } from "react";
import type { TaskModel } from "../../models/taskModel";

// Formulário principal da aplicação
export function MainForm() {
  //const [taskName, setTaskName] = useState("");
  const taskNameInput = useRef<HTMLInputElement>(null);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Evita que o formulário seja enviado

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert("Digite  o nome da tarefa!");
      return;
    }
    const newTask: TaskModel = {
      id: Date.now().toString(),
    };
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form" action="">
      <div className="formRow">
        <DefaultInput
          labelText="Task" // Label do campo
          id="meuInput" // ID único
          type="text" // Tipo texto
          placeholder="Digite Algo" // Texto de exemplo
          //value={taskName}
          //onChange={(e) => setTaskName(e.target.value)}
          ref={taskNameInput}
          //disabled // Campo desabilitado por enquanto
        />
      </div>
      {/* Texto informativo (temporário) */}
      <div className="formRow">
        <p>Próximo intervalo é de 25 min</p>
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
