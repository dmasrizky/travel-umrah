import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteUser } from "@/app/lib/actions";
import { FlashToastHandler } from "@/components/admin/FlashToastHandler";

const prisma = new PrismaClient();

export default async function UsersPage() {
  const session = await auth();
  
  if (session?.user?.role !== "SUPER_ADMIN") {
      redirect("/admin/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
    <FlashToastHandler />
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
        <Button asChild className="bg-brand-green hover:bg-brand-green/90">
            <Link href="/admin/users/new">
                <Plus className="mr-2 h-4 w-4" /> Add User
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="px-6 py-4 border-b">
            <CardTitle className="text-xl">Users List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="pl-6">Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No users found.
                        </TableCell>
                    </TableRow>
                ) : (
                    users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium pl-6">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Badge variant={
                                user.role === 'SUPER_ADMIN' ? 'destructive' : 
                                user.role === 'ADMIN' ? 'default' : 'secondary'
                            }>
                                {user.role}
                            </Badge>
                        </TableCell>
                        <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right pr-6 space-x-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
                            </Button>
                            <DeleteButton id={user.id} action={deleteUser} />
                        </TableCell>
                    </TableRow>
                    ))
                )}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
