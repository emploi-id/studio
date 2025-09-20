'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { polishResumeAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const initialState = {
  suggestions: '',
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Memoles...' : 'Poles Resume Saya'}
    </Button>
  );
}

export default function ResumePolisherPage() {
  const [state, formAction] = useFormState(polishResumeAction, initialState);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Poles Resume AI
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Tempelkan resume Anda dan deskripsi pekerjaan opsional untuk mendapatkan umpan balik yang disesuaikan dari AI kami.
        </p>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="resumeText">Resume Anda</Label>
              <Textarea
                id="resumeText"
                name="resumeText"
                placeholder="Tempelkan teks lengkap resume Anda di sini..."
                className="min-h-[250px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jobDescription">Deskripsi Pekerjaan Target (Opsional)</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Tempelkan deskripsi pekerjaan di sini untuk umpan balik yang lebih spesifik..."
                className="min-h-[150px]"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      {state?.error && (
        <Alert variant="destructive" className="mt-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Kesalahan</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.suggestions && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Saran Optimisasi</CardTitle>
                <CardDescription>Berikut adalah saran yang didukung AI untuk meningkatkan resume Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap rounded-md bg-muted p-4">
                    {state.suggestions}
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
