import PackageForm from '@/components/admin/PackageForm';
 
export default function NewPackagePage() {
  return (
    <main>
       <h1 className="text-2xl font-heading font-bold mb-6">Create New Package</h1>
      <PackageForm />
    </main>
  );
}
