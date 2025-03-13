import type { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <header className="flex h-16 items-center px-4 md:px-6">
                <div className="flex items-center gap-2 mx-auto md:mx-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trello"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <rect width="3" height="9" x="7" y="7" rx="1" />
                            <rect width="3" height="5" x="14" y="7" rx="1" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        TaskBoard
                    </span>
                </div>
            </header>
            <main className="flex justify-center items-center px-4 py-8 md:py-12">{children}</main>
        </div>
    )
}

