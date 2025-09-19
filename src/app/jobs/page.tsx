'use client';

import { useState } from 'react';
import { jobs, jobCategories, jobLocations } from '@/lib/data';
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

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [category, setCategory] = useState('all');

  const filteredJobs = jobs.filter((job) => {
    return (
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (location === 'all' || job.location === location) &&
      (category === 'all' || job.category === category)
    );
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 rounded-lg bg-card p-6 shadow-sm">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Temukan Peran Anda Berikutnya
        </h1>
        <p className="mt-2 text-muted-foreground">
          Telusuri ribuan posisi yang terbuka.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Jabatan, kata kunci, atau perusahaan"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Lokasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua lokasi</SelectItem>
              {jobLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {jobCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
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
          <h3 className="text-xl font-semibold">Tidak ada pekerjaan yang ditemukan</h3>
          <p className="mt-2 text-muted-foreground">
            Coba sesuaikan filter pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
}
