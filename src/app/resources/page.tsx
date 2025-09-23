import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Sumber Daya Karir
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Kumpulan artikel, templat, dan panduan yang dikurasi untuk membantu Anda sukses.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Perpustakaan Sumber Daya</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Kami sedang membangun perpustakaan sumber daya yang komprehensif, termasuk templat resume, contoh surat lamaran, panduan negosiasi gaji, dan laporan industri. Bagian ini akan segera tersedia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
