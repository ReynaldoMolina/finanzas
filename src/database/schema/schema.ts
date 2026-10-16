import {
  CUENTA_TIPO,
  CuentaTipo,
  TRANSACCION_TIPO,
  TransaccionTipo,
} from "@/lib/tipos"
import {
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
} from "drizzle-orm/pg-core"

export const tipoCuentaEnum = pgEnum("cuenta_tipo", CUENTA_TIPO)

export const cuentaCategoria = pgTable("cuenta_categoria", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tipo: tipoCuentaEnum("tipo").$type<CuentaTipo>().notNull(),
  nombre: text().notNull(),
})

export const cuenta = pgTable("cuenta", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_categoria: integer()
    .notNull()
    .references(() => cuentaCategoria.id),
  nombre: text().notNull(),
})

export const tipoTransaccionEnum = pgEnum("transaccion_tipo", TRANSACCION_TIPO)

export const transaccion = pgTable("transaccion", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tipo: tipoTransaccionEnum("tipo").$type<TransaccionTipo>().notNull(),
  fecha: date().notNull(),
  monto: numeric({ precision: 8, scale: 2 }).notNull(),
  id_cuenta_origen: integer()
    .notNull()
    .references(() => cuenta.id),
  id_cuenta_destino: integer()
    .notNull()
    .references(() => cuenta.id),
  descripcion: text(),
})

export const transaccionFrecuente = pgTable("transaccion_frecuente", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  tipo: tipoTransaccionEnum("tipo").$type<TransaccionTipo>().notNull(),
  nombre: text().notNull(),
  monto: numeric({ precision: 8, scale: 2 }).notNull(),
  id_cuenta_origen: integer()
    .references(() => cuenta.id)
    .notNull(),
  id_cuenta_destino: integer()
    .references(() => cuenta.id)
    .notNull(),
  descripcion: text(),
})

export const arqueo = pgTable("arqueo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_cuenta: integer()
    .notNull()
    .references(() => cuenta.id),
  dolar_100: text(),
  dolar_50: text(),
  dolar_20: text(),
  dolar_10: text(),
  dolar_5: text(),
  dolar_2: text(),
  dolar_1: text(),
  nio_1000: text(),
  nio_500: text(),
  nio_200: text(),
  nio_100: text(),
  nio_50: text(),
  nio_20: text(),
  nio_10: text(),
  nio_5: text(),
  nio_1: text(),
  nio_050: text(),
  nio_025: text(),
  nio_010: text(),
})

export const configuracion = pgTable("configuracion", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cambio_dolar: numeric({ precision: 8, scale: 2 }).notNull(),
  id_categoria_efectivo: integer()
    .references(() => cuenta.id)
    .notNull(),
})
