import { useEffect, useRef, useState } from "react";
import { fetchProducts, ProductData } from "./data";
import ProductCard from "./components/ProductCard";
import solanaProducts from "@/assets/graphics/products-stackup.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollContainer } from "@/layouts/vertical-scroll-container/Index";

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const { containerRef } = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: container,
    container: containerRef || undefined,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <section
      id="products"
      className="bg-grey-100 pt-10 md:pt-[10vh] md:pb-[15vh] lg:pt-10 lg:pb-[20vh] px-4 md:px-[1vw] lg:px-[8vw] text-white w-full relative"
    >
      <div className="mx-auto max-w-[93%] md:max-w-[90%] flex flex-col lg:flex-row justify-between mb-14 md:mb-28 lg:mb-10 lg:items-center lg:gap-12 gap-5">
        {/* Left header text */}
        <div className="w-full lg:w-[60%] shrink-0">
          <h2 className="text-heading-5 text-[28px] md:text-heading-4 !font-medium ">
            We produce <img src={solanaProducts} className="inline" />
            <br />
            Solana's top Products <br />
            <span className="text-[#5F5F5F]">in Africa</span>
          </h2>
        </div>
        {/* Right sub-text */}
        <div className="w-full md:w-[70%] lg:w-[29%]">
          <p className="text-[#525252] text-body-4 md:text-body-3 md:leading-7 leading-[26px]">
            We've helped teams from around Africa bridge to Solana, get grants,
            raise money and hire talents within the Community.
          </p>
        </div>
      </div>

      {/* Stack Container */}
      <div className="mx-auto relative flex flex-col w-full pb-[16vh] md:pb-[10vh]">
        {loading ? (
          <div className="w-full h-[500px] bg-[#111111] rounded-[32px] animate-pulse border border-white/5"></div>
        ) : (
          <div className="relative">
            <main
              ref={container}
              className="relative flex w-full flex-col items-center justify-center"
            >
              {products.map((product, i) => {
                const targetScale = Math.max(
                  0.72,
                  1 - (products.length - i) * 0.04
                );
                const rangeStart = i / Math.max(products.length, 1);
                return (
                  <StickyCard
                    key={`p_${i}`}
                    i={i}
                    children={
                      <div className="w-full bg-[#0F0F0F] rounded-[16px] shadow-2xl">
                        <ProductCard product={product} />
                      </div>
                    }
                    progress={scrollYProgress}
                    range={[rangeStart, 1]}
                    targetScale={targetScale}
                  />
                );
              })}
            </main>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

const StickyCard = ({
  i,
  children,
  progress,
  range,
  targetScale,
}: {
  i: number;
  children: React.ReactNode;
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-[10vh] flex items-center justify-center w-full mb-[10vh]"
      style={{
        top: `calc(10vh + ${i * 25}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="relative flex w-full origin-top flex-col overflow-hidden rounded-[16px]"
      >
        {children}
      </motion.div>
    </div>
  );
};
