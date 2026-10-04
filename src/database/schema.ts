import { date, integer, numeric, pgTable, text } from "drizzle-orm/pg-core"

export const cuentaTipo = pgTable("cuenta_tipo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: text().notNull(),
})

export const cuentaGrupo = pgTable("cuenta_grupo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_tipo: integer().references(() => cuentaTipo.id),
  nombre: text().notNull(),
})

export const cuenta = pgTable("cuenta", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id_grupo: integer().references(() => cuentaGrupo.id),
  nombre: text().notNull(),
})

export const transaccion = pgTable("transaccion", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fecha: date().notNull(),
  monto: numeric().notNull(),
  id_cuenta_origen: numeric().notNull(),
  id_cuenta_destino: numeric().notNull(),
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

export const transaccionesPeya = pgTable("transaccion_peya", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fecha: date().notNull(),
  monto: numeric().notNull(),
  descripcion: text().notNull(),
})
