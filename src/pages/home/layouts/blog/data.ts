export interface BlogPost {
  id: string;
  title: string;
  category: string;
  additionalTagsCount: number;
  author: string;
  date: string;
  imageUrl: string;
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "SuperteamNG April Recap",
    category: "Recap",
    additionalTagsCount: 2,
    author: "Superteam Nigeria",
    date: "May 2, 2026",
    imageUrl:
      "https://substackcdn.com/image/fetch/$s_!isJN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F536fb038-c5fe-4a1b-a364-662d775eb06b_4096x2730.jpeg",
    url: "https://superteamnigeria.substack.com/p/superteamng-april-recap",
  },
  {
    id: "2",
    title: "SuperteamNG March Recap",
    category: "Recap",
    additionalTagsCount: 2,
    author: "Superteam Nigeria",
    date: "Mar 31, 2026",
    imageUrl:
      "https://substackcdn.com/image/fetch/$s_!cX4M!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F14936faf-a325-4ec2-8a03-f2f2948858d3_4096x2730.jpeg",
    url: "https://superteamnigeria.substack.com/p/superteamng-march-recap",
  },
  {
    id: "3",
    title: "SuperteamNG February Recap",
    category: "Recap",
    additionalTagsCount: 2,
    author: "Superteam Nigeria",
    date: "Mar 2, 2026",
    imageUrl:
      "https://substackcdn.com/image/fetch/$s_!4Z7F!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd5b5a009-7aa7-46c4-b31e-bc0750078578_4096x2730.jpeg",
    url: "https://superteamnigeria.substack.com/p/superteamng-february-recap",
  },
  {
    id: "4",
    title: "SuperteamNG January Recap",
    category: "Recap",
    additionalTagsCount: 2,
    author: "Superteam Nigeria",
    date: "Feb 1, 2026",
    imageUrl:
      "https://substackcdn.com/image/fetch/$s_!LUa4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F44cc5e35-6d09-47a9-8ac1-1fb2ba17a3a9_4096x2730.jpeg",
    url: "https://superteamnigeria.substack.com/p/superteamng-january-recap",
  },
  {
    id: "5",
    title: "SuperteamNG December Recap",
    category: "Recap",
    additionalTagsCount: 2,
    author: "Superteam Nigeria",
    date: "Dec 30, 2025",
    imageUrl:
      "https://substackcdn.com/image/fetch/$s_!uT6G!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc660f744-ae06-4177-bc98-2ee9ad275d08_4096x2730.jpeg",
    url: "https://superteamnigeria.substack.com/p/superteamng-december-recap",
  },
];

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(blogPosts), 500);
  });
};
