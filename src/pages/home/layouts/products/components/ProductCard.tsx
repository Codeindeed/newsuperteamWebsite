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
            className={`text-body-5 capitalize px-4 py-1.5 rounded-full w-fit flex items-center gap-2 font-medium ${product.pillBgClass}`}
            style={{ color: product.pillColorClass }}
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
          <Button type="primary" to={product.productUrl}>
            Check Product
          </Button>
        </div>
      </div>

      {/* Right Pane */}
      <div
        className={`w-full md:w-[60%] flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden h-full min-h-[300px] ${product.bgRightClass}`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <img
          src={product.image}
          alt={`${product.name} product preview`}
          className="relative z-[1] w-full max-w-[720px] rounded-[18px] object-contain shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
};

export default ProductCard;
