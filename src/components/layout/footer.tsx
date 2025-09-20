import Link from 'next/link';
import Logo from '@/components/icons/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Logo />
            <p className="max-w-xs text-center text-sm text-primary-foreground/80 md:text-left">
              Your AI-powered partner in finding the perfect career match.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm font-medium md:justify-start">
            <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground">
              About emploi
            </Link>
            <Link href="/jobs" className="text-primary-foreground/80 hover:text-primary-foreground">
              Job Search
            </Link>
            <Link href="/employers" className="text-primary-foreground/80 hover:text-primary-foreground">
              Explore Companies
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 sm:flex-row">
          <p className="text-sm text-primary-foreground/80">
            &copy; {new Date().getFullYear()} emploi. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10" asChild>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10" asChild>
              <Link href="#" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10" asChild>
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
