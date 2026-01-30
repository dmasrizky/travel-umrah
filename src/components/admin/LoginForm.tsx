'use client';
 
import { useActionState, useState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { Eye, EyeOff } from 'lucide-react'; // Added icons

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false); // Added state
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction} className="space-y-4">
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="username"
        >
          Username
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            defaultValue="admin" // Convenience for dev
          />
        </div>
      <div>
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            required
            defaultValue="admin77" // Convenience for dev
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
                <EyeOff className="h-4 w-4" />
            ) : (
                <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
      <button
        className="flex w-full justify-center rounded-md bg-brand-green p-2 text-sm font-medium text-white hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        aria-disabled={isPending}
        disabled={isPending}
      >
        {isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
        ) : (
          'Log in'
        )}
      </button>
    </form>
  );
}
