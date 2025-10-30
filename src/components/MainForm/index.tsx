// Ícone de play da biblioteca lucide
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
// Componentes que vou usar no formulário
import { Cycles } from "../Cycles"; // Mostra os ciclos completados
import { DefaultButton } from "../DefaultButton"; // Botão customizado
import { DefaultInput } from "../DefaultInput"; // Input customizado
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../tips";
import { showMessage } from "../../adapters/showMessage";

// Formulário principal da aplicação
export function MainForm() {
  const { state, dispatch } = useTaskContext();
  //const [taskName, setTaskName] = useState("");
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Evita que o formulário seja enviado
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      showMessage.warn("Digite  o nome da tarefa!");
      return;
    }
    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({
      type: TaskActionTypes.START_TASK,
      payload: newTask,
    });
  }
  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error("Tarefa interrompida!");
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} className="form" action="">
      <div className="formRow">
        <DefaultInput
          labelText="Task" // Label do campo
          id="meuInput" // ID único
          type="text" // Tipo texto
          placeholder="Digite Algo" // Texto de exemplo
          ref={taskNameInput}
          disabled={!!state.activeTask} // Campo desabilitado por enquanto
          defaultValue={lastTaskName} // Valor padrão}
        />
      </div>
      {/* Texto informativo (temporário) */}
      <div className="formRow">
        <Tips />
      </div>
      {/* Componente que mostra os ciclos */}
      <div className="formRow">
        <Cycles /> {/* Bolinhas que mostram progresso */}
      </div>
      {/* Botão para iniciar o Pomodoro */}
      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
            key="botao1"
          />
        )}
        {!!state.activeTask && (
          <DefaultButton
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key="botao2"
          />
        )}
      </div>
    </form>
  );
}
