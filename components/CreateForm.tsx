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
import { useState } from "react";
import { MultiStepForm } from "@/components/layout/MultiStepForm";
import { Step } from "@/components/layout/Step";

const formSchema = z.object({
  file:
    typeof window === "undefined" ? z.any() : z.instanceof(FileList).optional(),
  topic: z.nativeEnum(Topic),
  "against-name": z.string().min(1, {
    message: "השם אמור להיות 1 תווים לפחות",
  }),
  body: z.string().min(1, {
    message: "תוכן המקרה אמור להכיל לפחות 1 תווים",
  }),
  purpose: z.string().min(1, {
    message: "מטרת המכתב אמורה להכיל לפחות 1 תווים",
  }),
  name: z.string().min(1, {
    message: "שם אמור להכיל לפחות 1 תווים",
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
      file: [],
    },
  });

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const { onChange: fileFormRefOnChange, ...fileFormRef } =
    form.register("file");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileFormRefOnChange(e);

    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles(imageArray);
    }
  };

  return (
    <div className="max-w-[620px] w-full mx-auto">
      {/* Existing code */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MultiStepForm>
            <Step
              title="Personal Information"
              description="Enter your personal details."
              isNextDisabled={!Boolean(form.watch("name"))}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Grid>
                      <FormLabel>שם התובע</FormLabel>
                      <FormControl>
                        <Input placeholder="מה השם של דורש המכתב" {...field} />
                      </FormControl>
                    </Grid>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Step>

            <Step
              title="Personal Information"
              isNextDisabled={!Boolean(form.watch("topic"))}
              description="Enter your personal details."
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <Grid>
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
            </Step>

            <Step
              title="Personal Information"
              description="Enter your personal details."
              isNextDisabled={!Boolean(form.watch("against-name"))}
            >
              <FormField
                control={form.control}
                name="against-name"
                render={({ field }) => (
                  <FormItem>
                    <Grid>
                      <div>
                        <FormLabel>כנגד מי</FormLabel>
                        <FormDescription>
                          אל מי פונה מכתב התראה זה
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input placeholder="כנגד מי" {...field} />
                      </FormControl>
                    </Grid>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Step>

            <Step
              title="Personal Information"
              description="Enter your personal details."
              isNextDisabled={!Boolean(form.watch("body"))}
            >
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <Grid>
                      <div>
                        <FormLabel>מה התלונה?</FormLabel>
                        <FormDescription>
                          כמה שיותר מידע יותר טוב
                        </FormDescription>
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
            </Step>

            <Step
              title="Personal Information"
              description="Enter your personal details."
              isNextDisabled={!Boolean(form.watch("purpose"))}
            >
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <Grid>
                      <div>
                        <FormLabel>מה מנסים להשיג?</FormLabel>
                        <FormDescription>
                          ניתן לדרוש כל דבר במסגרת החוק, שימו לב שזה מכתב התראה
                          ולא מכתב סחיטה
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

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Grid>
                        <div>
                          <FormLabel>ראיות</FormLabel>
                          <FormDescription>
                            הוסיפו כמה שיותר צילומי מסך מהמקרה
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple
                            onChange={handleFileUpload}
                            {...fileFormRef}
                          />
                        </FormControl>
                      </Grid>
                      <div>
                        {selectedFiles.map((file: string, index: number) => (
                          <div key={index} className="m-1 inline-block">
                            <img
                              src={file}
                              alt={`uploaded-${index}`}
                              className="w-32 h-32 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </Step>

            <Step
              title="Step Title"
              description="Step Description"
              isNextDisabled={false}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="text-gray-500 dark:text-gray-400">
                    <p>Name: {form.getValues().name}</p>
                    <p>Against Name: {form.getValues()["against-name"]}</p>
                    <p>Body: {form.getValues().body}</p>
                    <p>Purpose: {form.getValues().purpose}</p>
                  </div>
                </div>

                <Button type="submit">יצירת מכתב</Button>
              </div>
            </Step>
          </MultiStepForm>
        </form>
      </Form>
    </div>
  );
}
