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
import { useState } from "react";
import { MultiStepForm, Required } from "@/components/layout/MultiStepForm";
import { Step } from "@/components/layout/Step";
import { useRouter } from "next/navigation";
import { useLetterMutation } from "@/context/Letter";
import { FormData } from "@/types/FormData";
import { isStepValid } from "@/utils/formValidation";
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  file:
    typeof window === "undefined"
      ? z.any().optional()
      : z.instanceof(FileList).optional(),
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
  const router = useRouter();
  const {
    mutateAsync: createLetter,
    isPending: isLoading,
    isSuccess,
  } = useLetterMutation();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "against-name": "",
      body: "",
      purpose: "",
      name: "",
    },
  });
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const onSubmit = async (values: FormData) => {
    try {
      const newLetter = await createLetter(values);
      router.push(`/letter/${newLetter.id}`);
    } catch (error) {
      console.error("Error creating letter", error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה ביצירת המכתב. אנא נסה שוב.",
        variant: "destructive",
      });
    }
  };

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MultiStepForm>
            <Step
              isNextDisabled={() =>
                isStepValid(form, ["name", "against-name", "topic"])
              }
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Required />
                      באיזה נושא אתם מעוניינים להתריע בפניו?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="בחר נושא" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Required />
                      שם מלא של מגיש המכתב:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="against-name"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>
                        <Required />
                        שם מלא אל מי ישלח המכתב:
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Step>

            <Step isNextDisabled={() => isStepValid(form, ["body", "purpose"])}>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>
                        <Required />
                        מה התלונה?
                      </FormLabel>
                      <FormDescription>
                        תשתדלו להיות כמה שיותר מפורטים במקרה האירוע
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>
                        <Required />
                        מה מנסים להשיג?
                      </FormLabel>
                      <FormDescription>
                        ניתן לדרוש כל דבר במסגרת החוק, שימו לב שזה מכתב התראה
                        ולא מכתב סחיטה
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
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
                      <div>
                        <FormLabel>ראיות</FormLabel>
                        <FormDescription>
                          הוסיפו כמה שיותר צילומי מסך מהמקרה, חשוב לשמור את
                          הצילומי מסך
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
              title="סיכום פרטי המכתב"
              description="נא לוודא שהפרטים נכונים, במידה ויש שגיאה ניתן לחזור לשלב הקודם ולתקן אותם."
              isNextDisabled={false}
            >
              <div className="space-y-4">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">
                    <div className="mb-2">
                      <div className="font-black">שם מגיש המכתב:</div>
                      {form.getValues().name}
                    </div>
                    <div className="mb-2">
                      <div className="font-black">המכתב מוגש כנד:</div>
                      {form.getValues()["against-name"]}
                    </div>
                    <div className="mb-2">
                      <div className="font-black">הסיבה לשליחת המכתב:</div>
                      {form.getValues().body}
                    </div>
                    <div className="mb-2">
                      <div className="font-black">אתם רוצים לבקש:</div>
                      {form.getValues().purpose}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isLoading || isSuccess}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        יוצר מכתב... זה עלול לקחת מספר רגעים
                      </>
                    ) : isError ? (
                      <>
                        <AlertCircle className="ml-2 h-4 w-4" />
                        נסה שוב
                      </>
                    ) : (
                      "יצירת מכתב"
                    )}
                  </Button>

                  {isError && (
                    <div className="text-red-500 flex items-center mb-4">
                      <AlertCircle className="ml-2 h-4 w-4" />
                      <span>אירעה שגיאה. אנא נסה שוב.</span>
                    </div>
                  )}
                </div>
              </div>
            </Step>
          </MultiStepForm>
        </form>
      </Form>
    </div>
  );
}

export { formSchema };
