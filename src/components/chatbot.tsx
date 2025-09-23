'use client';

import { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Send, User, X, Loader, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAction, ChatState } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import Logo from './icons/logo';

const initialState: ChatState = {
  messages: [
    { role: 'model', content: [{ text: "Hello! I'm the emploi assistant. How can I help you find your dream job today?" }] },
  ],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader className="animate-spin" /> : <Send />}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [state, formAction] = useActionState(chatAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [state.messages]);
  
  const handleFormAction = (formData: FormData) => {
    formAction(formData);
    formRef.current?.reset();
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {!isOpen ? (
        <Button
          className="fixed bottom-4 right-4 h-16 w-16 rounded-full bg-green-600 shadow-lg hover:bg-green-700 text-white"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Open chat</span>
        </Button>
      ) : (
        <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-xl shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
              <CardTitle className="text-xl">Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>
          <CardContent className="flex h-[500px] flex-col">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {state.messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'model' && (
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback>
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-[75%] rounded-xl px-4 py-2 text-sm',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      {typeof message.content === 'string'
                        ? message.content
                        : message.content[0].text}
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {useFormStatus().pending &&
                  state.messages[state.messages.length - 1].role === 'user' && (
                    <div className="flex items-start gap-3 justify-start">
                      <Avatar className="h-8 w-8 border">
                        <AvatarFallback>
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="max-w-[75%] rounded-xl bg-muted px-4 py-2 text-sm flex items-center">
                        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
              </div>
            </ScrollArea>
            <form
              ref={formRef}
              action={handleFormAction}
              className="mt-4 flex items-center gap-2 border-t pt-4"
            >
              <Input
                name="message"
                placeholder="Type a message..."
                autoComplete="off"
              />
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
