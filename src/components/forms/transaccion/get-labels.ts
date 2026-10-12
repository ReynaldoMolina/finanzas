import { TransaccionTipo } from "@/lib/tipos"

export function getLabels(tipo: TransaccionTipo) {
  let labelCategoria = "Categoría",
    labelCuenta = "Cuenta"

  if (tipo === "Ingreso") {
    labelCuenta = "Entra a"
  }

  if (tipo === "Gasto") {
    labelCuenta = "Sale de"
  }

  if (tipo === "Transferencia") {
    labelCategoria = "Desde"
    labelCuenta = "Hacia"
  }

  return { labelCategoria, labelCuenta }
}
