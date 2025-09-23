'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama wajib diisi.' }),
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  password: z.string().min(8, { message: 'Kata sandi harus minimal 8 karakter.' }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onBack: () => void;
};

export default function JobSeekerSignUpForm({ onBack }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    alert('Akun berhasil dibuat! Selamat datang di Emploi.');
    form.reset();
  };

  return (
    <>
      <CardHeader className="relative text-center">
        <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <CardTitle className="font-headline text-3xl font-bold">Buat Akun Anda</CardTitle>
        <CardDescription>
          Bergabunglah sebagai Pencari Kerja untuk menemukan pekerjaan impian Anda. Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Masuk.
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="cth. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              control={form.control}
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
              Daftar
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
