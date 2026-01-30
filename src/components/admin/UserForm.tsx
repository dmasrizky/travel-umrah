'use client';

import { createUser, updateUser } from '@/app/lib/actions';
import { useActionState, useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/context/LoadingContext";

// Define a type for our form state (matching actions.ts)
interface State {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
  };
  message: string;
}

export default function UserForm({ user }: { user?: any }) {
  const { toast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // If user exists, we are editing. If not, creating.
  const updateUserWithId = user ? updateUser.bind(null, user.id) : null;
  const action = user ? updateUserWithId! : createUser;
  
  const initialState: State = { message: "", errors: {} };
  const [state, formAction, isPending] = useActionState(action, initialState);
  const { setLoading } = useLoading();

  // Sync isPending with GlobalLoader
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  useEffect(() => {
    if (state.message) {
      if (Object.keys(state.errors || {}).length > 0) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  const handleConfirm = () => {
    setShowConfirm(false);
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
    <Card className="max-w-2xl">
      <CardContent className="pt-6">
        <form 
            ref={formRef}
            action={formAction} 
            className="space-y-6"
        >
          
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              defaultValue={user?.username || ''}
            />
            {state.errors?.username && (
                <p className="text-sm text-destructive">{state.errors.username[0]}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={user?.email || ''}
            />
            {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select name="role" defaultValue={user?.role || 'USER'}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                </SelectContent>
            </Select>
            {state.errors?.role && (
                <p className="text-sm text-destructive">{state.errors.role[0]}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password {user && '(Leave blank to keep current)'}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            {state.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password[0]}</p>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="button" onClick={() => setShowConfirm(true)} disabled={isPending}>
               {isPending ? 'Menyimpan...' : (user ? 'Update User' : 'Create User')}
            </Button>
          </div>
          
        </form>
      </CardContent>
    </Card>

    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Simpan</AlertDialogTitle>
            <AlertDialogDescription>
            Apakah Anda yakin ingin menyimpan data user ini? Pastikan semua data sudah benar.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
            Simpan
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}

