"use client";

import { useLoading } from "@/context/LoadingContext";
import { Loader2 } from "lucide-react";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GlobalLoader() {
  const { isLoading, setLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams, setLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-brand-green" />
        <span className="text-sm font-medium text-slate-700">Memproses...</span>
      </div>
    </div>
  );
}
