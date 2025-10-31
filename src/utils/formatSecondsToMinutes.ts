// Função utilitária para converter segundos em formato MM:SS
export function formatSecondsToMinutes(seconds: number) {
  // Calculo quantos minutos inteiros tenho (divido por 60 e arredondo para baixo)
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  
  // Calculo os segundos restantes (resto da divisão por 60)
  const secondsMod = String(Math.floor(seconds % 60)).padStart(2, "0");
  
  // Retorno no formato "MM:SS" (ex: "25:30", "05:07")
  return `${minutes}:${secondsMod}`;
}
