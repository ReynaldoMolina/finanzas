import { CreateAccountForm } from "@/src/components/forms/create-account"
import { CreateGroupForm } from "@/src/components/forms/create-group"
import { EditAccountForm } from "@/src/components/forms/edit-account"
import { EditGroupForm } from "@/src/components/forms/edit-group"
import { AppHeader } from "@/src/components/header"
import { PageWrapper } from "@/src/components/page-wrapper"
import { getCuentas } from "@/src/database/get-data/cuentas"

const title = "Cuentas"

export const metadata = {
  title: title,
}

export default async function Page() {
  const { data } = await getCuentas()

  return (
    <>
      <AppHeader title={title} />
      <PageWrapper className="mb-12 max-w-3xl space-y-8">
        {data.map((tipo) => (
          <section key={tipo.id} className="border bg-card p-4">
            {/* Nivel 1: Tipo de Cuenta */}
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {tipo.nombre}s
              </h2>
              <CreateGroupForm id_tipo={tipo.id} name={tipo.nombre} />
            </div>

            {/* Nivel 2: Grupos */}
            <div className="mt-4 space-y-3">
              {tipo.grupos && tipo.grupos.length > 0 ? (
                tipo.grupos.map((grupo) => (
                  <div key={grupo.id} className="border bg-background/50">
                    <div className="flex items-center justify-between bg-muted/30 px-2 py-2.5">
                      <h3 className="text-sm font-medium text-foreground">
                        {grupo.nombre}
                      </h3>

                      <div className="flex items-center gap-1">
                        <CreateAccountForm
                          id_grupo={grupo.id}
                          name={grupo.nombre}
                        />
                        <EditGroupForm
                          id={grupo.id}
                          id_tipo={tipo.id}
                          nombre={grupo.nombre}
                          name={tipo.nombre}
                        />
                      </div>
                    </div>

                    {/* Nivel 3: Subgrupos / Cuentas */}
                    <div className="p-1">
                      {grupo.cuentas && grupo.cuentas.length > 0 ? (
                        <ul>
                          {grupo.cuentas.map((cuenta) => (
                            <li
                              key={cuenta.id}
                              className="flex items-center justify-between p-1 transition-colors hover:bg-accent/50"
                            >
                              <span className="text-xs text-muted-foreground transition-colors group-hover/account:text-foreground">
                                {cuenta.nombre}
                              </span>
                              <div className="opacity-70 transition-opacity group-hover/account:opacity-100">
                                <EditAccountForm
                                  id={cuenta.id}
                                  id_grupo={grupo.id}
                                  nombre={cuenta.nombre}
                                  name="Cuenta"
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-2 py-3 text-center">
                          <p className="text-xs text-muted-foreground/60 italic">
                            Sin cuentas asignadas
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed py-8 text-center">
                  <p className="text-xs text-muted-foreground/70">
                    No hay grupos creados en esta categoría
                  </p>
                </div>
              )}
            </div>
          </section>
        ))}
      </PageWrapper>
    </>
  )
}
