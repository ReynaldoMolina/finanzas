"use client"

import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { SearchIcon, XIcon } from "lucide-react"

export function SearchInput() {
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

  return (
    <InputGroup className="sm:max-w-60">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        placeholder="Buscar"
        value={searchText}
        onChange={(event) => handleChange(event.target.value)}
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
  )
}
