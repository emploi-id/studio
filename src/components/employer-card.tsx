import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Building, ArrowRight } from 'lucide-react';
import type { Employer } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type EmployerCardProps = {
  employer: Employer;
};

export default function EmployerCard({ employer }: EmployerCardProps) {
    const employerLogo = PlaceHolderImages.find(img => img.id === employer.logo);

  return (
    <Link href={`/employers/${employer.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-xl">
        <CardHeader className="items-center text-center">
        {employerLogo && (
          <Image
            src={employerLogo.imageUrl}
            alt={`${employer.name} logo`}
            width={80}
            height={80}
            className="mb-4 h-20 w-20 rounded-full border object-contain p-2"
            data-ai-hint={employerLogo.imageHint}
          />
        )}
          <CardTitle className="text-xl group-hover:text-primary">{employer.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{employer.industry}</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{employer.location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
