import { harrisonImg, nzubeImg } from "@/data/images/Index";
import { useScrollContainer } from "@/layouts/vertical-scroll-container/Index";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const { containerRef } = useScrollContainer();
  const [revealProgress, setRevealProgress] = useState(0);
  const totalRevealItems = 52;

  useEffect(() => {
    const container = containerRef?.current;
    const about = aboutRef.current;
    if (!container || !about) return;

    const updateRevealProgress = () => {
      const containerRect = container.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();
      const aboutTop = aboutRect.top - containerRect.top + container.scrollTop;
      const viewportHeight = container.clientHeight;
      const revealRange = viewportHeight * 0.75;
      const distanceFromFullView = Math.abs(container.scrollTop - aboutTop);
      const progress = 1 - distanceFromFullView / Math.max(revealRange, 1);

      setRevealProgress(Math.min(1, Math.max(0, progress)));
    };

    updateRevealProgress();
    container.addEventListener("scroll", updateRevealProgress);
    window.addEventListener("resize", updateRevealProgress);

    return () => {
      container.removeEventListener("scroll", updateRevealProgress);
      window.removeEventListener("resize", updateRevealProgress);
    };
  }, [containerRef]);

  const isItemRevealed = (sequenceIndex: number) => {
    const threshold = sequenceIndex / Math.max(totalRevealItems, 1);
    return revealProgress >= threshold;
  };

  let sequenceIndex = -1;
  const getRevealClass = () => {
    sequenceIndex += 1;
    return isItemRevealed(sequenceIndex) ? "text-white" : "text-[#5F5F5F]";
  };

  const getImageRevealClass = () => {
    sequenceIndex += 1;
    return isItemRevealed(sequenceIndex) ? "grayscale-0" : "grayscale";
  };

  return (
    <div
      id="about"
      ref={aboutRef}
      className="relative w-full h-screen bg-black flex items-center justify-center px-8 pb-36 pt-5 md:pb-40"
    >
      <div className="max-w-[850px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
        <div className="lg:col-span-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#333] text-[#aaa] text-body-5 font-medium">
            About Us
          </span>
        </div>
        <div className="lg:col-span-9">
          <div className="md:text-heading-6 text-heading-7 md:leading-[1.4] leading-[1.5] !text-[25px] !font-medium text-[#5F5F5F]">
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Founded
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              in
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              June
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              2023
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              by
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Nzube
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Ezudo
            </span>{" "}
            <img
              src={nzubeImg}
              alt=""
              className={`mx-1 inline-block h-7 w-16 rounded-2xl overflow-hidden object-cover cursor-pointer filter hover:grayscale-0 transition-all duration-700 ${getImageRevealClass()} `}
            />{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              and
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Harrison
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Obiefule
            </span>{" "}
            <img
              src={harrisonImg}
              alt=""
              className={`mx-1 inline-block h-7 w-16 rounded-2xl overflow-hidden object-cover cursor-pointer filter hover:grayscale-0 transition-all duration-700 ${getImageRevealClass()} `}
            />{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              SuperteamNG
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              has
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              grown
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              into
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              a
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              38-member
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              team.
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              In
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              a
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              year,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              members
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              built
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              80+
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              projects,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              winning
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              hackathons
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              like
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Renaissance,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Hyperdrive,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              cHack,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              and
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Radar.
            </span>{" "}
            <br></br>
            <br></br>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              The
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              team
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              runs
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              five
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              open
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              guilds
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              for
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Developers,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Designers,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Writers,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Content
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Creators
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              and
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              Founders,
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              fostering
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              collaboration
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              and
            </span>{" "}
            <span className={`transition-colors duration-500 ${getRevealClass()}`}>
              growth.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
