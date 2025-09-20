import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { employers, jobs } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  MapPin,
  Building,
  Globe,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import JobCard from '@/components/job-card';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return employers.map((employer) => ({
    id: employer.id,
  }));
}

export default function EmployerDetailPage({ params }: Props) {
  const employer = employers.find((e) => e.id === params.id);
  
  if (!employer) {
    notFound();
  }
  
  const employerJobs = jobs.filter(job => job.companyId === employer.id);
  const employerLogo = PlaceHolderImages.find(img => img.id === employer.logo);

  return (
    <div>
        <div className="bg-card py-16">
            <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center md:flex-row md:text-left">
                {employerLogo && (
                    <Image
                        src={employerLogo.imageUrl}
                        alt={`${employer.name} logo`}
                        width={120}
                        height={120}
                        className="h-32 w-32 rounded-xl border-4 border-background object-contain p-2"
                        data-ai-hint={employerLogo.imageHint}
                    />
                )}
                <div className="flex-1">
                    <h1 className="font-headline text-4xl font-bold">{employer.name}</h1>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground md:justify-start">
                        <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" /> <span>{employer.industry}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> <span>{employer.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <Link href={employer.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                Kunjungi Situs Web
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <div>
                        <h2 className="font-headline text-2xl font-bold">Tentang {employer.name}</h2>
                        <p className="mt-4 text-foreground/80">{employer.about}</p>
                    </div>
                    <div>
                        <h2 className="font-headline text-2xl font-bold">Budaya Perusahaan</h2>
                        <p className="mt-4 text-foreground/80">{employer.culture}</p>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="font-headline text-xl font-bold">Info Kontak</h2>
                            <p className="mt-4 text-sm text-foreground/80">
                                Di sinilah informasi kontak perusahaan akan ditampilkan.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="font-headline text-2xl font-bold">Posisi Terbuka di {employer.name}</h2>
                {employerJobs.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {employerJobs.map(job => <JobCard key={job.id} job={job} />)}
                    </div>
                ) : (
                    <p className="mt-4 text-muted-foreground">Saat ini tidak ada posisi terbuka di {employer.name}.</p>
                )}
            </div>
        </div>
    </div>
  );
}
