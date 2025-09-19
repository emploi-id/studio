import Link from 'next/link';
import Logo from '@/components/icons/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Logo />
            <p className="max-w-xs text-center text-sm text-muted-foreground md:text-left">
              Mitra bertenaga AI Anda dalam menemukan pasangan karir yang sempurna.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm font-medium md:justify-start">
            <Link href="/about" className="hover:text-primary">
              Tentang emploi
            </Link>
            <Link href="/jobs" className="hover:text-primary">
              Pekerjaan
            </Link>
            <Link href="/employers" className="hover:text-primary">
              Perusahaan
            </Link>
            <Link href="#" className="hover:text-primary">
              Kebijakan pribadi
            </Link>
            <Link href="#" className="hover:text-primary">
              Ketentuan Layanan
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} emploi. Seluruh hak cipta.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
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
