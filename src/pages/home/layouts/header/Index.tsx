import { motion } from "framer-motion";
import Button from "@/components/button/Index";
import { mapImg, timelineLogo } from "@/data/images/Index";

const Header = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="lg:mt-[7vh]">
        <h2 className="md:text-heading-3 text-heading-5 !font-medium text-white text-center">
          <span className="flex items-center gap-2 justify-center">
            Leading <img src={timelineLogo} alt="timeline" /> Solana’s
          </span>
          Growth in Nigeria!
        </h2>
        <p className="text-body-4 leading-[1.4] text-center mt-2 md:mt-4 text-[#525252] max-w-[300px] md:max-w-[400px] mx-auto">
          We are building the Solana ecosystem in Africa through innovative
          projects and community building.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button type="primary">Start Earning</Button>
          <Button type="secondary">Join the Community</Button>
        </div>
        <motion.img
          src={mapImg}
          alt="map"
          className="block mx-auto md:mt-16 mt-20 cursor-grab active:cursor-grabbing"
          animate={{
            y: [0, -20, 0],
            rotateY: [-10, 10, -10],
            rotateX: [2, -2, 2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ perspective: 1000 }}
        />
      </div>
    </div>
  );
};

export default Header;
