import { handlers } from "@/auth" // Referring to where we exported { auth, signIn, signOut, handlers } -- Wait, I missed exporting handlers in auth.ts
export const { GET, POST } = handlers
