import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrainingPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pelatihan Profesional
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Tingkatkan keterampilan dan tetap kompetitif dengan kursus pelatihan yang dipimpin oleh para ahli kami.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Katalog Kursus</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Program pelatihan kami sedang dalam pengembangan. Kami akan segera menawarkan berbagai kursus yang mencakup keterampilan terkini yang paling diminati, dari sertifikasi teknis hingga pengembangan keterampilan lunak.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
