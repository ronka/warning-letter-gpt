import { z } from "zod";
import { formSchema } from "@/components/home/CreateForm";

export type FormData = z.infer<typeof formSchema>;
