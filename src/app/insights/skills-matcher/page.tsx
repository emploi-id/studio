'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
      {pending ? 'Mencocokkan...' : 'Temukan Jodoh Saya'}
    </Button>
  );
}

// Prepare the job postings string for the AI
const jobPostingsString = jobs
  .map(job => `Judul: ${job.title}\nPerusahaan: ${job.companyName}\nDeskripsi: ${job.description}\nPersyaratan: ${job.requirements.join(', ')}`)
  .join('\n\n---\n\n');

export default function SkillsMatcherPage() {
  const [state, formAction] = useActionState(matchSkillsAction, initialState);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pencocok Keterampilan AI
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Jelaskan keahlian dan pengalaman Anda untuk menemukan pekerjaan yang tepat untuk Anda. Kami akan mencocokkan Anda dengan lowongan pekerjaan terbaru kami.
        </p>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="jobSeekerProfile">Profil Anda</Label>
              <Textarea
                id="jobSeekerProfile"
                name="jobSeekerProfile"
                placeholder="Jelaskan keahlian, pengalaman, dan apa yang Anda cari. Cth., 'Pengembang frontend berpengalaman dengan 5 tahun di React dan TypeScript. Mencari peran jarak jauh di startup yang berkembang pesat.'"
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
            <CardTitle>Postingan Pekerjaan yang Cocok</CardTitle>
            <CardDescription>Berdasarkan profil Anda, berikut adalah beberapa pekerjaan yang mungkin cocok.</CardDescription>
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
