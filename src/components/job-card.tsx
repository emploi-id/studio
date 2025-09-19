import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find(img => img.id === job.companyLogo);

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4">
        {companyLogo && (
            <Image
              src={companyLogo.imageUrl}
              alt={`${job.companyName} logo`}
              width={56}
              height={56}
              className="h-14 w-14 rounded-lg border object-contain p-1"
              data-ai-hint={companyLogo.imageHint}
            />
        )}
        <div className="flex-1">
          <CardTitle className="text-xl">
            <Link href={`/jobs/${job.id}`} className="hover:underline">
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription className="mt-1">
            <Link href={`/employers/${job.companyId}`} className="hover:underline">
                {job.companyName}
            </Link>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{job.type}</Badge>
            {job.salary && <Badge variant="secondary">{job.salary}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 border-t pt-4">
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Posted {job.postedAt}
          </span>
          <Link href={`/jobs/${job.id}`}>
            <Button variant="outline" size="sm">
              Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
