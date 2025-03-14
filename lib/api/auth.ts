import { useMutation, useQuery } from "@tanstack/react-query"
import { useAppDispatch } from "../redux-hook"
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "../feautures/auth/authSlice"


interface RegisterData {
  name: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

// Register user
export const useRegisterUser = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      dispatch(registerStart())

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Registration failed")
      }

      return await response.json()
    },
    onSuccess: () => {
      dispatch(registerSuccess())
    },
    onError: (error: Error) => {
      dispatch(registerFailure(error.message))
    },
  })
}

// Login user
export const useLoginUser = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: async (credentials: LoginData) => {
      dispatch(loginStart())

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Login failed")
      }

      return await response.json()
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user))
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message))
    },
  })
}

// Get current user
export const useCurrentUser = () => {
  const dispatch = useAppDispatch()

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await fetch("/api/user")

      if (!response.ok) {
        throw new Error("Failed to fetch user")
      }

      const data = await response.json()

      if (data.user) {
        dispatch(loginSuccess(data.user))
      }

      return data
    },
    retry: false,
  })
}

