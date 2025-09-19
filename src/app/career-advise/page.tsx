import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const careerAdviseData = [
    {
        title: "Cara Membuat Resume yang Menonjol",
        content: "Pastikan resume Anda ringkas, jelas, dan disesuaikan dengan pekerjaan yang Anda lamar. Gunakan kata kunci dari deskripsi pekerjaan. Sorot pencapaian Anda dengan angka dan data. Minta orang lain untuk mengoreksi resume Anda untuk menghindari kesalahan ketik."
    },
    {
        title: "Kiat Sukses Wawancara Kerja",
        content: "Lakukan riset tentang perusahaan dan peran yang Anda lamar. Siapkan jawaban untuk pertanyaan umum wawancara. Latih jawaban Anda, tetapi jangan menghafalnya. Siapkan beberapa pertanyaan untuk ditanyakan kepada pewawancara. Berpakaianlah secara profesional dan datang tepat waktu."
    },
    {
        title: "Membangun Jaringan Secara Efektif",
        content: "Hadiri acara industri dan webinar. Terhubung dengan para profesional di bidang Anda di LinkedIn. Mintalah obrolan informasional untuk belajar dari orang lain. Tawarkan bantuan kepada orang lain dalam jaringan Anda. Jaga hubungan Anda dengan tetap berhubungan secara teratur."
    },
    {
        title: "Negosiasi Gaji Anda",
        content: "Lakukan riset tentang standar gaji untuk peran dan lokasi Anda. Ketahui nilai Anda dan bersiaplah untuk mengartikulasikannya. Jangan takut untuk meminta apa yang Anda inginkan, tetapi bersikaplah realistis. Bersiaplah untuk menegosiasikan fasilitas lain seperti waktu liburan atau opsi kerja jarak jauh."
    }
];

export default function CareerAdvisePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Nasihat Karir
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Temukan kiat dan wawasan ahli untuk membantu Anda maju dalam karir Anda.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Topik Populer</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {careerAdviseData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg">{item.title}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
