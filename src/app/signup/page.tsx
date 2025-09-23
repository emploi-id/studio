'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Building, LogIn } from 'lucide-react';
import JobSeekerSignUpForm from '@/components/forms/job-seeker-signup-form';
import EmployerSignUpForm from '@/components/forms/employer-signup-form';
import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

type UserRole = 'seeker' | 'employer' | null;

function SignUpPageContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') as UserRole;
  const [role, setRole] = useState<UserRole>(initialRole);

  const handleRoleSelection = (selectedRole: NonNullable<UserRole>) => {
    setRole(selectedRole);
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
              <CardTitle className="font-headline text-3xl font-bold">Join emploi</CardTitle>
              <CardDescription>First, tell us who you are.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Button
                variant="outline"
                className="h-auto flex-col p-6"
                onClick={() => handleRoleSelection('seeker')}
              >
                <User className="mb-4 h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">I'm a Job Seeker</span>
                <span className="mt-1 text-sm text-muted-foreground">Find my next role</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col p-6"
                onClick={() => handleRoleSelection('employer')}
              >
                <Building className="mb-4 h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">I'm an Employer</span>
                 <span className="mt-1 text-sm text-muted-foreground">Hire top talent</span>
              </Button>
            </CardContent>
            <div className="flex items-center px-6 pb-6">
                <Separator className="flex-1" />
                <span className="px-4 text-sm text-muted-foreground">OR</span>
                <Separator className="flex-1" />
            </div>
             <div className="px-6 pb-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
                <Link href="/login" passHref>
                    <Button variant="secondary" className="w-full">
                        <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </Button>
                </Link>
            </div>
          </>
        ) : role === 'seeker' ? (
          <JobSeekerSignUpForm onBack={handleBack} />
        ) : (
          <EmployerSignUpForm onBack={handleBack} />
        )}
      </Card>
    </div>
  );
}


export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPageContent />
    </Suspense>
  );
}
