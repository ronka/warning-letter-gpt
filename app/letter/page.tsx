"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserLettersQuery } from "@/context/Letter";
import Link from "next/link";
import LetterSkeleton from "@/components/LetterSkeleton";

const LetterPage = () => {
  const { data: userLetters, isLoading, error } = useUserLettersQuery();

  if (error || (!isLoading && !userLetters)) {
    return <div>Error fetching letters</div>;
  }

  return (
    <>
      {isLoading || !userLetters ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow p-4">
            <LetterSkeleton />
          </Card>
          <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow p-4">
            <LetterSkeleton />
          </Card>
          <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow p-4">
            <LetterSkeleton />
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userLetters.map((letter) => (
            <Link href={`/letter/${letter.id}`} key={letter.id}>
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{letter.title}</CardTitle>
                  <CardDescription>עבור: {letter.to}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{letter.body}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default LetterPage;
