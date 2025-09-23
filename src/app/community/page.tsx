import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Community
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Connect with peers, share insights, and grow your professional network.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Join the Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our community forums and groups are coming soon. Stay tuned for a space to connect with other professionals, ask questions, and share your experiences in the job market.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
