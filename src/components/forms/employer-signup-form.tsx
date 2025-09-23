'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';

const formSchema = z.object({
  companyName: z.string().min(2, { message: 'Nama perusahaan wajib diisi.' }),
  referralCode: z.string().optional(),
  companyAssets: z.string().min(1, { message: 'Silakan pilih aset perusahaan.' }),
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
  contactName: z.string().min(2, { message: 'PIC Kontak wajib diisi.' }),
  jobTitle: z.string().min(2, { message: 'Jabatan wajib diisi.' }),
  phoneNumber: z.string().optional(),
  mobileNumber: z.string().optional(),
  password: z.string().min(8, { message: 'Kata sandi harus minimal 8 karakter.' }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  onBack: () => void;
  onSuccess?: () => void;
};

export default function EmployerSignUpForm({ onBack, onSuccess }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      referralCode: '',
      companyAssets: '',
      email: '',
      contactName: '',
      jobTitle: '',
      phoneNumber: '',
      mobileNumber: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    alert('Akun perusahaan berhasil dibuat! Selamat datang di Emploi.');
    form.reset();
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <CardHeader className="relative text-center">
        <Button variant="ghost" size="icon" className="absolute left-4 top-4" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <CardTitle className="font-headline text-3xl font-bold">Buat Akun Perusahaan</CardTitle>
        <CardDescription>
          Bergabunglah sebagai Perusahaan untuk menemukan talenta terbaik. Sudah punya akun?{' '}
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
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Perusahaan</FormLabel>
                  <FormControl>
                    <Input placeholder="cth. Innovate Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
            <FormField
              control={form.control}
              name="companyAssets"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Aset Perusahaan</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="<5M" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          &lt; 5 M
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="5M-10M" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          5 M - 10 M
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value=">10M" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          &gt; 10 M
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                    <Input type="email" placeholder="cth. jane.doe@company.com" {...field} />
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
                  <FormLabel>Kontak PIC</FormLabel>
                  <FormControl>
                    <Input placeholder="cth. Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <Input placeholder="cth. Manajer Perekrutan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nomor Telepon (Opsional)</FormLabel>
                    <FormControl>
                        <Input placeholder="+62 (XXX) XXX-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nomor Ponsel (Opsional)</FormLabel>
                    <FormControl>
                        <Input placeholder="+62 XXX-XXXX-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
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
              Buat Akun Perusahaan
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
