// Importo o arquivo de áudio do alarme
import beep from "../assets/audios/alarm-2.mp3";

// Função que carrega o áudio e retorna uma função para tocá-lo
export function loadBeep() {
  // Crio um objeto Audio com o arquivo de som
  const audio = new Audio(beep);
  // Carrego o áudio na memória para tocar mais rápido depois
  audio.load();

  // Retorno uma função que, quando chamada, toca o som
  return () => {
    audio.currentTime = 0; // Volto para o início do áudio
    // Tento tocar o áudio, se der erro, logo no console
    audio.play().catch((err) => console.log("Erro ao tocar audio", err));
  };
}
