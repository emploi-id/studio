import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { jobs } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  MapPin,
  Briefcase,
  CalendarDays,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export default function JobDetailPage({ params }: Props) {
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  const jobImage = PlaceHolderImages.find((img) =>
    img.id.startsWith('job-detail')
  );
  const companyLogo = PlaceHolderImages.find(
    (img) => img.id === job.companyLogo
  );

  return (
    <div>
      <div className="relative h-48 w-full bg-primary/20 md:h-64">
        {jobImage && (
          <Image
            src={jobImage.imageUrl}
            alt={jobImage.description}
            fill
            className="object-cover"
            data-ai-hint={jobImage.imageHint}
          />
        )}
      </div>

      <div className="container mx-auto -mt-16 px-4">
        <Card className="p-6">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            {companyLogo && (
              <Image
                src={companyLogo.imageUrl}
                alt={`${job.companyName} logo`}
                width={100}
                height={100}
                className="h-24 w-24 rounded-xl border-4 border-background object-contain p-1"
                data-ai-hint={companyLogo.imageHint}
              />
            )}
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2">
                {job.category}
              </Badge>
              <h1 className="font-headline text-3xl font-bold">{job.title}</h1>
              <Link
                href={`/employers/${job.companyId}`}
                className="text-lg text-muted-foreground hover:text-primary"
              >
                {job.companyName}
              </Link>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> <span>{job.type}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> <span>{job.salary}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />{' '}
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full sm:w-auto">Apply Now</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apply to {job.title}</DialogTitle>
                  <DialogDescription>
                    Your application will be sent directly to {job.companyName}. This is a demo application.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-center">
                    <p>Application submitted successfully!</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-headline text-xl font-bold">
                  Job Description
                </h2>
                <p className="mt-4 whitespace-pre-line text-foreground/80">
                  {job.longDescription}
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="font-headline text-xl font-bold">
                  Requirements
                </h2>
                <ul className="mt-4 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-foreground/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
