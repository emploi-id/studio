import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className="font-headline text-xl font-bold lowercase">emploi</span>
    </Link>
  );
}
