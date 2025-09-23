import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const openPositions = [
  {
    title: 'Senior Frontend Engineer',
    location: 'Remote',
    description: 'We are looking for an experienced Frontend Engineer to help build the future of job searching.',
  },
  {
    title: 'AI/ML Specialist',
    location: 'San Francisco, CA',
    description: 'Join our AI team to develop cutting-edge models for job matching and recommendations.',
  },
  {
    title: 'Product Designer',
    location: 'New York, NY',
    description: 'Design beautiful, intuitive, and effective user experiences for our platform.',
  },
]

export default function JoinOurTeamPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Join Our Team
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We're on a mission to revolutionize the job market. Be a part of our journey.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-center font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Why Work With Us?
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Make a tangible difference in people's careers and lives.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Work with cutting-edge AI and a modern tech stack.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">A collaborative, supportive, and remote-friendly environment.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Open Positions
        </h2>
        <div className="mt-8 space-y-6">
          {openPositions.map((position) => (
            <Card key={position.title}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{position.title}</CardTitle>
                  <CardDescription>{position.location}</CardDescription>
                </div>
                <Link href="/jobs">
                  <Button variant="outline">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{position.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
