import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcrypt"
import prisma from "@/lib/prisma"
import NextAuth from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (!existingUser) {
          // Create a new user if they don't exist
          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email!,
              image: user.image,
            },
          })

          user.id = newUser.id
          user.createdAt = newUser.createdAt.toISOString()
          user.updatedAt = newUser.updatedAt.toISOString()
        } else {
          // Use existing user data
          user.id = existingUser.id
          user.createdAt = existingUser.createdAt.toISOString()
          user.updatedAt = existingUser.updatedAt.toISOString()
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.createdAt = user.createdAt
        token.updatedAt = user.updatedAt
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.createdAt = token.createdAt as string
        session.user.updatedAt = token.updatedAt as string

        // Ensure name, email and image are also updated from token
        session.user.name = token.name
        session.user.email = token.email as string
        if (token.picture) {
          session.user.image = token.picture as string
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)
