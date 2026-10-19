"use client"

import { ChevronRightIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "./ui/item"
import { useState } from "react"

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [selected, setSelected] = useState(theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <Item variant="outline">
            <ItemMedia variant="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Cambiar tema</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon size="16" />
            </ItemActions>
          </Item>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
            <DropdownMenuRadioItem
              value="system"
              onClick={() => setTheme("system")}
            >
              Sistema
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="light"
              onClick={() => setTheme("light")}
            >
              Claro
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="dark"
              onClick={() => setTheme("dark")}
            >
              Oscuro
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
