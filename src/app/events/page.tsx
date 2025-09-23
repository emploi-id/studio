import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EventsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Acara Mendatang
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Ikuti webinar, lokakarya, dan acara jaringan kami untuk meningkatkan karir Anda.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Kalender Acara</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Kalender acara kami saat ini sedang diperbarui. Silakan periksa kembali segera untuk daftar webinar mendatang tentang pembuatan resume, keterampilan wawancara, dan pengembangan karir, serta sesi jaringan virtual.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
