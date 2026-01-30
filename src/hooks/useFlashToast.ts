"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook to show toast from URL search params (flash message pattern)
 * Usage: Add ?toast_success=message or ?toast_error=message to URL
 */
export function useFlashToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { toast } = useToast();

    useEffect(() => {
        const successMessage = searchParams.get("toast_success");
        const errorMessage = searchParams.get("toast_error");

        if (successMessage) {
            toast({
                title: "Berhasil",
                description: decodeURIComponent(successMessage),
                className: "bg-green-600 text-white",
            });
            // Remove query param after showing toast
            const params = new URLSearchParams(searchParams.toString());
            params.delete("toast_success");
            const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
            router.replace(newUrl, { scroll: false });
        }

        if (errorMessage) {
            toast({
                title: "Gagal",
                description: decodeURIComponent(errorMessage),
                variant: "destructive",
            });
            // Remove query param after showing toast
            const params = new URLSearchParams(searchParams.toString());
            params.delete("toast_error");
            const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
            router.replace(newUrl, { scroll: false });
        }
    }, [searchParams, router, pathname, toast]);
}
