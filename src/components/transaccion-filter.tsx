"use client"

import { FunnelIcon, FunnelXIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { SEARCH_FIELDS, TRANSACCION_TIPO } from "@/lib/tipos"
import { useUpdateParams } from "@/hooks/use-update-params"
import { useSearchParams } from "next/navigation"

export function TransaccionFilter() {
  const { updateParams } = useUpdateParams()
  const searchParams = useSearchParams()

  const tipo = searchParams.get("tipo")
  const search_field = searchParams.get("search_field")
  const hasActiveFilters = Boolean(tipo || search_field)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={hasActiveFilters ? "destructive" : "outline"}
            size="icon"
          >
            <FunnelIcon />
          </Button>
        }
      />
      <DropdownMenuContent className="w-fit">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tipo</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={tipo}>
            {TRANSACCION_TIPO.map((item) => (
              <DropdownMenuRadioItem
                key={item}
                value={item}
                onClick={() => updateParams({ tipo: item })}
              >
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Buscar en</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={search_field}>
            {SEARCH_FIELDS.map((item) => (
              <DropdownMenuRadioItem
                key={item}
                value={item}
                onClick={() => updateParams({ search_field: item })}
              >
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => updateParams({ tipo: null, search_field: null })}
            >
              <FunnelXIcon />
              Limpiar
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
