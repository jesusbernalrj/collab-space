"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronRight,
  Layout,
  LogOut,
  Menu,
  Moon,
  PlusCircle,
  Settings,
  Star,
  Sun,
  User,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [workspacesExpanded, setWorkspacesExpanded] = useState(true)
  const [starredExpanded, setStarredExpanded] = useState(true)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50" onClick={toggleMobileSidebar}>
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm",
          isCollapsed ? "w-[70px]" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
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
              {!isCollapsed && (
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  TaskBoard
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={toggleSidebar}>
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Main Navigation */}
            <div className="space-y-1">
              <Link href="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3", isCollapsed && "justify-center px-2")}
                >
                  <Layout size={18} />
                  {!isCollapsed && <span>Dashboard</span>}
                </Button>
              </Link>
              <Link href="/boards">
                <Button
                  variant={isActive("/boards") ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3", isCollapsed && "justify-center px-2")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                  {!isCollapsed && <span>Boards</span>}
                </Button>
              </Link>
              <Link href="/settings">
                <Button
                  variant={isActive("/settings") ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3", isCollapsed && "justify-center px-2")}
                >
                  <Settings size={18} />
                  {!isCollapsed && <span>Settings</span>}
                </Button>
              </Link>
            </div>

            {/* Workspaces */}
            {!isCollapsed ? (
              <div className="space-y-2">
                <div
                  className="flex items-center justify-between cursor-pointer px-2 py-1 text-sm font-medium text-gray-500 dark:text-gray-400"
                  onClick={() => setWorkspacesExpanded(!workspacesExpanded)}
                >
                  <span>Workspaces</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    {workspacesExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </Button>
                </div>
                {workspacesExpanded && (
                  <div className="space-y-1 pl-2">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                      <Users size={16} className="text-blue-500" />
                      <span>Marketing Team</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                      <Users size={16} className="text-purple-500" />
                      <span>Development Team</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                      <Users size={16} className="text-green-500" />
                      <span>Design Team</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 mt-2 border-dashed">
                      <PlusCircle size={16} />
                      <span>Create Workspace</span>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Users size={18} />
                </Button>
              </div>
            )}

            {/* Starred Boards */}
            {!isCollapsed ? (
              <div className="space-y-2">
                <div
                  className="flex items-center justify-between cursor-pointer px-2 py-1 text-sm font-medium text-gray-500 dark:text-gray-400"
                  onClick={() => setStarredExpanded(!starredExpanded)}
                >
                  <span>Starred Boards</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    {starredExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </Button>
                </div>
                {starredExpanded && (
                  <div className="space-y-1 pl-2">
                    <Link href="/boards/project-alpha">
                      <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Project Alpha</span>
                      </Button>
                    </Link>
                    <Link href="/boards/marketing-campaign">
                      <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Marketing Campaign</span>
                      </Button>
                    </Link>
                    <Link href="/boards/app-development">
                      <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span>App Development</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Star size={18} />
                </Button>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            {!isCollapsed ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john.doe@example.com</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User size={16} />
                    <span>Profile</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  JD
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <User size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

