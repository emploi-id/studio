'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
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
  { href: '/about', label: 'Tentang Kami' },
  { href: '/jobs', label: 'Cari Kerja' },
  {
    label: 'Jelajahi Perusahaan',
    dropdown: [
      { href: '/employers', label: 'Daftar Perusahaan' },
      { href: '/request-talent', label: 'Minta Bakat' },
      { href: '/career-advise', label: 'Nasihat Karir' },
    ],
  },
  { href: '/insights', label: 'Pengembangan Karir' },
  { href: '/request-talent', label: 'Posting Lowongan' },
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
                'group flex items-center gap-1 text-sm font-medium transition-colors focus:bg-transparent focus:outline-none focus-visible:ring-0 text-primary-foreground/80 hover:text-primary-foreground',
                isDropdownActive ? 'text-primary-foreground' : ''
              )}
            >
              {label}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropdown.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
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
          'text-sm font-medium transition-colors text-primary-foreground/80 hover:text-primary-foreground',
          isActive ? 'text-primary-foreground' : ''
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-foreground/20 bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center">
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
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
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

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Button variant="outline" className="mr-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Minta Bakat
            </Button>
            <Button variant="secondary">Daftar</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
