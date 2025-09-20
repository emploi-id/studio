import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PenSquare, Wand2, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  {
    icon: PenSquare,
    title: 'Poles Resume AI',
    description: 'Dapatkan umpan balik bertenaga AI untuk mengoptimalkan resume Anda untuk setiap lamaran pekerjaan.',
    href: '/insights/resume-polisher',
  },
  {
    icon: Wand2,
    title: 'Pencocok Keterampilan',
    description: 'Cocokkan keterampilan dan pengalaman Anda dengan peluang kerja yang sempurna.',
    href: '/insights/skills-matcher',
  },
  {
    icon: Star,
    title: 'Rekomendasi yang Dipersonalisasi',
    description: 'Terima rekomendasi pekerjaan yang disesuaikan dengan profil dan preferensi unik Anda.',
    href: '/insights/recommendations',
  },
];

export default function InsightsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Alat Karir Berbasis AI
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Manfaatkan kekuatan kecerdasan buatan untuk mempercepat pencarian kerja Anda dan meningkatkan profil karir Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <tool.icon className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4 text-xl">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{tool.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
                <Link href={tool.href}>
                    <Button variant="outline" className="w-full">
                        Gunakan Alat <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
