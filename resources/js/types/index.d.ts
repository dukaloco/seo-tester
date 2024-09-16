export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type PaginationLink = {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  featured_img: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: string | null;
  published_at_human: string | null;
  created_at: string;
  created_at_human: string;
  featured_img: string;
  category_id: number | null;
  user_id: number;
  excerpt: string;
};
