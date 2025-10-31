// Biblioteca para formatar datas
import { format } from "date-fns";

// Função que converte timestamp em data formatada
export function formatDate(timestamp: number) {
  // Converto o timestamp em objeto Date
  const date = new Date(timestamp);
  
  // Formato a data no padrão brasileiro: DD/MM/AAAA HH:mm
  return format(date, "dd/MM/yyyy HH:mm");
}
