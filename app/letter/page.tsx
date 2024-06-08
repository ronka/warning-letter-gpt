"use client";

import { Spinner } from "@/components/ui/spinner";
import { useLetterQuery } from "@/context/Letter";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Letter() {
  const router = useRouter();
  const { data, error, isError, isLoading } = useLetterQuery();

  if (isError) {
    console.log(error);
    router.push("/");

    return;
  }

  if (isLoading || !data) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const { letter, id } = data;

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent" />
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="relative z-10 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          מכתב: {id}
        </h1>

        <p>לכבוד {letter["to"]}</p>
        <h2>{letter["title"]}</h2>
        <p>{letter["body"]}</p>
      </div>
    </div>
  );
}
