import beep from "../assets/audios/alarm-2.mp3";
export function loadBeep() {
  const audio = new Audio(beep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch((err) => console.log("Erro ao tocar audio", err));
  };
}
