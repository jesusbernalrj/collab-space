"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { type FormState, type FormValidation, useForm, v } from "react-form-toolkit"
import { useRegisterUser } from "@/lib/api/auth"
import { useAppSelector } from "@/lib/redux-hook"

// Define the form data interface
interface RegisterFormProps {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export default function RegisterPage() {
  const router = useRouter()
  const { isLoading } = useAppSelector((state) => state.auth)
  const registerMutation = useRegisterUser()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Define initial form state
  const initialFormState: FormState<RegisterFormProps> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  }

  // Define form validations
  const formValidations: FormValidation = {
    firstName: [v.required, "First name is required"],
    lastName: [v.required, "Last name is required"],
    email: [v.isValidEmail, "Please enter a valid email address"],
    password: [v.min(8), "Password must be at least 8 characters"],
    confirmPassword: [v.required, "Please confirm your password"],
    terms: [(value) => value === true, "You must agree to the terms"],
  }

  // Use the useForm hook to manage form state and validation
  const { formState, onInputChange, handleSubmit, onBlur, errors, isFormValid, onResetForm } = useForm<RegisterFormProps>(
    initialFormState,
    formValidations,
  )
  // Remove the console.log for formValidation
  // console.log('formValidation', formValidation)

  // Handle form submission
  const onSubmit = async (formData: FormState<RegisterFormProps>) => {
    const name = `${formData.firstName} ${formData.lastName}`
  
    await registerMutation.mutateAsync(
      {
        name,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          toast.success("Account created!", {
            description: "You've successfully registered. Redirecting to login...",
          })
          onResetForm()
        },
        onError: (error) => {
          toast.error("Registration failed", {
            description: error.message || "Something went wrong",
          })
        },
      }
    )
  }

  const handleGoogleSignUp = async () => {
    // This would be implemented with NextAuth.js Google provider
    toast.info("Google Sign Up", {
      description: "Google authentication will be implemented with NextAuth",
    })
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-center">Join TaskBoard to organize your projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Button
            variant="outline"
            className="w-full py-5 relative font-normal text-base"
            type="button"
            onClick={handleGoogleSignUp}
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
            Sign up with Google
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className={`pl-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.firstName ? "border-red-500" : ""}`}
                      value={formState.firstName}
                      onChange={onInputChange}
                      onBlur={onBlur}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.firstName ? (
                    <p className="text-xs mt-1 text-red-500">{errors.firstName}</p>
                  ) : (
                    <p className="text-xs mt-1 text-muted-foreground">Enter your first name</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      className={`pl-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.lastName ? "border-red-500" : ""}`}
                      value={formState.lastName}
                      onChange={onInputChange}
                      onBlur={onBlur}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.lastName ? (
                    <p className="text-xs mt-1 text-red-500">{errors.lastName}</p>
                  ) : (
                    <p className="text-xs mt-1 text-muted-foreground">Enter your last name</p>
                  )}
                </div>
              </div>
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
                  <p className="text-xs mt-1 text-muted-foreground">We'll never share your email with anyone else</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
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
                  <p className="text-xs mt-1 text-muted-foreground">Password must be at least 8 characters</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`pl-10 pr-10 transition-all focus:ring-2 focus:ring-primary/20 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    value={formState.confirmPassword}
                    onChange={onInputChange}
                    onBlur={onBlur}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                {errors.confirmPassword ? (
                  <p className="text-xs mt-1 text-red-500">{errors.confirmPassword}</p>
                ) : (
                  <p className="text-xs mt-1 text-muted-foreground">Please re-enter your password to confirm</p>
                )}
              </div>
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  name="terms"
                  className={`mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${errors.terms ? "border-red-500" : ""}`}
                  checked={formState.terms}
                  onCheckedChange={(checked) => {
                    onInputChange({
                      target: {
                        name: "terms",
                        value: checked === true,
                      },
                    } as any)
                  }}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm leading-tight text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline transition-colors">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline transition-colors">
                    privacy policy
                  </Link>
                </label>
              </div>
              {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
            </div>

            <Button
              className="w-full py-5 text-base font-medium shadow-md hover:shadow-lg transition-all mt-6"
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pb-6">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

