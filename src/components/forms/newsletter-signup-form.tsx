// components/NewsletterSignUpForm.tsx
'use client'
import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

interface NewsletterSignUpFormInput {
  email: string;
}

interface ApiResponse {
  message: string;
}

async function subscribeToNewsletter(email: string): Promise<ApiResponse> {
  // Call Klaviyo API method to subscribe to newsletter
  const response = await fetch("/api/klaviyo-subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
}

export function NewsletterSignUpForm(): JSX.Element {
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<NewsletterSignUpFormInput>({
    defaultValues: {
      email: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit: SubmitHandler<NewsletterSignUpFormInput> = async (formData) => {
    startTransition(async () => {
      try {
        const { message } = await subscribeToNewsletter(formData.email);

        if (message === "exists") {
          toast({
            title: "You are subscribed already",
            variant: "destructive",
          });
        } else if (message === "success") {
          toast({
            title: "Thank you!",
            description: "You have successfully subscribed to our newsletter",
          });
          form.reset();
        } else {
          throw new Error("Unknown response from Klaviyo API");
        }
      } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex h-10 w-full items-center justify-center md:h-12"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative h-10 w-full space-y-0 md:h-12">
              <FormLabel className="sr-only">Email</FormLabel>
              <Input
                type="email"
                placeholder="Basquiat@orangecube.art"
                className="h-10 placeholder:text-xs md:h-12 md:placeholder:text-sm"
                {...field}
              />
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button className="size-10 rounded-l-none md:size-12" disabled={isPending}>
          {isPending ? (
            <Icons.spinner className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Icons.paperPlane className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">Join newsletter</span>
        </Button>
      </form>
    </Form>
  );
}
