"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, LogOut, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    // Simulate logout process
    setTimeout(() => {
      setIsLoggingOut(false)
      setIsLoggedOut(true)

      // Clear any stored user data
      localStorage.removeItem("user")
      sessionStorage.clear()

      // Redirect to home page after a brief delay
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    }, 1500)
  }

  // Auto-logout if accessed directly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggingOut && !isLoggedOut) {
        handleLogout()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [isLoggingOut, isLoggedOut])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Link
        href="/dashboard"
        className="absolute top-4 left-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">SafeGuard</h1>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              {isLoggedOut ? (
                <>
                  <CheckCircle className="h-6 w-6 text-success" />
                  Logged Out Successfully
                </>
              ) : (
                <>
                  <LogOut className="h-6 w-6" />
                  {isLoggingOut ? "Signing Out..." : "Sign Out"}
                </>
              )}
            </CardTitle>
            <CardDescription>
              {isLoggedOut
                ? "You have been safely signed out of your SafeGuard account"
                : isLoggingOut
                  ? "Securely ending your session and clearing your data"
                  : "Are you sure you want to sign out of your account?"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoggedOut ? (
              <div className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Session Ended</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your session has been terminated and all local data has been cleared.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/auth">Sign In Again</Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href="/">Go Home</Link>
                  </Button>
                </div>
              </div>
            ) : isLoggingOut ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">• Ending monitoring session</p>
                  <p className="text-sm text-muted-foreground">• Clearing sensitive data</p>
                  <p className="text-sm text-muted-foreground">• Securing your account</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">What happens when you sign out:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your monitoring session will be ended</li>
                    <li>• All local data will be cleared</li>
                    <li>• You'll need to sign in again to access your dashboard</li>
                    <li>• Emergency contacts will still be able to reach you</li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleLogout} variant="destructive" className="flex-1" disabled={isLoggingOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Yes, Sign Out
                  </Button>
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
