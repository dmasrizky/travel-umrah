import LoginForm from '@/components/admin/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-brand-green">Admin Portal</h1>
            <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
