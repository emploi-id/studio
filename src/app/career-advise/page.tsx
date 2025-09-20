import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const careerAdviseData = [
    {
        title: "Cara Membuat Resume yang Menonjol",
        content: "Buat resume Anda ringkas, jelas, dan disesuaikan dengan pekerjaan yang Anda lamar. Gunakan kata kunci dari deskripsi pekerjaan. Tonjolkan pencapaian Anda dengan angka dan data. Minta orang lain untuk mengoreksinya untuk menemukan kesalahan ketik."
    },
    {
        title: "Kiat Sukses Wawancara Kerja",
        content: "Riset perusahaan dan peran yang Anda lamar. Siapkan jawaban untuk pertanyaan wawancara umum. Latih jawaban Anda, tetapi jangan menghafalnya. Siapkan beberapa pertanyaan untuk ditanyakan kepada pewawancara. Berpakaian profesional dan datang tepat waktu."
    },
    {
        title: "Jaringan yang Efektif",
        content: "Hadiri acara dan webinar industri. Terhubung dengan para profesional di bidang Anda di LinkedIn. Mintalah wawancara informasional untuk belajar dari orang lain. Tawarkan bantuan kepada orang lain di jaringan Anda. Pertahankan hubungan Anda dengan tetap berhubungan secara teratur."
    },
    {
        title: "Negosiasi Gaji Anda",
        content: "Riset tolok ukur gaji untuk peran dan lokasi Anda. Ketahui nilai Anda dan bersiaplah untuk mengartikulasikannya. Jangan takut untuk meminta apa yang Anda inginkan, tetapi bersikaplah realistis. Bersiaplah untuk menegosiasikan fasilitas lain seperti waktu liburan atau opsi kerja jarak jauh."
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
