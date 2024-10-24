import { formSchema } from "@/components/letter/CreateForm";
import { z } from "zod";

export type FormData = z.infer<typeof formSchema>;
