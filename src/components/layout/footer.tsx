
import Link from 'next/link';
import { Instagram, Facebook, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center">
                <span className="font-headline text-xl font-bold lowercase">emploi</span>
            </Link>
            <p className="max-w-xs text-center text-sm text-primary-foreground/80 md:text-left">
              Mitra bertenaga AI Anda dalam menemukan pasangan karir yang sempurna.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center text-sm font-medium md:grid-cols-4 md:text-left">
            <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">Cari Kerja</h4>
                <Link href="/jobs" className="text-primary-foreground/80 hover:text-primary-foreground">Cari Lowongan</Link>
            </div>
            <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">Perusahaan</h4>
                <Link href="/employers" className="text-primary-foreground/80 hover:text-primary-foreground">Cari Perusahaan</Link>
                <Link href="/request-talent" className="text-primary-foreground/80 hover:text-primary-foreground">Posting Lowongan</Link>
            </div>
             <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">Pengembangan Karir</h4>
                <Link href="/career-advise" className="text-primary-foreground/80 hover:text-primary-foreground">Saran Karir</Link>
                <Link href="/events" className="text-primary-foreground/80 hover:text-primary-foreground">Acara</Link>
                <Link href="/training" className="text-primary-foreground/80 hover:text-primary-foreground">Pelatihan</Link>
                <Link href="/community" className="text-primary-foreground/80 hover:text-primary-foreground">Komunitas</Link>
                <Link href="/resources" className="text-primary-foreground/80 hover:text-primary-foreground">Sumber Daya</Link>
            </div>
            <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">Tentang emploi</h4>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground">Tentang emploi</Link>
                <Link href="/join-our-team" className="text-primary-foreground/80 hover:text-primary-foreground">Bergabung dengan Tim Kami</Link>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">Kontak</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-between border-t border-primary-foreground/20 pt-8 sm:flex-row">
            <p className="text-sm text-primary-foreground/80">
                &copy; {new Date().getFullYear()} emploi. Semua hak dilindungi.
            </p>
            <div className="mb-4 flex items-center justify-center gap-2 sm:mb-0">
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10" asChild>
                <Link href="#" aria-label="Instagram">
                    <Instagram className="h-4 w-4" />
                </Link>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10" asChild>
                <Link href="#" aria-label="Facebook">
                    <Facebook className="h-4 w-4" />
                </Link>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10" asChild>
                <Link href="#" aria-label="WhatsApp">
                    <MessageSquare className="h-4 w-4" />
                </Link>
                </Button>
            </div>
        </div>
      </div>
    </footer>
  );
}
