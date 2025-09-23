'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { jobCategories, jobLocations } from '@/lib/data';

const jobSchema = z.object({
  jobTitle: z.string().min(1, 'Judul pekerjaan wajib diisi.'),
  category: z.string().min(1, 'Kategori wajib diisi.'),
  jobType: z.string().min(1, 'Jenis pekerjaan wajib diisi.'),
  location: z.string().min(1, 'Lokasi wajib diisi.'),
  salaryRange: z.string().optional(),
  description: z.string().min(20, 'Deskripsi harus minimal 20 karakter.'),
  requirements: z.string().min(10, 'Persyaratan harus minimal 10 karakter.'),
  companyName: z.string().min(1, 'Nama perusahaan wajib diisi.'),
  companyWebsite: z.string().url('Silakan masukkan URL yang valid.').optional(),
  applyLink: z.string().email('Silakan masukkan email yang valid.').or(z.string().url('Silakan masukkan URL yang valid.')),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function PostAJobPage() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
        jobTitle: '',
        category: '',
        jobType: '',
        location: '',
        salaryRange: '',
        description: '',
        requirements: '',
        companyName: '',
        companyWebsite: '',
        applyLink: ''
    }
  });

  const onSubmit: SubmitHandler<JobFormValues> = (data) => {
    console.log('Posting Pekerjaan Baru:', data);
    alert('Pekerjaan Anda telah berhasil diposting!');
    form.reset();
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">
            Posting Lowongan
          </CardTitle>
          <CardDescription>
            Isi formulir di bawah ini untuk membuat daftar pekerjaan Anda. Kami akan membantu Anda
            menemukan kandidat terbaik.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Pekerjaan</FormLabel>
                    <FormControl>
                      <Input placeholder="cth. Insinyur Perangkat Lunak Senior" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobCategories.map(cat => (
                             <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Pekerjaan</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis pekerjaan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-Time">Purna Waktu</SelectItem>
                          <SelectItem value="Part-Time">Paruh Waktu</SelectItem>
                          <SelectItem value="Contract">Kontrak</SelectItem>
                          <SelectItem value="Internship">Magang</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lokasi</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih lokasi" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {jobLocations.map(loc => (
                                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rentang Gaji (Opsional)</FormLabel>
                        <FormControl>
                        <Input placeholder="cth. Rp 10.000.000 - Rp 15.000.000" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Pekerjaan</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Jelaskan peran dan tanggung jawab..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persyaratan</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Sebutkan keahlian dan kualifikasi utama..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="border-t pt-6 font-headline text-2xl font-bold">Detail Perusahaan</h3>
               
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nama Perusahaan</FormLabel>
                        <FormControl>
                        <Input placeholder="Nama perusahaan Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="companyWebsite"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Situs Web Perusahaan (Opsional)</FormLabel>
                        <FormControl>
                        <Input placeholder="https://perusahaananda.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="applyLink"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cara Melamar</FormLabel>
                        <FormControl>
                        <Input placeholder="Masukkan email atau tautan aplikasi" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />


              <Button type="submit" className="w-full" size="lg">
                Kirim Postingan Lowongan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
