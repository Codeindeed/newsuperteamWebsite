import MembersCard from "./components/members-card/Index";
import ProductsCard from "./components/products-card/Index";
import GdpGraphCard from "./components/gdp-graph/Index";
import StatesCard from "./components/states-card/Index";

const Gdp = () => {
  return (
    <div className="relative w-full min-h-screen pb-32 md:pb-80 pt-16 bg-black flex items-center justify-center px-4 md:px-[5vw] lg:px-[13vw]">
      <div className="w-full max-w-[1200px] grid grid-cols-12 gap-4 lg:h-[600px]">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-3 col-span-12 flex flex-col lg:flex-col md:flex-row gap-4">
          <div className="md:w-1/2 lg:w-full lg:h-[40%]">
            <MembersCard />
          </div>
          <div className="md:w-1/2 lg:w-full lg:h-[59%]">
            <ProductsCard />
          </div>
        </div>

        {/* Right Column (8 cols) */}
        <div className="lg:col-span-9 col-span-12 flex flex-col gap-4">
          <div className="w-full lg:h-[60%]">
            <GdpGraphCard />
          </div>
          <div className="w-full lg:h-[40%]">
            <StatesCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gdp;
