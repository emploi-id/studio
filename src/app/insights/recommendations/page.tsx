import { getPersonalizedJobRecommendations } from '@/ai/flows/personalized-job-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Star } from 'lucide-react';

// Data pengguna tiruan untuk demonstrasi
const mockUserData = {
  userSkills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'Manajemen Produk'],
  searchHistory: ['Insinyur Perangkat Lunak Senior', 'Manajer Produk Jarak Jauh', 'Pekerjaan startup Fintech'],
  preferences: 'Saya mencari posisi jarak jauh penuh waktu di perusahaan dengan budaya rekayasa yang kuat. Saya tertarik pada sektor fintech dan AI. Harapan gaji di atas $150.000.',
};

export default async function RecommendationsPage() {
  let recommendations: string[] = [];
  let error = '';

  try {
    const result = await getPersonalizedJobRecommendations(mockUserData);
    recommendations = result.jobRecommendations;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Terjadi kesalahan yang tidak diketahui.';
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Rekomendasi Pekerjaan yang Dipersonalisasi
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Berikut adalah pekerjaan yang direkomendasikan hanya untuk Anda, berdasarkan profil dan aktivitas Anda.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Kesalahan</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Rekomendasi Teratas Anda</CardTitle>
              <CardDescription>AI kami telah menyusun daftar pekerjaan ini yang selaras dengan keterampilan dan preferensi Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 rounded-md border p-4">
                    <Star className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="flex-1 text-sm text-foreground">{rec}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        <Card>
            <CardHeader>
                <CardTitle>Profil Anda</CardTitle>
                <CardDescription>Rekomendasi ini didasarkan pada data profil berikut (untuk tujuan demo).</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <h4 className="font-semibold">Keterampilan</h4>
                <p className="text-muted-foreground">{mockUserData.userSkills.join(', ')}</p>
                <h4 className="mt-4 font-semibold">Riwayat Pencarian</h4>
                <p className="text-muted-foreground">{mockUserData.searchHistory.join(', ')}</p>
                <h4 className="mt-4 font-semibold">Preferensi</h4>
                <p className="text-muted-foreground">{mockUserData.preferences}</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
