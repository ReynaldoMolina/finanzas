"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [selected, setSelected] = useState(theme)

  const items = [
    {
      value: "system",
      label: "Sistema",
      icon: <MonitorIcon />,
    },
    {
      value: "light",
      label: "Claro",
      icon: <SunIcon />,
    },
    {
      value: "dark",
      label: "Oscuro",
      icon: <MoonIcon />,
    },
  ]

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="p-3">
        <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        Cambiar tema
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup
              value={selected}
              onValueChange={setSelected}
            >
              {items.map((item) => (
                <DropdownMenuRadioItem
                  key={item.value}
                  value={item.value}
                  className="p-3 pr-9"
                  onClick={() => setTheme(item.value)}
                >
                  {item.icon}
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
