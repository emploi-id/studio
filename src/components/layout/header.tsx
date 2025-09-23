
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

// TODO: Replace with actual authentication check
const isAdmin = false;

const navLinks = [
  { href: '/', label: 'Beranda' },
  {
    label: 'Pencarian Kerja',
    href: '/jobs',
    dropdown: [{ href: '/jobs', label: 'Cari Pekerjaan' }],
  },
  {
    label: 'Perusahaan',
    href: '/employers',
    dropdown: [
      { href: '/employers', label: 'Cari Perusahaan' },
      { href: '/request-talent', label: 'Posting Pekerjaan' },
    ],
  },
  {
    label: 'Pengembangan Karir',
    href: '#',
    dropdown: [
      { href: '/insights', label: 'Gambaran', admin: true },
      {
        href: '/insights/resume-polisher',
        label: 'Pemoles Resume AI',
        admin: true,
      },
      { href: '/insights/skills-matcher', label: 'Pencocok Keterampilan', admin: true },
      {
        href: '/insights/recommendations',
        label: 'Rekomendasi yang Dipersonalisasi',
        admin: true,
      },
      { href: '/career-advise', label: 'Saran Karir' },
      { href: '/events', label: 'Acara' },
      { href: '/training', label: 'Pelatihan' },
      { href: '/community', label: 'Komunitas' },
      { href: '/resources', label: 'Sumber Daya' },
    ],
  },
  {
    label: 'Tentang Kami',
    href: '/about',
    dropdown: [
      { href: '/about', label: 'Tentang Emploi' },
      { href: '/join-our-team', label: 'Bergabung dengan Tim Kami' },
      { href: '/contact', label: 'Kontak' },
    ],
  },
];

const NavLinkContent = ({
  href,
  label,
  dropdown,
}: {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;
  const isDropdownActive = dropdown?.some((item) => pathname === item.href);

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary-foreground',
        isActive || isDropdownActive
          ? 'text-primary-foreground'
          : 'text-primary-foreground/80'
      )}
    >
      {label}
    </Link>
  );
};

const NavLink = ({
  href,
  label,
  dropdown,
}: {
  href?: string;
  label: string;
  dropdown?: { href: string; label: string; admin?: boolean }[];
}) => {
  if (dropdown && href) {
    const visibleDropdownItems = dropdown.filter(
      (item) => !item.admin || isAdmin
    );
    return (
      <div className="flex items-center">
        <NavLinkContent href={href} label={label} dropdown={dropdown} />
        {visibleDropdownItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'group h-auto w-6 shrink-0 flex items-center gap-1 text-sm font-medium transition-colors focus:bg-transparent focus:outline-none focus-visible:ring-0 hover:bg-primary-foreground/10',
                  'text-primary-foreground/80'
                )}
              >
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {visibleDropdownItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  }

  if (href) {
    return <NavLinkContent href={href} label={label} />;
  }

  return null;
};

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-foreground/20 bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center">
            <span className="font-headline text-xl font-bold lowercase">emploi</span>
          </Link>
        </div>
        

        {/* Mobile Menu */}
        <div className="flex flex-1 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary-foreground/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="flex items-center">
                <span className="font-headline text-xl font-bold lowercase">emploi</span>
              </Link>
              <div className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <p className="text-lg font-medium">{link.label}</p>
                      <div className="ml-4 mt-2 flex flex-col space-y-2">
                        {link.dropdown
                          .filter((item) => !item.admin || isAdmin)
                          .map((item) => (
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

        <nav className="hidden flex-1 items-center justify-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>

        <div className="flex items-center justify-end">
          <nav className="flex items-center">
            <Link href="/request-talent" passHref>
              <Button
                variant="outline"
                className="mr-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Posting Pekerjaan
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button variant="secondary">Daftar</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
