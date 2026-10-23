"use client"

import { FunnelIcon, FunnelXIcon, XIcon } from "lucide-react"
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
  const hasAllActiveFilters = Boolean(tipo && search_field)

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
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center">
            Tipo
            {Boolean(tipo) && (
              <Button
                variant="destructive"
                size="icon-xs"
                className="ml-auto"
                onClick={() => updateParams({ tipo: undefined })}
              >
                <XIcon />
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={tipo}>
            {TRANSACCION_TIPO.map((item) => (
              <DropdownMenuRadioItem
                key={item}
                value={item}
                className="p-3 sm:p-2"
                onClick={() => updateParams({ tipo: item })}
              >
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center">
            Buscar en
            {Boolean(search_field) && (
              <Button
                variant="destructive"
                size="icon-xs"
                className="ml-auto"
                onClick={() => updateParams({ search_field: undefined })}
              >
                <XIcon />
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={search_field}>
            {SEARCH_FIELDS.map((item) => (
              <DropdownMenuRadioItem
                key={item}
                value={item}
                className="p-3 sm:p-2"
                onClick={() => updateParams({ search_field: item })}
              >
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        {hasAllActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="p-3 sm:p-2"
              onClick={() => updateParams({ tipo: null, search_field: null })}
            >
              <FunnelXIcon />
              Limpiar todo
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
