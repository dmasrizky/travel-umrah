import UserForm from "@/components/admin/UserForm";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Add New User</h2>
      </div>
      <UserForm />
    </div>
  );
}
