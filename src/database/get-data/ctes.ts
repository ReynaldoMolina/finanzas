import { and, eq, isNotNull, or, sql } from "drizzle-orm"
import { db } from ".."
import { cuenta, cuentaCategoria, transaccion } from "../schema/schema"
import { SearchParamsProps } from "@/types"
import { buildDateFilter } from "./build-date-filter"

export function getAccountTotals(searchParams: SearchParamsProps) {
  const filterByDate = buildDateFilter(searchParams, transaccion.fecha)

  // Condición unificada: Si la cuenta es 'Activo', ignora el filtro de fecha (es verdadero siempre).
  // Si es 'Ingreso' o 'Gasto', se aplica rigurosamente el filtro de fechas.
  const conditionalDateFilter = or(
    eq(cuentaCategoria.tipo, "Activo"),
    filterByDate
  )

  const movimientosCTE = db.$with("movimientos").as(
    db
      .select({
        cuentaId: transaccion.id_cuenta_origen,
        montoEfectivo: sql<number>`
          CASE 
            WHEN ${transaccion.tipo} IN ('Gasto', 'Ingreso') THEN ${transaccion.monto}
            WHEN ${transaccion.tipo} = 'Transferencia' THEN -${transaccion.monto}
            ELSE 0 
          END
        `.as("monto_efectivo"),
      })
      .from(transaccion)
      .innerJoin(cuenta, eq(transaccion.id_cuenta_origen, cuenta.id))
      .innerJoin(cuentaCategoria, eq(cuenta.id_categoria, cuentaCategoria.id))
      .where(
        and(isNotNull(transaccion.id_cuenta_origen), conditionalDateFilter)
      )
      .unionAll(
        db
          .select({
            cuentaId: transaccion.id_cuenta_destino,
            montoEfectivo: sql<number>`
              CASE 
                WHEN ${transaccion.tipo} IN ('Ingreso', 'Transferencia') THEN ${transaccion.monto}
                WHEN ${transaccion.tipo} = 'Gasto' THEN -${transaccion.monto}
                ELSE 0 
              END
            `.as("monto_efectivo"),
          })
          .from(transaccion)
          .innerJoin(cuenta, eq(transaccion.id_cuenta_destino, cuenta.id))
          .innerJoin(
            cuentaCategoria,
            eq(cuenta.id_categoria, cuentaCategoria.id)
          )
          .where(
            and(isNotNull(transaccion.id_cuenta_destino), conditionalDateFilter)
          )
      )
  )

  const totalesCTE = db.$with("totales_cuenta").as(
    db
      .select({
        cuentaId: movimientosCTE.cuentaId,
        totalCuenta:
          sql<number>`COALESCE(SUM(${movimientosCTE.montoEfectivo}), 0)`.as(
            "total_cuenta"
          ),
      })
      .from(movimientosCTE)
      .groupBy(movimientosCTE.cuentaId)
  )

  return { movimientosCTE, totalesCTE }
}
