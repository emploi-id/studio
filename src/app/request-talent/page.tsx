'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, LogIn } from 'lucide-react';
import EmployerSignUpForm from '@/components/forms/employer-signup-form';
import { useRouter } from 'next/navigation';

export default function RequestTalentPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  if (showSignUp) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-12">
        <Card>
          <EmployerSignUpForm onBack={() => setShowSignUp(false)} onSuccess={() => router.push('/post-a-job')} />
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl font-bold">Posting Pekerjaan</CardTitle>
          <CardDescription>
            Apakah Anda anggota baru atau yang sudah ada?
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Button
                variant="outline"
                className="h-auto w-full flex-col p-6"
                onClick={() => setShowSignUp(true)}
            >
                <UserPlus className="mb-4 h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">Saya Anggota Baru</span>
                <span className="mt-1 text-sm text-muted-foreground">Buat akun perusahaan</span>
            </Button>
            <Link href="/post-a-job" passHref>
                <Button variant="outline" className="h-auto w-full flex-col p-6">
                    <LogIn className="mb-4 h-12 w-12 text-primary" />
                    <span className="text-lg font-semibold">Saya Anggota Lama</span>
                    <span className="mt-1 text-sm text-muted-foreground">Lanjutkan untuk memposting pekerjaan</span>
                </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
