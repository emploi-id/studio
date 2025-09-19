'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Briefcase, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Logo from '@/components/icons/logo';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang emploi' },
  { href: '/jobs', label: 'Cari Kerja' },
  {
    label: 'Jelajahi Perusahaan',
    dropdown: [
      { href: '/employers', label: 'Jelajahi Perusahaan' },
      { href: '/request-talent', label: 'Request Talent' },
      { href: '/career-advise', label: 'Career Advise' },
    ],
  },
  { href: '/insights', label: 'Pengembangan Karir' },
  { href: '/post-job', label: 'Posting Lowongan' },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({
    href,
    label,
    dropdown,
  }: {
    href?: string;
    label: string;
    dropdown?: { href: string; label: string }[];
  }) => {
    const isActive = href ? pathname === href : false;
    const isDropdownActive = dropdown?.some((item) => pathname === item.href);

    if (dropdown) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'group flex items-center gap-1 text-sm font-medium transition-colors hover:bg-transparent hover:text-white focus:bg-transparent focus:outline-none focus-visible:ring-0',
                isDropdownActive
                  ? 'text-white'
                  : 'text-primary-foreground/80'
              )}
            >
              {label}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-primary border-primary/20 text-primary-foreground">
            {dropdown.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="hover:!bg-white/10 hover:!text-white">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link
        href={href!}
        className={cn(
          'text-sm font-medium transition-colors hover:text-white',
          isActive ? 'text-white' : 'text-primary-foreground/80'
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary text-primary-foreground">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
              <div className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <p className="text-lg font-medium">{link.label}</p>
                      <div className="ml-4 mt-2 flex flex-col space-y-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-base font-medium text-muted-foreground"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href!}
                      className="text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" className="hover:bg-white/10">
            Masuk
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-primary-foreground hover:bg-white/30"
          >
            Daftar
          </Button>
        </div>
      </div>
    </header>
  );
}
