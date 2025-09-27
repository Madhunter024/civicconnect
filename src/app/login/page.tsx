'use client';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { login } from '@/app/login/actions';
import { BarChart3 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Logo from '@/components/layout/Logo';


export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [state, formAction, isPending] = useActionState(login, null);

    useEffect(() => {
        if (state?.success) {
            toast({ title: 'Success', description: 'Logged in successfully!' });
            router.push('/home');
        } else if (state?.error) {
            toast({ title: 'Error', description: state.error, variant: 'destructive' });
        }
    }, [state, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="absolute top-6 left-6">
            <Logo />
        </div>
        <Card className="w-full max-w-sm shadow-2xl border-gray-200/50">
            <form action={formAction}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">Login to Your Account</CardTitle>
                    <CardDescription>
                     Select your role and enter your credentials.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label>Select your role</Label>
                         <RadioGroup defaultValue="citizen" name="role" className="grid grid-cols-3 gap-4">
                            <div>
                                <RadioGroupItem value="citizen" id="citizen" className="peer sr-only" />
                                <Label htmlFor="citizen" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Citizen
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                                <Label htmlFor="admin" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Admin
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="official" id="official" className="peer sr-only" />
                                <Label htmlFor="official" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Official
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" type="text" placeholder="your_username" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-green-600 text-white font-semibold hover:from-orange-700 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all" disabled={isPending}>
                        {isPending ? 'Signing In...' : 'Sign in'}
                    </Button>
                     <p className="text-sm text-center w-full text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium text-orange-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}
