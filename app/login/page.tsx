"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { FcGoogle } from "react-icons/fc"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { FaLinkedin } from "react-icons/fa"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for error in URL parameters
    const errorFromParams = searchParams.get("error")
    if (errorFromParams) {
      let errorMessage = "An error occurred during authentication."
      if (errorFromParams === "OAuthSignin") errorMessage = "Could not start the sign in process."
      if (errorFromParams === "OAuthCallback") errorMessage = "Error during sign in callback."
      if (errorFromParams === "OAuthAccountNotLinked") errorMessage = "This account is already linked with another provider."
      if (errorFromParams === "Callback") errorMessage = "Error during callback processing."
      setError(errorMessage)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      // For now, we're only supporting OAuth
      // This is a placeholder for future email/password auth
      alert("Email/password login not implemented yet. Please use Google or LinkedIn sign-in.")
      setIsLoading(false)
    } catch (error) {
      console.error("Login error:", error)
      setError("Failed to log in with email and password.")
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Google login error:", error)
      setError("Failed to log in with Google.")
      setIsLoading(false)
    }
  }

  const handleLinkedInLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn("linkedin", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("LinkedIn login error:", error)
      setError("Failed to log in with LinkedIn.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-[#0077B5] transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] bg-clip-text text-transparent">
                  LinkType
                </span>
              </motion.div>
              <motion.h1
                className="text-2xl font-bold tracking-tight text-gray-900 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Welcome back
              </motion.h1>
              <motion.p
                className="mt-2 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Log in to your account to continue
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12 border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <FcGoogle className="h-5 w-5" />
                  <span>Continue with Google</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12 border-gray-300 bg-[#0A66C2] hover:bg-[#004182] text-white transition-colors"
                  onClick={handleLinkedInLogin}
                  disabled={isLoading}
                >
                  <FaLinkedin className="h-5 w-5" />
                  <span>Continue with LinkedIn</span>
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Separator className="w-full" />
                <span className="mx-4 text-sm text-gray-500">or</span>
                <Separator className="w-full" />
              </div>

              <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="h-12 border-gray-300 focus:border-[#0077B5] focus:ring-[#0077B5]"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm font-medium text-[#0077B5] hover:text-[#0073b1]">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-gray-300 focus:border-[#0077B5] focus:ring-[#0077B5]"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#0077B5] hover:bg-[#0073b1] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          <motion.p
            className="mt-6 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-[#0077B5] hover:text-[#0073b1]">
              Sign up
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

