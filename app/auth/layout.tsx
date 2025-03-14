import type { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <main className="flex justify-center items-center px-4 py-8 md:py-12">{children}</main>
        </div>
    )
}

