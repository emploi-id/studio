import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const openPositions = [
  {
    title: 'Insinyur Frontend Senior',
    location: 'Jarak Jauh',
    description: 'Kami mencari Insinyur Frontend berpengalaman untuk membantu membangun masa depan pencarian kerja.',
  },
  {
    title: 'Spesialis AI/ML',
    location: 'San Francisco, CA',
    description: 'Bergabunglah dengan tim AI kami untuk mengembangkan model-model canggih untuk pencocokan pekerjaan dan rekomendasi.',
  },
  {
    title: 'Desainer Produk',
    location: 'New York, NY',
    description: 'Rancang pengalaman pengguna yang indah, intuitif, dan efektif untuk platform kami.',
  },
]

export default function JoinOurTeamPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Bergabung dengan Tim Kami
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Kami dalam misi untuk merevolusi pasar kerja. Jadilah bagian dari perjalanan kami.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-center font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Mengapa Bekerja Dengan Kami?
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Dampak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Buat perbedaan nyata dalam karir dan kehidupan orang-orang.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Inovasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Bekerja dengan AI canggih dan tumpukan teknologi modern.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Budaya</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Lingkungan yang kolaboratif, suportif, dan ramah jarak jauh.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Posisi Terbuka
        </h2>
        <div className="mt-8 space-y-6">
          {openPositions.map((position) => (
            <Card key={position.title}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{position.title}</CardTitle>
                  <CardDescription>{position.location}</CardDescription>
                </div>
                <Link href="/jobs">
                  <Button variant="outline">
                    Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{position.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
