"use client"

import { Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
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
} from "@/components/ui/alert-dialog"
import { useAdminAction } from "@/hooks/useAdminAction"

interface DeleteButtonProps {
  id: string
  action: (id: string, path?: string) => Promise<void> 
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  const [open, setOpen] = useState(false)
  
  // Wrap the server action
  const { execute, isPending } = useAdminAction(
    async () => {
      // Pass a dummy path or modify the server action to revalidatePath if needed, 
      // but usually the server action handles revalidation.
      // Assuming action signature matches (id: string) -> Promise<void>
      await action(id) 
    },
    {
      successMessage: "Item berhasil dihapus",
      errorMessage: "Gagal menghapus item",
      onSuccess: () => setOpen(false)
    }
  )

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="destructive"
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen dari server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault(); // Prevent auto-close, let useAdminAction handle it
              execute();
            }}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
