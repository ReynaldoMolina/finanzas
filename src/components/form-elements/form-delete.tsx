"use client"

import { useState, useTransition } from "react"
import { TrashIcon } from "lucide-react"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "../ui/item"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { ServerStatus } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { stateDefault } from "@/database/actions/state-message"

interface DeleteFormItemProps {
  id: number | string
  title?: string
  handleDelete: (
    prevState: ServerStatus,
    payload: { id: number | string }
  ) => Promise<ServerStatus>
}

export function DeleteFormItem({
  id,
  title = "registro",
  handleDelete,
}: DeleteFormItemProps) {
  const [isPending, startTransition] = useTransition()
  const [actionState, setActionState] = useState<ServerStatus | undefined>(
    undefined
  )

  useServerActionFeedback(actionState, { refresh: true, back: true })

  function onDelete() {
    startTransition(async () => {
      const result = await handleDelete(stateDefault, { id })
      setActionState(result)
    })
  }

  return (
    <Item variant="outline" size="sm">
      <ItemMedia variant="icon">
        <TrashIcon />
      </ItemMedia>

      <ItemContent>
        <ItemTitle>Eliminar {title}</ItemTitle>
      </ItemContent>

      <ItemActions>
        <AlertDialog>
          <AlertDialogTrigger
            render={<Button variant="destructive" disabled={isPending} />}
          >
            {isPending && <Spinner />} Eliminar
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar {title}?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={onDelete}
                disabled={isPending}
              >
                {isPending && <Spinner />} Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ItemActions>
    </Item>
  )
}
