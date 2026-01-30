import UserForm from "@/components/admin/UserForm";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;
  
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit User</h2>
      </div>
      <UserForm user={{
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }} />
    </div>
  );
}

