'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { reportIssue, geocodeAddress } from '@/app/report/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Camera, MapPin, Building2, User, Home, Building, Pin, Shield } from 'lucide-react';
import Image from 'next/image';
import IssueMap from '@/components/issues/IssueMap';
import { useDebounce } from 'use-debounce';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { departments } from '@/lib/departments';

const formSchema = z.object({
  description: z.string().min(10, 'Please provide a detailed description.').max(500),
  address: z.string().min(5, 'Please provide a valid address or cross-street.'),
  place: z.string().min(3, 'Please provide a place/area name.'),
  district: z.string().min(3, 'Please provide a district name.'),
  block: z.string().min(3, 'Please provide a block name.'),
  pincode: z.string().length(6, 'Please provide a valid 6-digit pincode.'),
  policeStation: z.string().min(3, 'Please provide a police station name.'),
  fatherName: z.string().min(3, "Please provide father's name."),
  motherName: z.string().min(3, "Please provide mother's name."),
  department: z.string({ required_error: 'Please select a department.' }),
  photo: z.instanceof(File).refine((file) => file.size > 0, 'A photo is required.'),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

type FormState = {
    message: string;
    success: boolean;
};

const initialState: FormState = {
    message: '',
    success: false,
};

// Default center for the map (e.g., Los Angeles)
const defaultLocation = { lat: 34.0522, lng: -118.2437 };

export default function ReportPage() {
  const [state, formAction] = useActionState(reportIssue, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [mapCenter, setMapCenter] = useState(defaultLocation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      address: '',
      place: '',
      district: '',
      block: '',
      pincode: '',
      policeStation: '',
      fatherName: '',
      motherName: '',
      department: undefined,
      photo: undefined,
      lat: defaultLocation.lat,
      lng: defaultLocation.lng,
    },
  });

  const photoRef = form.register('photo');
  const photo = form.watch('photo');
  const address = form.watch('address');

  const [debouncedAddress] = useDebounce(address, 500);

  const updateMapLocation = useCallback(async (addr: string) => {
    if (addr) {
      const location = await geocodeAddress(addr);
      if (location) {
        setMapCenter(location);
        form.setValue('lat', location.lat);
        form.setValue('lng', location.lng);
      }
    }
  }, [form]);

  useEffect(() => {
    if (debouncedAddress) {
      updateMapLocation(debouncedAddress);
    }
  }, [debouncedAddress, updateMapLocation]);
  
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        form.reset();
        formRef.current?.reset();
        setMapCenter(defaultLocation);
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
    <div className="max-w-2xl mx-auto">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><User className="w-4 h-4" /> Father's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ramesh Kumar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><User className="w-4 h-4" /> Mother's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sunita Devi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                     <FormLabel className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Department</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the relevant department" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {departments.map((dept) => (
                                <SelectItem key={dept.name} value={dept.name}>
                                    {dept.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                     </Select>
                     <FormDescription>This helps route your issue to the correct officials.</FormDescription>
                     <FormMessage />
                  </FormItem>
                )}
               />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Address/Street</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123 Main St, Springfield" {...field} />
                    </FormControl>
                    <FormDescription>Provide the address or nearest intersection.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Home className="w-4 h-4" /> Place/Area</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Harmu Housing Colony" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Building className="w-4 h-4" /> District</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ranchi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="block"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Building className="w-4 h-4" /> Block</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Kanke" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Pin className="w-4 h-4" /> Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 834001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="policeStation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Shield className="w-4 h-4" /> Police Station</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Gonda Thana" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="h-64 w-full rounded-lg overflow-hidden">
                <IssueMap lat={mapCenter.lat} lng={mapCenter.lng} zoom={15} />
              </div>

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

              <FormField name="lat" control={form.control} render={({ field }) => <input type="hidden" {...field} />} />
              <FormField name="lng" control={form.control} render={({ field }) => <input type="hidden" {...field} />} />

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
