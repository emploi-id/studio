
import Link from 'next/link';
import Logo from '@/components/icons/logo';
import { Instagram, Facebook, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Logo />
            <p className="max-w-xs text-center text-sm text-primary-foreground/80 md:text-left">
              Your AI-powered partner in finding the perfect career match.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center text-sm font-medium md:grid-cols-4 md:text-left">
            <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">Job Search</h4>
                <Link href="/jobs" className="text-primary-foreground/80 hover:text-primary-foreground">Find a Job</Link>
            </div>
            <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">Employers</h4>
                <Link href="/employers" className="text-primary-foreground/80 hover:text-primary-foreground">Find a Company</Link>
                <Link href="/request-talent" className="text-primary-foreground/80 hover:text-primary-foreground">Post a Job</Link>
            </div>
             <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">Career Development</h4>
                <Link href="/career-advise" className="text-primary-foreground/80 hover:text-primary-foreground">Career Advise</Link>
                <Link href="/events" className="text-primary-foreground/80 hover:text-primary-foreground">Events</Link>
                <Link href="/training" className="text-primary-foreground/80 hover:text-primary-foreground">Training</Link>
                <Link href="/community" className="text-primary-foreground/80 hover:text-primary-foreground">Community</Link>
                <Link href="/resources" className="text-primary-foreground/80 hover:text-primary-foreground">Resources</Link>
            </div>
            <div className="flex flex-col space-y-2">
                <h4 className="font-bold text-primary-foreground">About Us</h4>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground">About emploi</Link>
                <Link href="/join-our-team" className="text-primary-foreground/80 hover:text-primary-foreground">Join Our Team</Link>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">Contact</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-primary-foreground/20 pt-8 sm:flex-row">
          <p className="flex-1 text-center text-sm text-primary-foreground/80 sm:text-left">
            &copy; {new Date().getFullYear()} emploi. All rights reserved.
          </p>
          <div className="flex flex-1 items-center justify-center gap-2">
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
          <div className="hidden flex-1 sm:block"></div>
        </div>
      </div>
    </footer>
  );
}
