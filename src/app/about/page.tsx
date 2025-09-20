import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'about-us-hero');

  return (
    <div>
      <div className="relative h-64 w-full md:h-80">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-headline text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            About EmployMatch
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            At EmployMatch, our mission is to revolutionize the job market by leveraging cutting-edge artificial intelligence to create the perfect match between talented professionals and innovative companies. We believe that the right job can transform a person's life, and the right person can transform a business. We're dedicated to making that connection seamless, efficient, and intelligent.
          </p>
        </div>

        <div className="mt-20">
            <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-center text-lg text-muted-foreground">
              The passionate people behind EmployMatch.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { name: "Jane Doe", role: "CEO & Founder", avatar: "JD" },
                    { name: "John Smith", role: "Chief Technology Officer", avatar: "JS" },
                    { name: "Emily White", role: "Head of Product", avatar: "EW" },
                    { name: "Michael Brown", role: "Lead AI Engineer", avatar: "MB" },
                ].map(member => (
                    <Card key={member.name} className="text-center">
                        <CardContent className="p-6">
                            <Avatar className="mx-auto h-24 w-24">
                                <AvatarImage src={`https://picsum.photos/seed/${member.name}/200/200`} data-ai-hint="person photo" />
                                <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                            <p className="text-sm text-primary">{member.role}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
