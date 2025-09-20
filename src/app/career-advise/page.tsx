import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const careerAdviseData = [
    {
        title: "How to Write a Standout Resume",
        content: "Keep your resume concise, clear, and tailored to the job you're applying for. Use keywords from the job description. Highlight your accomplishments with numbers and data. Have someone else proofread it to catch any typos."
    },
    {
        title: "Tips for a Successful Job Interview",
        content: "Research the company and the role you're applying for. Prepare answers to common interview questions. Practice your answers, but don't memorize them. Prepare a few questions to ask the interviewer. Dress professionally and arrive on time."
    },
    {
        title: "Networking for Success",
        content: "Attend industry events and webinars. Connect with professionals in your field on LinkedIn. Ask for informational interviews to learn from others. Offer to help others in your network. Maintain your relationships by staying in touch regularly."
    },
    {
        title: "Negotiating Your Salary",
        content: "Research salary benchmarks for your role and location. Know your worth and be prepared to articulate it. Don't be afraid to ask for what you want, but be realistic. Be prepared to negotiate other perks like vacation time or remote work options."
    }
];

export default function CareerAdvisePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Career Advise
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find expert tips and insights to help you advance in your career.
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Popular Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {careerAdviseData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg">{item.title}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
