'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  companyName: z.string().min(2, { message: 'Nama perusahaan harus diisi.' }),
  contactName: z.string().min(2, { message: 'Nama kontak harus diisi.' }),
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  phone: z.string().optional(),
  roleTitle: z.string().min(2, { message: 'Judul peran harus diisi.' }),
  jobDescription: z.string().min(10, { message: 'Deskripsi pekerjaan harus lebih dari 10 karakter.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RequestTalentPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      roleTitle: '',
      jobDescription: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    alert('Permintaan Anda telah dikirim! Kami akan segera menghubungi Anda.');
    form.reset();
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">Request Talent</CardTitle>
          <CardDescription>
            Beri tahu kami siapa yang Anda cari, dan kami akan menghubungkan Anda dengan talenta terbaik.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Perusahaan</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Innovate Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kontak</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: John Doe" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contoh@perusahaan.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon (Opsional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+62 812 3456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="roleTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posisi yang Dibutuhkan</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Pekerjaan & Persyaratan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Jelaskan peran, tanggung jawab, dan kualifikasi yang Anda cari..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Kirim Permintaan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
