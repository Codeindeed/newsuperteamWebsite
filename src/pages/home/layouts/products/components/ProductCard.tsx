import React from "react";
import { ProductData } from "../data";
import Button from "@/components/button/Index";

interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto min-h-[440px] md:h-[440px] rounded-[16px] overflow-hidden bg-[#0F0F0F] shadow-2xl">
      {/* Left Pane */}
      <div className="bg-[#111111] md:w-[40%] py-10 px-5 md:py-10 md:px-6 lg:p-14 flex flex-col justify-between shrink-0 h-full">
        <div>
          <div
            className={`text-body-5 capitalize px-4 py-1.5 rounded-full w-fit flex items-center gap-2 font-medium text-[${product.pillColorClass}] ${product.pillBgClass}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full`}
              style={{ backgroundColor: product.pillColorClass }}
            ></div>
            Meet {product.name}
          </div>
          <h3 className="text-heading-5 !text-[30px] lg:!text-heading-5 !font-medium text-white  mt-10 md:mt-16 pr-4">
            {product.headline}
          </h3>
        </div>

        <div className="mt-12 md:mt-0">
          <Button type="primary">Read More</Button>
        </div>
      </div>

      {/* Right Pane */}
      <div
        className={`w-full md:w-[60%] flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden h-full min-h-[300px] ${product.bgRightClass}`}
      >
        {/* Placeholder for the app mockup */}
        <div className="w-[280px] md:w-[320px] h-[400px] bg-black/20 rounded-[40px] border-[6px] border-[#222222] shadow-2xl relative flex flex-col overflow-hidden backdrop-blur-sm mt-20 md:mt-32">
          {/* iOS Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#222222] rounded-b-xl z-20"></div>

          <div className="flex-1 w-full bg-white/5 p-6 flex flex-col gap-4 mt-8">
            <div className="w-full h-24 bg-white/10 rounded-2xl animate-pulse"></div>
            <div className="w-3/4 h-8 bg-white/10 rounded-lg animate-pulse"></div>
            <div className="w-full h-32 bg-white/10 rounded-2xl animate-pulse mt-auto"></div>
          </div>
        </div>

        {/* Floating decorative blocks simulating the design's background graphics */}
        <div
          className="absolute top-1/4 left-10 w-24 h-16 bg-white/5 rounded-2xl backdrop-blur-md transform -rotate-12 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-12 w-32 h-20 bg-white/5 rounded-2xl backdrop-blur-md transform rotate-6 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-white/10 rounded-full backdrop-blur-md transform animate-bounce blur-sm"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
};

export default ProductCard;
