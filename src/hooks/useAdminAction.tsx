"use client";

import { useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/hooks/use-toast";

interface UseAdminActionOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useAdminAction(
  action: () => Promise<any>,
  options: UseAdminActionOptions = {}
) {
  const { setLoading } = useLoading();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const execute = async () => {
    try {
      setLoading(true);
      setIsPending(true);
      
      await action();

      toast({
        title: "Berhasil",
        description: options.successMessage || "Operasi berhasil disimpan",
        variant: "default",
        className: "bg-green-600 text-white border-green-700" 
      });

      if (options.onSuccess) {
        options.onSuccess();
      }
    } catch (error: any) {
      console.error("Admin Action Error:", error);
      toast({
        title: "Gagal",
        description: options.errorMessage || error.message || "Terjadi kesalahan sistem",
        variant: "destructive",
      });
      
      if (options.onError) {
        options.onError(error);
      }
    } finally {
      setLoading(false);
      setIsPending(false);
    }
  };

  return { execute, isPending };
}
