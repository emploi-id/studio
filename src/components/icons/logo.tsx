import { Briefcase } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Briefcase className="mr-2 h-6 w-6" />
      <span className="font-headline text-xl font-bold">EmployMatch</span>
    </div>
  );
}
