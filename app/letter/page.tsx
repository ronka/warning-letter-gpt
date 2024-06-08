"use client";

import { Spinner } from "@/components/ui/spinner";
import { useLetterQuery } from "@/context/Letter";
import { FileIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Letter() {
  const router = useRouter();
  const { data, error, isError, isLoading, isFetched, isFetching } =
    useLetterQuery();

  if (isError || (!isFetching && !isFetched)) {
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

  const { content, id } = data;

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent" />
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="relative z-10 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          מכתב: {id}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{content}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FileIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              Acme_Annual_Report_2023.pdf
            </span>
          </div>
          <Link
            href="#"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            prefetch={false}
          >
            View Full Report
          </Link>
        </div>
      </div>
      <div className="relative h-full">
        <img
          src="/placeholder.svg"
          alt="Annual Report Preview"
          className="w-full h-full object-cover object-center blur-md"
        />
      </div>
    </div>
  );
}
