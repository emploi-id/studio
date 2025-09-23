'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LogIn, User, Building, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const jobSeekerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const employerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  memberId: z.string().min(1, { message: 'Member ID is required.' }),
  referralCode: z.string().optional(),
});

type JobSeekerFormValues = z.infer<typeof jobSeekerSchema>;
type EmployerFormValues = z.infer<typeof employerSchema>;
type UserRole = 'seeker' | 'employer' | null;

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>(null);

  const jobSeekerForm = useForm<JobSeekerFormValues>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: { email: '', password: '' },
  });

  const employerForm = useForm<EmployerFormValues>({
    resolver: zodResolver(employerSchema),
    defaultValues: { email: '', password: '', memberId: '', referralCode: '' },
  });

  const onJobSeekerSubmit: SubmitHandler<JobSeekerFormValues> = (data) => {
    console.log('Job Seeker Login:', data);
    alert('You have successfully signed in as a Job Seeker!');
    jobSeekerForm.reset();
  };

  const onEmployerSubmit: SubmitHandler<EmployerFormValues> = (data) => {
    console.log('Employer Login:', data);
    alert('You have successfully signed in as an Employer!');
    employerForm.reset();
  };
  
  const handleBack = () => {
    setRole(null);
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-12">
      <Card>
        {!role ? (
          <>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl font-bold">Sign In</CardTitle>
              <CardDescription>First, tell us who you are.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Button
                variant="outline"
                className="h-auto flex-col p-6"
                onClick={() => setRole('seeker')}
              >
                <User className="mb-4 h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">I'm a Job Seeker</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col p-6"
                onClick={() => setRole('employer')}
              >
                <Building className="mb-4 h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">I'm an Employer</span>
              </Button>
            </CardContent>
             <div className="px-6 pb-6 text-center text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                    Sign up
                </Link>
            </div>
          </>
        ) : role === 'seeker' ? (
          <>
            <CardHeader className="relative text-center">
                <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={handleBack}>
                    <ArrowLeft />
                </Button>
                <CardTitle className="font-headline text-3xl font-bold">Job Seeker Sign In</CardTitle>
                <CardDescription>Welcome back to emploi.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...jobSeekerForm}>
                <form onSubmit={jobSeekerForm.handleSubmit(onJobSeekerSubmit)} className="space-y-6">
                  <FormField
                    control={jobSeekerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="e.g. johndoe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={jobSeekerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
            <>
            <CardHeader className="relative text-center">
                <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={handleBack}>
                    <ArrowLeft />
                </Button>
                <CardTitle className="font-headline text-3xl font-bold">Employer Sign In</CardTitle>
                <CardDescription>Welcome back to emploi.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...employerForm}>
                <form onSubmit={employerForm.handleSubmit(onEmployerSubmit)} className="space-y-6">
                  <FormField
                    control={employerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="e.g. contact@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={employerForm.control}
                    name="memberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Member ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Member ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={employerForm.control}
                    name="referralCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referral Code (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter referral code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={employerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
