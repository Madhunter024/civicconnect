
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
import { login } from '@/app/login/actions';


export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [state, formAction, isPending] = useActionState(login, null);

    useEffect(() => {
        if (state?.success) {
            toast({ title: 'Success', description: 'Logged in successfully!' });
            router.push('/dashboard');
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
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                    Enter your email below to login to your dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" defaultValue="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={isPending}>
                        {isPending ? 'Signing In...' : 'Sign in'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}
