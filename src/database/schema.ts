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
  descripcion: text().notNull(),
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
  descripcion: text().notNull(),
})

export const arqueo = pgTable("arqueo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
  dolar_100: integer(),
  dolar_50: integer(),
  dolar_20: integer(),
  dolar_10: integer(),
  dolar_5: integer(),
  dolar_2: integer(),
  dolar_1: integer(),
  nio_1000: integer(),
  nio_500: integer(),
  nio_200: integer(),
  nio_100: integer(),
  nio_50: integer(),
  nio_20: integer(),
  nio_10: integer(),
  nio_5: integer(),
  nio_1: integer(),
  nio_050: integer(),
  nio_025: integer(),
  nio_010: integer(),
})
