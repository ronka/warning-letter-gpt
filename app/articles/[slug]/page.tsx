import { notFound } from "next/navigation";
import { articles } from "../data";
import Markdown from "react-markdown";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    };
  }

  return {
    title: `${article.title} | AI Letter Writer`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <article className="prose prose-lg dark:prose-invert">
        <h1 className="mb-4">{article.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Published on {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <Markdown>{article.content}</Markdown>
      </article>
    </div>
  );
}
