# 🔄 Fluxo de Funcionamento - Chronos Pomodoro

## 📋 Visão Geral do Sistema

O Chronos Pomodoro é uma aplicação React que implementa a técnica Pomodoro com gerenciamento de estado via Context API e Web Workers para o timer.

## 🏗️ Arquitetura Principal

### 1. **Inicialização da Aplicação**

```
main.tsx → App.tsx → TaskContextProvider → Home.tsx
```

**Função de cada camada:**

- `main.tsx`: Ponto de entrada, renderiza o App no DOM
- `App.tsx`: Componente raiz, envolve tudo no TaskContextProvider
- `TaskContextProvider`: Fornece estado global e lógica do timer
- `Home.tsx`: Página principal com CountDown e MainForm

### 2. **Gerenciamento de Estado (Context + Reducer)**

**Estado Global (TaskStateModel):**

```typescript
{
  tasks: TaskModel[]              // Lista de todas as tarefas
  secondsRemaining: number        // Segundos restantes no timer
  formattedSecondsRemaining: string // Timer formatado (MM:SS)
  activeTask: TaskModel | null    // Tarefa atualmente em execução
  currentCycle: number           // Ciclo atual (1-8)
  config: {                      // Configurações de tempo
    workTime: 25
    shortBreakTime: 5
    longBreakTime: 15
  }
}
```

**Actions do Reducer:**

- `START_TASK`: Inicia uma nova tarefa
- `INTERRUPT_TASK`: Interrompe tarefa atual
- `COMPLETE_TASK`: Completa tarefa atual
- `COUNT_DOWN`: Atualiza timer (a cada segundo)
- `RESET_STATE`: Reseta tudo
- `CHANGE_SETTINGS`: Altera configurações

## ⚙️ Fluxo de Execução do Timer

### 1. **Início de uma Tarefa**

```
MainForm (usuário clica Play)
    ↓
dispatch(START_TASK)
    ↓
taskReducer atualiza estado
    ↓
TaskContextProvider detecta mudança
    ↓
Envia estado para TimerWorker
    ↓
Worker inicia contagem regressiva
```

### 2. **Execução do Timer (Loop)**

```
TimerWorker (a cada 1 segundo)
    ↓
Calcula segundos restantes
    ↓
Envia para TaskContextProvider
    ↓
dispatch(COUNT_DOWN)
    ↓
taskReducer atualiza secondsRemaining
    ↓
CountDown component re-renderiza
    ↓
Usuário vê timer atualizado
```

### 3. **Finalização da Tarefa**

```
TimerWorker (quando chega a 0)
    ↓
Envia sinal de conclusão
    ↓
TaskContextProvider toca beep
    ↓
dispatch(COMPLETE_TASK)
    ↓
taskReducer marca tarefa como completa
    ↓
Worker é terminado
    ↓
Estado é salvo no localStorage
```

## 🔄 Ciclo Completo do Pomodoro

### **Padrão dos 8 Ciclos:**

1. **Trabalho** (25min) → 2. **Pausa Curta** (5min)
2. **Trabalho** (25min) → 4. **Pausa Curta** (5min)
3. **Trabalho** (25min) → 6. **Pausa Curta** (5min)
4. **Trabalho** (25min) → 8. **Pausa Longa** (15min)

### **Lógica de Ciclos:**

```typescript
// getNextCycleType determina o tipo baseado no número
Ciclo 1, 3, 5, 7 → workTime (ímpar)
Ciclo 2, 4, 6    → shortBreakTime (par, não múltiplo de 8)
Ciclo 8          → longBreakTime (múltiplo de 8)
```

## 📱 Componentes e Suas Funções

### **Componentes de Interface:**

- **CountDown**: Exibe timer formatado do estado global
- **MainForm**: Formulário para criar/iniciar tarefas
- **Cycles**: Mostra progresso visual dos 8 ciclos
- **Menu**: Navegação + troca de tema (dark/light)
- **Settings**: Página para alterar tempos padrão

### **Componentes Utilitários:**

- **Container**: Wrapper de layout responsivo
- **DefaultInput**: Input reutilizável com estilos
- **DefaultButton**: Botão reutilizável com ícones
- **Dialog**: Modal de confirmação para toasts

## 🔧 Utilitários e Helpers

### **Formatação e Cálculos:**

- `formatSecondsToMinutes()`: 1500 → "25:00"
- `getNextCycle()`: Calcula próximo ciclo (1-8)
- `getNextCycleType()`: Determina tipo (work/shortBreak/longBreak)
- `formatDate()`: Timestamp → "DD/MM/YYYY HH:mm"

### **Gerenciamento de Tarefas:**

- `getTaskStatus()`: Determina status (Completed/Interrompida/Em progresso)
- `sortTasks()`: Ordena lista por qualquer campo

### **Sistema de Notificações:**

- `showMessage`: Wrapper para react-toastify
- `loadBeep()`: Carrega e reproduz som de alarme

## 🔄 Web Worker (Timer em Background)

### **Por que usar Web Worker?**

- Timer roda em thread separada
- Não trava a interface do usuário
- Continua funcionando mesmo se aba perde foco

### **Fluxo do Worker:**

```
TaskContextProvider
    ↓ (postMessage)
TimerWorker.js
    ↓ (setInterval)
Conta segundos restantes
    ↓ (postMessage)
TaskContextProvider
    ↓ (dispatch)
Atualiza estado
```

## 💾 Persistência de Dados

### **localStorage:**

- Estado completo é salvo a cada mudança
- Na inicialização, recupera estado salvo
- Reseta apenas: activeTask, secondsRemaining, formattedSecondsRemaining

### **Dados Persistidos:**

- Lista de tarefas (histórico)
- Configurações personalizadas
- Ciclo atual
- Tema selecionado (dark/light)

## 🎯 Fluxo de Uso Típico

### **1. Usuário Abre o App:**

```
main.tsx carrega → TaskContextProvider inicializa →
Recupera estado do localStorage → Renderiza Home
```

### **2. Usuário Cria Tarefa:**

```
Digita nome no MainForm → Clica Play →
dispatch(START_TASK) → Timer inicia →
CountDown mostra tempo decrescente
```

### **3. Durante Execução:**

```
Worker conta segundos → Envia updates →
Estado atualiza → Interface re-renderiza →
Título da página mostra timer
```

### **4. Tarefa Termina:**

```
Timer chega a 0 → Beep toca →
dispatch(COMPLETE_TASK) → Tarefa marcada como completa →
Próximo ciclo calculado → Estado salvo
```

### **5. Navegação:**

```
Menu permite ir para Settings →
Alterar tempos padrão → Salvar configurações →
Voltar para Home com novos tempos
```

## 🔄 Estados Possíveis da Aplicação

### **Estado Inicial:**

- Nenhuma tarefa ativa
- Timer em 00:00
- Ciclo 0
- Configurações padrão

### **Estado Executando:**

- Tarefa ativa definida
- Timer contando regressivamente
- Worker rodando
- Beep carregado

### **Estado Pausado/Interrompido:**

- Tarefa marcada como interrompida
- Timer zerado
- Worker terminado
- Volta ao estado inicial

### **Estado Completado:**

- Tarefa marcada como completa
- Próximo ciclo calculado
- Timer zerado
- Pronto para próxima tarefa

## 🚀 Pontos de Extensão

### **Funcionalidades Futuras:**

- Roteamento entre páginas (React Router)
- Histórico detalhado de tarefas
- Estatísticas e relatórios
- Notificações do sistema
- Sincronização em nuvem
- Temas personalizados
- Sons customizáveis
