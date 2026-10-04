import { Grupo, Tipo } from "@/src/types"
import { db } from ".."
import { cuentaGrupo, cuenta, cuentaTipo } from "../schema"
import { eq, asc } from "drizzle-orm"

export async function getCuentas(): Promise<{ data: Tipo[] }> {
  try {
    const rows = await db
      .select({
        tipoId: cuentaTipo.id,
        tipoNombre: cuentaTipo.nombre,
        grupoId: cuentaGrupo.id,
        grupoNombre: cuentaGrupo.nombre,
        cuentaId: cuenta.id,
        cuentaNombre: cuenta.nombre,
      })
      .from(cuentaTipo)
      .leftJoin(cuentaGrupo, eq(cuentaTipo.id, cuentaGrupo.id_tipo))
      .leftJoin(cuenta, eq(cuentaGrupo.id, cuenta.id_grupo))
      .orderBy(asc(cuentaTipo.id), asc(cuentaGrupo.id), asc(cuenta.id))

    const dataMap = new Map<
      number,
      {
        id: number
        nombre: string
        grupos: Map<number, Grupo>
      }
    >()

    for (const row of rows) {
      if (!dataMap.has(row.tipoId)) {
        dataMap.set(row.tipoId, {
          id: row.tipoId,
          nombre: row.tipoNombre,
          grupos: new Map<number, Grupo>(),
        })
      }

      const tipo = dataMap.get(row.tipoId)!

      if (row.grupoId !== null) {
        if (!tipo.grupos.has(row.grupoId)) {
          tipo.grupos.set(row.grupoId, {
            id: row.grupoId,
            nombre: row.grupoNombre!,
            cuentas: [],
          })
        }

        const grupo = tipo.grupos.get(row.grupoId)!

        if (row.cuentaId !== null) {
          grupo.cuentas.push({
            id: row.cuentaId,
            nombre: row.cuentaNombre!,
          })
        }
      }
    }

    const data: Tipo[] = Array.from(dataMap.values()).map((tipo) => ({
      id: tipo.id,
      nombre: tipo.nombre,
      grupos: Array.from(tipo.grupos.values()),
    }))

    return { data }
  } catch (error) {
    throw new Error("No se pudieron obtener las cuentas.")
  }
}
