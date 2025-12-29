'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Mail, KeyRound } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/providers/AuthProvider'
import { useToast } from '@/hooks/use-toast'

interface RegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegistrationModal({
  open,
  onOpenChange,
}: RegistrationModalProps) {
  const { user, signInWithOTP, verifyOTP } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const otpInputRef = useRef<HTMLInputElement>(null)

  // Close modal when user successfully authenticates
  useEffect(() => {
    if (user && open) {
      onOpenChange(false)
      toast({
        title: 'Welcome!',
        description: 'You now have unlimited access to Cerebryx.',
      })
    }
  }, [user, open, onOpenChange, toast])

  // Focus OTP input when OTP is sent
  useEffect(() => {
    if (isOtpSent && otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [isOtpSent])

  const handleVerifyOTP = useCallback(async () => {
    if (!otp.trim() || otp.length !== 6) {
      toast({
        title: 'Invalid code',
        description: 'Please enter the 6-digit verification code',
        variant: 'destructive',
      })
      return
    }

    setIsVerifying(true)
    try {
      await verifyOTP(email.trim(), otp.trim())
      // Success will be handled by the useEffect watching for user change
      toast({
        title: 'Verification successful',
        description: 'Welcome to Cerebryx!',
      })
    } catch (error) {
      toast({
        title: 'Verification failed',
        description:
          error instanceof Error
            ? error.message
            : 'Invalid verification code. Please try again.',
        variant: 'destructive',
      })
      setOtp('') // Clear OTP on error
      otpInputRef.current?.focus()
    } finally {
      setIsVerifying(false)
    }
  }, [otp, email, verifyOTP, toast])

  // Auto-submit when 6 digits are entered
  useEffect(() => {
    if (otp.length === 6 && isOtpSent && !isVerifying) {
      const timer = setTimeout(() => {
        handleVerifyOTP()
      }, 300) // Small delay to ensure state is updated
      return () => clearTimeout(timer)
    }
  }, [otp, isOtpSent, isVerifying, handleVerifyOTP])

  const handleSendOTP = async () => {
    if (!email.trim()) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      await signInWithOTP(email.trim())
      setIsOtpSent(true)
      toast({
        title: 'Verification code sent',
        description: 'Check your email for the 6-digit code',
      })
    } catch (error) {
      toast({
        title: 'Failed to send OTP',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to send verification code',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }



  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6) // Only numbers, max 6 digits
    setOtp(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign Up to Continue</DialogTitle>
          <DialogDescription>
            You&apos;ve used your 3 free sessions. Sign up to continue using
            Cerebryx with unlimited access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Email/OTP Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isOtpSent}
                className="flex-1"
              />
              {!isOtpSent && (
                <Button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={isLoading || !email.trim()}
                  variant="default"
                  title="Send 6-digit verification code"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Code
                </Button>
              )}
            </div>
            {!isOtpSent && (
              <p className="text-xs text-muted-foreground">
                Click &quot;Send Code&quot; to receive a 6-digit verification code
              </p>
            )}
          </div>



          {/* OTP Verification Code Input */}
          {isOtpSent && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium">
                  Enter your verification code
                </p>
                <p className="text-xs text-muted-foreground">
                  We sent a verification code to <strong>{email}</strong>
                </p>
              </div>

              {/* Styled OTP Code Display Box */}
              <Card className="border-2 border-primary/20 bg-muted/30">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Label htmlFor="otp" className="text-xs text-muted-foreground">
                      Verification Code
                    </Label>
                    <div className="flex justify-center">
                      <Input
                        ref={otpInputRef}
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="000000"
                        disabled={isVerifying}
                        className="text-center text-3xl font-bold tracking-widest h-16 w-48 border-2 focus-visible:ring-2 focus-visible:ring-primary"
                        maxLength={6}
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      This code will expire in 15 minutes
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || otp.length !== 6}
                  className="flex-1"
                  size="lg"
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  {isVerifying ? 'Verifying...' : 'Verify Code'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsOtpSent(false)
                    setOtp('')
                  }}
                  variant="outline"
                  disabled={isVerifying}
                >
                  Change Email
                </Button>
              </div>

              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground text-center">
                  Didn&apos;t receive the code? Check your spam folder or{' '}
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isLoading || isVerifying}
                    className="text-primary underline hover:text-primary/80"
                  >
                    resend
                  </button>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

