'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { reportIssue } from '@/app/report/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';
import { ArrowRight, Camera, MapPin } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  description: z.string().min(10, 'Please provide a detailed description.').max(500),
  address: z.string().min(5, 'Please provide a valid address or cross-street.'),
  photo: z.instanceof(File).refine((file) => file.size > 0, 'A photo is required.'),
});

type FormState = {
    message: string;
    success: boolean;
};

const initialState: FormState = {
    message: '',
    success: false,
};

export default function ReportPage() {
  const [state, formAction] = useActionState(reportIssue, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      address: '',
      photo: undefined,
    },
  });

  const photoRef = form.register('photo');
  const photo = form.watch('photo');
  
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        form.reset();
        formRef.current?.reset();
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, form]);

  return (
    <div className="container mx-auto max-w-2xl py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Report a New Issue</CardTitle>
          <CardDescription>
            Help improve your community by reporting problems. Please be as descriptive as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form ref={formRef} action={formAction} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., There is a large pothole on the corner of..." {...field} />
                    </FormControl>
                    <FormDescription>Describe the issue in detail.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123 Main St, Springfield" {...field} />
                    </FormControl>
                    <FormDescription>Provide the address or nearest intersection.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><Camera className="w-4 h-4"/> Photo</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/*" {...photoRef} />
                        </FormControl>
                        <FormDescription>A picture is worth a thousand words.</FormDescription>
                        {photo && photo.size > 0 && (
                            <div className="mt-4 w-full aspect-video relative rounded-md overflow-hidden">
                                <Image src={URL.createObjectURL(photo)} alt="Preview" fill className="object-cover" />
                            </div>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
               />

              <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit Report'}
                {!form.formState.isSubmitting && <ArrowRight className="ml-2" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
