import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrainingPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Professional Training
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Upskill and stay competitive with our expert-led training courses.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our training program is under development. We will soon offer a range of courses covering the latest in-demand skills, from technical certifications to soft skills development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
