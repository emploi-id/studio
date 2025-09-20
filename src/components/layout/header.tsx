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
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About emploi' },
  { href: '/jobs', label: 'Job Search' },
  {
    href: '#',
    label: 'Explore Companies',
    dropdown: [
      { href: '/employers', label: 'Explore Companies' },
      { href: '/request-talent', label: 'Request Talent' },
      { href: '/career-advise', label: 'Career Advise' },
    ],
  },
  { href: '/insights', label: 'Career Development' },
  { href: '/request-talent', label: 'Post a Job' },
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
                'group flex items-center gap-1 text-sm font-medium transition-colors hover:text-white focus:bg-transparent focus:outline-none focus-visible:ring-0',
                isDropdownActive
                  ? 'text-white'
                  : 'text-primary-foreground/80'
              )}
            >
              {label}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropdown.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>
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
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary">
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
              <Button variant="ghost" size="icon" className="hover:bg-primary/80 hover:text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
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
            <Button variant="ghost" className="text-primary-foreground/80 hover:bg-primary/80 hover:text-white">Log In</Button>
            <Button variant="secondary" className="border border-transparent bg-white/20 text-white hover:bg-white/30">Sign Up</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
