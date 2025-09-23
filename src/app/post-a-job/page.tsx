
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { jobCategories, jobLocations } from '@/lib/data';

const jobSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required.'),
  category: z.string().min(1, 'Category is required.'),
  jobType: z.string().min(1, 'Job type is required.'),
  location: z.string().min(1, 'Location is required.'),
  salaryRange: z.string().optional(),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters.'),
  companyName: z.string().min(1, 'Company name is required.'),
  companyWebsite: z.string().url('Please enter a valid URL.').optional(),
  applyLink: z.string().email('Please enter a valid email.').or(z.string().url('Please enter a valid URL.')),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function PostAJobPage() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
        jobTitle: '',
        category: '',
        jobType: '',
        location: '',
        salaryRange: '',
        description: '',
        requirements: '',
        companyName: '',
        companyWebsite: '',
        applyLink: ''
    }
  });

  const onSubmit: SubmitHandler<JobFormValues> = (data) => {
    console.log('New Job Posting:', data);
    alert('Your job has been successfully posted!');
    form.reset();
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">
            Post a Job
          </CardTitle>
          <CardDescription>
            Fill out the form below to create your job listing. We'll help you
            find the best candidates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jobCategories.map(cat => (
                             <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-Time">Full-Time</SelectItem>
                          <SelectItem value="Part-Time">Part-Time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a location" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {jobLocations.map(loc => (
                                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Salary Range (Optional)</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g. $120,000 - $150,000" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the role and responsibilities..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="List the key skills and qualifications..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="border-t pt-6 font-headline text-2xl font-bold">Company Details</h3>
               
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Your company's name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="companyWebsite"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company Website (Optional)</FormLabel>
                        <FormControl>
                        <Input placeholder="https://yourcompany.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="applyLink"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>How to Apply</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter an email or application link" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />


              <Button type="submit" className="w-full" size="lg">
                Submit Job Posting
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
