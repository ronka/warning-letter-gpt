import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { articles } from "./data";

export const metadata = {
  title: "מאמרים | AI Letter Writer",
  description: "מדריכים ומאמרים מועילים לכתיבת מכתבים",
};

export default function ArticlesPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">מאמרים</h1>
        <p className="text-muted-foreground">
          מדריכים ומאמרים שיעזרו לך לכתוב מכתבים טובים יותר
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-primary/50">
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {new Date(article.publishedAt).toLocaleDateString("he-IL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">אין כרגע מאמרים זמינים</p>
        </div>
      )}
    </div>
  );
}
