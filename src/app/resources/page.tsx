import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Career Resources
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A curated collection of articles, templates, and guides to help you succeed.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Resource Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are building a comprehensive library of resources, including resume templates, cover letter examples, salary negotiation guides, and industry reports. This section will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
