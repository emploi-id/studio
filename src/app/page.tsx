'use client'
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { featuredJobs, topEmployers } from '@/lib/data';
import JobCard from '@/components/job-card';
import EmployerCard from '@/components/employer-card';
import { useUser } from '@/firebase';

// TODO: Replace with actual authentication check


export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const { user } = useUser();
  const isAdmin = !!user;


  return (
    <div className="flex flex-col">
      <section className="bg-card py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Temukan Pekerjaan Impian Anda dengan Emploi
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Platform bertenaga AI kami menghubungkan Anda dengan
                peluang karir yang sempurna. Jelajahi pekerjaan, dapatkan umpan balik resume, dan
                dapatkan peran Anda berikutnya.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/jobs">
                  <Button size="lg">
                    Telusuri Pekerjaan <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/insights">
                    <Button size="lg" variant="secondary">
                      Alat Karir AI
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="relative h-80 w-full lg:h-full">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="rounded-xl object-cover shadow-xl"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Pekerjaan Unggulan
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Jelajahi beberapa peran paling menarik yang tersedia saat ini.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/jobs">
              <Button variant="outline">
                Lihat Semua Pekerjaan <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-card py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Perusahaan Teratas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Temukan tempat-tempat hebat untuk bekerja.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {topEmployers.map((employer) => (
              <EmployerCard key={employer.id} employer={employer} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/employers">
              <Button variant="outline">
                Lihat Semua Perusahaan <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
