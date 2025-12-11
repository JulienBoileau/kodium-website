
export interface Article {
  id: string;
  title: string;
  metaDescription: string;
  date: string | Date;
  image?: string;
  content: string; // Markdown
}

export type ArticleList = Article[];