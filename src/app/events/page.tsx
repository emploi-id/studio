import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EventsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Upcoming Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join our webinars, workshops, and networking events to boost your career.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Events Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our events calendar is currently being updated. Please check back soon for a list of upcoming webinars on resume building, interview skills, and career growth, as well as virtual networking sessions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
