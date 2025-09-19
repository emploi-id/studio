'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { matchSkillsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { jobs } from '@/lib/data';

const initialState = {
  matchedJobs: '',
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Matching...' : 'Find My Matches'}
    </Button>
  );
}

// Prepare a string of job postings for the AI
const jobPostingsString = jobs
  .map(job => `Title: ${job.title}\nCompany: ${job.companyName}\nDescription: ${job.description}\nRequirements: ${job.requirements.join(', ')}`)
  .join('\n\n---\n\n');

export default function SkillsMatcherPage() {
  const [state, formAction] = useFormState(matchSkillsAction, initialState);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          AI Skills Matcher
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Describe your skills and experience to find jobs that are the right fit for you. We'll match you against our latest job postings.
        </p>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="jobSeekerProfile">Your Profile</Label>
              <Textarea
                id="jobSeekerProfile"
                name="jobSeekerProfile"
                placeholder="Describe your skills, experience, and what you're looking for. For example: 'Experienced frontend developer with 5 years in React and TypeScript. Looking for a remote role in a fast-growing startup.'"
                className="min-h-[200px]"
                required
              />
            </div>
            <input type="hidden" name="jobPostings" value={jobPostingsString} />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state?.error && (
        <Alert variant="destructive" className="mt-6">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.matchedJobs && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Matched Job Postings</CardTitle>
            <CardDescription>Based on your profile, here are some jobs that could be a great fit.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap rounded-md bg-muted p-4">
              {state.matchedJobs}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
