
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, LogIn } from 'lucide-react';

export default function RequestTalentPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl font-bold">Post a Job</CardTitle>
          <CardDescription>
            Are you a new or existing member?
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link href="/signup">
                <Button variant="outline" className="h-auto w-full flex-col p-6">
                    <UserPlus className="mb-4 h-12 w-12 text-primary" />
                    <span className="text-lg font-semibold">New Member</span>
                    <span className="mt-1 text-sm text-muted-foreground">Create a company account</span>
                </Button>
            </Link>
            <Link href="/post-a-job">
                <Button variant="outline" className="h-auto w-full flex-col p-6">
                    <LogIn className="mb-4 h-12 w-12 text-primary" />
                    <span className="text-lg font-semibold">I'm an Existing Member</span>
                    <span className="mt-1 text-sm text-muted-foreground">Proceed to post a job</span>
                </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
