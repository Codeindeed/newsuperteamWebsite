import React from "react";
import { BlogPost } from "../data";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="bg-[#000000] rounded-[24px] overflow-hidden border border-white/5 flex flex-col h-full group cursor-pointer transition-all duration-300 hover:border-white/10"
    >
      {/* Image Container */}
      <div className="aspect-[1.6/1] w-full overflow-hidden relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-[#131E19] text-[#00AD66] text-body-5 font-medium px-3 py-1.5 rounded-full">
            {post.category}
          </span>
          <span className="bg-[#131E19] text-[#00AD66] text-body-5 font-medium px-3 py-1.5 rounded-full ">
            +{post.additionalTagsCount}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white text-body-3 leading-[1.5] !font-medium mb-8 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between opacity-50 text-body-5 font-medium tracking-wide">
          <span className="uppercase text-grey-40">By {post.author}</span>
          <span className="uppercase text-grey-40">{post.date}</span>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;
