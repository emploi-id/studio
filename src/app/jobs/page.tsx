'use client';

import { useState } from 'react';
import { jobs, jobCategories } from '@/lib/data';
import JobCard from '@/components/job-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const jobLocations = [
  "Bekasi",
  "Bogor",
  "Depok",
  "Jakarta",
  "Semua Lokasi",
  "Tangerang",
  "Tangerang Selatan",
];

const salaryRanges = [
  'IDR 5.000.000 - IDR 10.000.000',
  'IDR 10.000.000 - IDR 15.000.000',
  'IDR 15.000.000 - 20.000.000',
  '> IDR 20.000.000',
];

const jobStatuses = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Hybrid', 'Remote'];

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [category, setCategory] = useState('all');
  const [salaryRange, setSalaryRange] = useState('all');
  const [status, setStatus] = useState('all');

  const filteredJobs = jobs.filter((job) => {
    const jobStatus = job.type;
    const isRemote = job.location === 'Remote';

    // Simple text match for salary until data structure is updated
    const salaryMatch =
      salaryRange === 'all' || (job.salary && job.salary.includes(salaryRange.substring(4,9))); 

    const statusMatch = () => {
      if (status === 'all') return true;
      if (status.toLowerCase() === 'remote') return isRemote;
      // The other statuses like Hybrid and Freelance aren't in the data yet,
      // but this logic will handle them when they are.
      return jobStatus.toLowerCase() === status.toLowerCase();
    }

    return (
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (location === 'all' || location === 'Semua Lokasi' || job.location === location) &&
      (category === 'all' || job.category === category) &&
      statusMatch() &&
      salaryMatch
    );
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 rounded-lg bg-card p-6 shadow-sm">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Find Your Next Role
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse through thousands of open positions.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="relative lg:col-span-3 xl:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Job title, keywords, or company"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Lokasi</SelectItem>
              {jobLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {jobCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Select value={salaryRange} onValueChange={setSalaryRange}>
            <SelectTrigger>
              <SelectValue placeholder="Salary Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Salary Ranges</SelectItem>
              {salaryRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {jobStatuses.map((stat) => (
                <SelectItem key={stat} value={stat}>
                  {stat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <h3 className="text-xl font-semibold">No jobs found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
}
