export type Job = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary?: string;
  description: string;
  longDescription: string;
  requirements: string[];
  postedAt: string;
};

export type Employer = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  about: string;
  culture: string;
  website: string;
};
