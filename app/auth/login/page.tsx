"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { type FormState, type FormValidation, useForm, v } from "react-form-toolkit"
import { useAppSelector } from "@/lib/redux-hook"

// Define the form data interface
interface LoginFormProps {
  email: string
  password: string
}

export default function LoginPage() {
  const { isLoading } = useAppSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false)


  // Define initial form state
  const initialFormState: FormState<LoginFormProps> = {
    email: "",
    password: "",
  }

  // Define form validations
  const formValidations: FormValidation = {
    email: [v.isValidEmail, "Please enter a valid email address"],
    password: [v.required, "Password is required"],
  }

  // Use the useForm hook to manage form state and validation
  const { formState, onInputChange, handleSubmit, onBlur, errors, isFormValid } = useForm<LoginFormProps>(
    initialFormState,
    formValidations,
  )

  // Handle form submission
  const onSubmit = async (formData: FormState<LoginFormProps>) => {
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Login failed", {
          description: "Invalid email or password",
        })
        return
      }

      toast.success("Login successful", {
        description: "Welcome back!",
      })

      // router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed", {
        description: "An unexpected error occurred",
      })
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="w-full max-w-md">
      <Card className="overflow-hidden border-none shadow-xl">
        <div className="h-2 bg-gradient-to-r from-primary to-purple-600" />
        <CardHeader className="space-y-1 pt-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to access your boards and tasks</CardDescription>

        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Button
            variant="outline"
            className="w-full py-5 relative font-normal text-base"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            </div>
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={`pl-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-red-500" : ""}`}
                    value={formState.email}
                    onChange={onInputChange}
                    onBlur={onBlur}
                    disabled={isLoading}
                  />
                </div>
                {errors.email ? (
                  <p className="text-xs mt-1 text-red-500">{errors.email}</p>
                ) : (
                  <p className="text-xs mt-1 text-muted-foreground">Enter your email address</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`pl-10 pr-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.password ? "border-red-500" : ""}`}
                    value={formState.password}
                    onChange={onInputChange}
                    onBlur={onBlur}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {errors.password ? (
                  <p className="text-xs mt-1 text-red-500">{errors.password}</p>
                ) : (
                  <p className="text-xs mt-1 text-muted-foreground">Enter your password</p>
                )}
              </div>

              <Button
                className="w-full py-5 text-base font-medium shadow-md hover:shadow-lg transition-all mt-4"
                type="submit"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pb-6">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors"
            >
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

