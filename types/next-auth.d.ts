import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      createdAt: string
      updatedAt: string
    } & DefaultSession["user"]
  }

  interface User {
    createdAt: string
    updatedAt: string
  }
}

