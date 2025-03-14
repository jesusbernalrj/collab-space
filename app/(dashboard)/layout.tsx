import { Sidebar } from "@/components/sidebar"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </div>
  )
}

