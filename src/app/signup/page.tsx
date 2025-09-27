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
import { signup } from '@/app/signup/actions';
import { BarChart3 } from 'lucide-react';


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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="absolute top-6 left-6">
            <Link href="/home" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-600 to-green-600 p-2 rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  Civic Connect
                </h1>
                <p className="text-xs text-gray-600">झारखंड सरकार</p>
              </div>
            </Link>
        </div>
        <Card className="w-full max-w-sm shadow-2xl border-gray-200/50">
            <form action={formAction}>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
                    <CardDescription>
                    Enter your details to get started with Civic Connect.
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
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-green-600 text-white font-semibold hover:from-orange-700 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all" disabled={isPending}>
                        {isPending ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                    <p className="text-sm text-center w-full text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-orange-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}
