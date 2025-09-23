import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Komunitas
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Terhubung dengan rekan-rekan, berbagi wawasan, dan kembangkan jaringan profesional Anda.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Gabung dalam Percakapan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Forum dan grup komunitas kami akan segera hadir. Nantikan ruang untuk terhubung dengan para profesional lain, mengajukan pertanyaan, dan berbagi pengalaman Anda di pasar kerja.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
