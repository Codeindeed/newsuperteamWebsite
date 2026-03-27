export interface BlogPost {
  id: string;
  title: string;
  category: string;
  additionalTagsCount: number;
  author: string;
  date: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "African Solana Startups: Cracking Product Market fit in harsh markets.",
    category: "Deep Dive",
    additionalTagsCount: 2,
    author: "Ral Andrew",
    date: "July 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", 
  },
  {
    id: "2",
    title: "MVNO (Mobile Virtual Network Operator): The Ultimate Guide for Businesses",
    category: "Technical",
    additionalTagsCount: 2,
    author: "Ola Scripts",
    date: "July 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Builders, Bounties, Bridges - July Recap",
    category: "Newsletter",
    additionalTagsCount: 2,
    author: "SuperteamNG",
    date: "July 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2042&auto=format&fit=crop",
  },
];

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(blogPosts), 500);
  });
};
