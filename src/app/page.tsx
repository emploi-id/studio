import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Search,
  Building,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { featuredJobs, topEmployers } from '@/lib/data';
import JobCard from '@/components/job-card';
import EmployerCard from '@/components/employer-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="bg-card py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Find Your Dream Job with emploi
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our AI-powered platform connects you with the perfect career
                opportunity. Explore jobs, get resume feedback, and land your
                next role.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/jobs">
                  <Button size="lg">
                    Browse Jobs <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href="/insights">
                  <Button size="lg" variant="secondary">
                    AI Career Tools
                  </Button>
                </Link>
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
              Featured Jobs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore some of the most exciting roles available right now.
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
                View All Jobs <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-card py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Top Companies
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover great places to work.
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
                View All Companies <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
