import { motion } from "framer-motion";
import { productImages, solanaLogo } from "@/data/images/Index";
const ProductsCard = () => {
  return (
    <div className="bg-[#0F0F0F] rounded-2xl h-full flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-center mt-[12vh] mb-[12vh] md:mt-[10vh] md:mb-[10vh] lg:mb-0 lg:mt-28">
        {/* Central Solana Logo with ripple effect */}
        <div className="relative z-10">
          <div className="absolute inset-0 bg-[#00AD66]/10 rounded-full blur-xl transform scale-150" />
          <div className="w-11 h-11 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-[#333]">
            <img src={solanaLogo} alt="Solana" className="w-8 h-8" />
          </div>
        </div>

        {/* Product Icons arranged in a circle with infinite rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute flex items-center justify-center"
        >
          {productImages.map((img, i) => {
            const angle = (i * 360) / productImages.length;
            const radius = 80; // Distance from center
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={i}
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-[#333] transition-transform hover:scale-110"
                style={{
                  x,
                  y,
                }}
              >
                <img
                  src={img}
                  alt={`Product ${i}`}
                  className="w-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="-mt-4 text-heading-7 md:text-heading-6 md:!text-[25px] !font-medium p-6">
        <div className="text-white">200+ Products</div>
        <div className="text-[#5F5F5F]">built on Solana</div>
      </div>
    </div>
  );
};

export default ProductsCard;
