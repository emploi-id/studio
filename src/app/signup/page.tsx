'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Building } from 'lucide-react';
import JobSeekerSignUpForm from '@/components/forms/job-seeker-signup-form';
import EmployerSignUpForm from '@/components/forms/employer-signup-form';

type UserRole = 'seeker' | 'employer' | null;

export default function SignUpPage() {
  const [role, setRole] = useState<UserRole>(null);

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
