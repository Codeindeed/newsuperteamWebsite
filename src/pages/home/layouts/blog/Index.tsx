import { useEffect, useState } from "react";
import { fetchBlogPosts, BlogPost } from "./data";
import BlogCard from "./components/BlogCard";
import Button from "@/components/button/Index";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchBlogPosts();
      setPosts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <section
      id="blog"
      className="bg-[#0F0F0F] pt-14 md:pt-20 pb-32 lg:pb-40 px-5 md:px-10 lg:px-[12vw] text-white w-full"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 gap-6">
          <div>
            <h2 className="text-heading-6 text-[28px] md:text-heading-5 !font-medium leading-tight tracking-tight">
              Latest News and Articles
            </h2>
            <p className="text-heading-6 md:text-heading-5 !font-medium text-[#5F5F5F]">
              from the Community
            </p>
          </div>

          <Button
            type="primary"
            className="w-fit mt-1 md:mt-0"
            to="https://superteamnigeria.substack.com/"
          >
            View All
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#0A0A0A] rounded-[24px] aspect-[1/1.2] animate-pulse"
                  ></div>
                ))
            : posts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
};

export default Blog;
