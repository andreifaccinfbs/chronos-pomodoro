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
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

// Formulário principal da aplicação
export function MainForm() {
  const { state, setState } = useTaskContext();
  //const [taskName, setTaskName] = useState("");
  const taskNameInput = useRef<HTMLInputElement>(null);

  // ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

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
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle, // conferir dps
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterruptTask() {
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: prevState.tasks.map((task) => {
          if (prevState.activeTask && prevState.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    });
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
