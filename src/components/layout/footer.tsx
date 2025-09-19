import Link from 'next/link';
import Logo from '@/components/icons/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Logo />
            <p className="max-w-xs text-center text-sm text-primary-foreground/80 md:text-left">
              Mitra bertenaga AI Anda dalam menemukan pasangan karir yang sempurna.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm font-medium md:justify-start">
            <Link href="/about" className="text-primary-foreground/80 hover:text-white">
              Tentang emploi
            </Link>
            <Link href="/jobs" className="text-primary-foreground/80 hover:text-white">
              Pekerjaan
            </Link>
            <Link href="/employers" className="text-primary-foreground/80 hover:text-white">
              Perusahaan
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-white">
              Kebijakan pribadi
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-white">
              Ketentuan Layanan
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-primary/20 pt-8 sm:flex-row">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} emploi. Seluruh hak cipta.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="hover:bg-white/10">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-white/10">
              <Link href="#" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-white/10">
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
