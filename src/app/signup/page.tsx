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
import Logo from '@/components/layout/Logo';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { signup } from '@/app/signup/actions';


export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [state, formAction, isPending] = useActionState(signup, null);

    useEffect(() => {
        if (state?.success) {
            toast({ title: 'Success!', description: 'Account created successfully. Please log in.' });
            router.push('/login');
        } else if (state?.error) {
            toast({ title: 'Error', description: state.error, variant: 'destructive' });
        }
    }, [state, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="absolute top-4 left-4">
            <Link href="/home">
                <Logo />
            </Link>
        </div>
        <Card className="w-full max-w-sm">
            <form action={formAction}>
                <CardHeader>
                    <CardTitle className="text-2xl">Create an Account</CardTitle>
                    <CardDescription>
                    Enter your details to create a new account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" type="text" placeholder="your_username" required />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                    <Button className="w-full" disabled={isPending}>
                        {isPending ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                    <p className="text-sm text-center w-full">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}
