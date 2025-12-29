'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/providers/AuthProvider'
import { useToast } from '@/hooks/use-toast'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signInWithOTP, verifyOTP } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOTP, setIsOTP] = useState(false)
  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  // Handle error messages from callback
  useEffect(() => {
    const error = searchParams.get('error')
    const message = searchParams.get('message')
    if (error && message) {
      toast({
        title: 'Authentication failed',
        description: decodeURIComponent(message),
        variant: 'destructive',
      })
      // Clean up URL
      router.replace('/auth')
    }
  }, [searchParams, router, toast])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsLoading(true)
      await signInWithOTP(email)
      toast({
        title: 'OTP sent',
        description: 'Please check your email for the verification code',
      })
      setIsOTP(true)
      // Start cooldown timer (60 seconds)
      setResendCooldown(60)
    } catch (error) {
      toast({
        title: 'Failed to send OTP',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0) {
      return
    }

    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsLoading(true)
      await signInWithOTP(email)
      toast({
        title: 'Code sent again',
        description: 'Please check your email for the new verification code',
      })
      // Start cooldown timer (60 seconds)
      setResendCooldown(60)
      // Clear the OTP input to encourage using the new code
      setOtp('')
    } catch (error) {
      toast({
        title: 'Failed to send OTP',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Cooldown timer effect
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [resendCooldown])

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit verification code',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsLoading(true)
      await verifyOTP(email, otp)
      toast({
        title: 'Success',
        description: 'You have been signed in successfully',
      })
      router.push('/study')
    } catch (error) {
      toast({
        title: 'Verification failed',
        description: error instanceof Error ? error.message : 'Please check your code and try again',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-2xl font-bold transition-opacity hover:opacity-80 mb-4"
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cerebryx
            </span>
          </Link>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              {isOTP ? 'Enter the verification code sent to your email' : 'Sign in with your email address'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isOTP ? (
              <>
                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    Send Verification Code
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </>
            ) : (
              <>
                {/* OTP Form */}
                <form onSubmit={handleOTPSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="pl-10"
                        maxLength={6}
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Code sent to {email}
                    </p>
                    <div className="text-center text-xs text-muted-foreground">
                      Didn&apos;t receive the code?{' '}
                      {resendCooldown > 0 ? (
                        <span className="text-muted-foreground">
                          Resend in {resendCooldown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={isLoading}
                          className="text-primary underline hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Send code again
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setIsOTP(false)
                        setOtp('')
                        setResendCooldown(0)
                      }}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                      Verify Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/study" className="text-primary hover:underline font-medium dark:text-secondary">
                Continue as guest
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

