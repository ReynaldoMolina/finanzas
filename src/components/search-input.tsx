"use client"

import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group"
import { SearchIcon, XIcon } from "lucide-react"

interface SearchInput {
  children: ReactNode
}

export function SearchInput({ children }: SearchInput) {
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = useState(
    searchParams.get("search")?.toString() || ""
  )
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 400)

  function handleChange(term: string) {
    setSearchText(term)
    handleSearch(term)
  }

  const search_field = searchParams.get("search_field")
  const placeholder = search_field
    ? `Buscar ${search_field.toLowerCase()}`
    : "Buscar"

  return (
    <div className="flex w-full gap-2 sm:w-fit">
      <InputGroup className="sm:w-60">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder}
          value={searchText}
          onChange={(event) => handleChange(event.target.value)}
          className="text-sm"
        />
        {searchText && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => handleChange("")}
              disabled={searchText.length === 0}
            >
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {children}
    </div>
  )
}
