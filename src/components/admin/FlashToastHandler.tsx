"use client";

import { useFlashToast } from "@/hooks/useFlashToast";

/**
 * Component to handle flash toast messages from URL params
 * Add this component to any page that should show toast after redirect
 */
export function FlashToastHandler() {
  useFlashToast();
  return null;
}
