"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOPIC_TO_HEBREW, Topic } from "@/types/Topic";
import { Grid } from "./layout/Grid";

const formSchema = z.object({
  topic: z.nativeEnum(Topic),
  "against-name": z.string().min(2, {
    message: "השם אמור להיות 2 תווים לפחות",
  }),
  body: z.string().min(2, {
    message: "תוכן המקרה אמור להכיל לפחות 2 תווים",
  }),
  purpose: z.string().min(2, {
    message: "מטרת המכתב אמורה להכיל לפחות 2 תווים",
  }),
  name: z.string().min(2, {
    message: "שם אמור להכיל לפחות 2 תווים",
  }),
});

export function CreateForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "against-name": "",
      body: "",
      purpose: "",
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Grid columns={2}>
                <FormLabel>שם התובע</FormLabel>
                <FormControl>
                  <Input placeholder="מה השם של דורש המכתב" {...field} />
                </FormControl>
              </Grid>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <Grid columns={2}>
                <FormLabel>נושא מכתב ההתראה</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="תבחור את התחום" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Topic.DEFAMATION}>
                      {TOPIC_TO_HEBREW[Topic.DEFAMATION]}
                    </SelectItem>
                    <SelectItem value={Topic.FAKE_NEWS}>
                      {TOPIC_TO_HEBREW[Topic.FAKE_NEWS]}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Grid>
              {/* <FormDescription>
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="against-name"
          render={({ field }) => (
            <FormItem>
              <Grid columns={2}>
                <div>
                  <FormLabel>כנגד מי</FormLabel>
                  <FormDescription>אל מי פונה מכתב התראה זה</FormDescription>
                </div>
                <FormControl>
                  <Input placeholder="כנגד מי" {...field} />
                </FormControl>
              </Grid>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <Grid columns={2}>
                <div>
                  <FormLabel>מה התלונה?</FormLabel>
                  <FormDescription>כמה שיותר מידע יותר טוב</FormDescription>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="נא לציין כמה שיותר מפרטי האירוע"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </Grid>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <Grid columns={2}>
                <div>
                  <FormLabel>מה מנסים להשיג?</FormLabel>
                  <FormDescription>
                    ניתן לדרוש כל דבר במסגרת החוק, שימו לב שזה מכתב התראה ולא
                    מכתב סחיטה
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="אני מעוניין שימחוק את הפוסט"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </Grid>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">יצירת מכתב</Button>
      </form>
    </Form>
  );
}
