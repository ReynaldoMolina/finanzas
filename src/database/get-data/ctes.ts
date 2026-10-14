import { isNotNull, sql } from "drizzle-orm"
import { db } from ".."
import { transaccion } from "../schema"

export const movimientosCTE = db.$with("movimientos").as(
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
    .where(isNotNull(transaccion.id_cuenta_origen))
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
        .where(isNotNull(transaccion.id_cuenta_destino))
    )
)

export const totalesCTE = db.$with("totales_cuenta").as(
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
