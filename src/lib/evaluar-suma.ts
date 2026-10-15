// Función para sumar una cadena tipo "100+10+20" o retornar 0 si está vacía/nula
export function evaluarSuma(expresion: string | null | undefined): number {
  if (!expresion) return 0

  // Si ya es un número simple en formato texto (ej: "50"), lo convierte directamente
  if (!expresion.includes("+")) {
    return parseInt(expresion) || 0
  }

  return expresion
    .split("+")
    .reduce((acc, curr) => acc + (parseInt(curr.trim()) || 0), 0)
}
