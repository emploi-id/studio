import { employers } from '@/lib/data';
import EmployerCard from '@/components/employer-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function EmployersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 rounded-lg bg-card p-6 shadow-sm">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Discover Great Companies
        </h1>
        <p className="mt-2 text-muted-foreground">
          Learn about the culture and opportunities at top employers.
        </p>
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by company name or industry..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {employers.map((employer) => (
          <EmployerCard key={employer.id} employer={employer} />
        ))}
      </div>
    </div>
  );
}
