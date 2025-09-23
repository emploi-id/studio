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
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(1, { message: 'Kata sandi wajib diisi.' }),
});

const employerSchema = z.object({
  memberId: z.string().min(1, { message: 'ID Anggota wajib diisi.' }),
  password: z.string().min(1, { message: 'Kata sandi wajib diisi.' }),
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
    defaultValues: { memberId: '', password: '', referralCode: '' },
  });

  const onJobSeekerSubmit: SubmitHandler<JobSeekerFormValues> = (data) => {
    console.log('Login Pencari Kerja:', data);
    alert('Anda telah berhasil masuk sebagai Pencari Kerja!');
    jobSeekerForm.reset();
  };

  const onEmployerSubmit: SubmitHandler<EmployerFormValues> = (data) => {
    console.log('Login Perusahaan:', data);
    alert('Anda telah berhasil masuk sebagai Perusahaan!');
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
              <CardTitle className="font-headline text-3xl font-bold">Masuk</CardTitle>
              <CardDescription>Pertama, beri tahu kami siapa Anda.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Button
                variant="outline"
                className="h-auto flex-col p-6"
                onClick={() => setRole('seeker')}
              >
                <User className="mb-4 h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">Saya Pencari Kerja</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col p-6"
                onClick={() => setRole('employer')}
              >
                <Building className="mb-4 h-12 w-12 text-primary" />
                <span className="text-lg font-semibold">Saya Perusahaan</span>
              </Button>
            </CardContent>
             <div className="px-6 pb-6 text-center text-sm">
                Belum punya akun?{' '}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                    Daftar
                </Link>
            </div>
          </>
        ) : role === 'seeker' ? (
          <>
            <CardHeader className="relative text-center">
                <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={handleBack}>
                    <ArrowLeft />
                </Button>
                <CardTitle className="font-headline text-3xl font-bold">Masuk Pencari Kerja</CardTitle>
                <CardDescription>
                  Selamat datang kembali di Emploi. Belum punya akun?{' '}
                  <Link href="/signup" className="font-medium text-primary hover:underline">
                    Daftar.
                  </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...jobSeekerForm}>
                <form onSubmit={jobSeekerForm.handleSubmit(onJobSeekerSubmit)} className="space-y-6">
                  <FormField
                    control={jobSeekerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="cth. johndoe@example.com" {...field} />
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
                        <FormLabel>Kata Sandi</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Masuk
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm">
                  <button onClick={() => setRole('employer')} className="text-primary hover:underline">
                    Masuk sebagai Perusahaan
                  </button>
              </div>
            </CardContent>
          </>
        ) : (
            <>
            <CardHeader className="relative text-center">
                <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={handleBack}>
                    <ArrowLeft />
                </Button>
                <CardTitle className="font-headline text-3xl font-bold">Masuk Perusahaan</CardTitle>
                <CardDescription>
                  Selamat datang kembali di Emploi.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...employerForm}>
                <form onSubmit={employerForm.handleSubmit(onEmployerSubmit)} className="space-y-6">
                   <FormField
                    control={employerForm.control}
                    name="memberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Anggota</FormLabel>
                        <FormControl>
                          <Input placeholder="ID Anggota Anda" {...field} />
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
                        <FormLabel>Kata Sandi</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
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
                        <FormLabel>Kode Referensi (Opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan kode referensi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Masuk
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm">
                  <button onClick={() => setRole('seeker')} className="text-primary hover:underline">
                    Masuk sebagai Pencari Kerja
                  </button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
