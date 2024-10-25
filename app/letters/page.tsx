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
import { Letter } from "@/db/schema";

interface LetterCardProps {
  letter: Partial<Letter>;
  isLoading: boolean;
}

const LetterCard: React.FC<LetterCardProps> = ({
  letter,
  isLoading = false,
}) => (
  <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
    <CardHeader>
      {isLoading ? (
        <LetterSkeleton count={1} />
      ) : (
        <CardTitle>{letter.title}</CardTitle>
      )}

      {isLoading ? (
        <LetterSkeleton count={1} />
      ) : (
        <CardDescription>עבור: {letter.recipientName}</CardDescription>
      )}
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <LetterSkeleton count={3} />
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-2">
            תאריך: {letter.initialDate}
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            מאת: {letter.senderName}
          </p>
        </>
      )}
    </CardContent>
  </Card>
);

const LetterPage = () => {
  const { data: userLetters, isLoading, error } = useUserLettersQuery();

  if (error) {
    return <div>Error fetching letters</div>;
  }

  const letters: Partial<Letter>[] = isLoading
    ? Array(3).fill({})
    : userLetters || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {letters.map((letter, index) => (
        <Link
          href={isLoading ? "#" : `/letter/${letter.id}`}
          key={letter.id || `skeleton-${index}`}
        >
          <LetterCard letter={letter} isLoading={isLoading} />
        </Link>
      ))}
    </div>
  );
};

export default LetterPage;
