import { TransaccionTipo } from "@/lib/tipos"
import { MoveUp, MoveDown } from "lucide-react"

interface StyleConfig {
  textColor: string
  sign: string
}

const TRANSACCION_STYLES: Record<TransaccionTipo, StyleConfig> = {
  Ingreso: {
    textColor: "text-green-600 dark:text-green-400",
    sign: "+",
  },
  "Por pagar": {
    textColor: "text-green-600 dark:text-green-400",
    sign: "+",
  },
  Gasto: {
    textColor: "text-red-600 dark:text-red-400",
    sign: "-",
  },
  "Por cobrar": {
    textColor: "text-red-600 dark:text-red-400",
    sign: "-",
  },
  Transferencia: {
    textColor: "text-blue-600 dark:text-blue-400",
    sign: "=",
  },
}

export function getTransaccionStyle(tipo: TransaccionTipo) {
  return (
    TRANSACCION_STYLES[tipo] ?? {
      textColor: "text-gray-400",
      sign: "",
    }
  )
}
