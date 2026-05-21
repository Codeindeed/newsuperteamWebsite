import { harrisonImg, nzubeImg } from "@/data/images/Index";
import { useScrollContainer } from "@/layouts/vertical-scroll-container/Index";
import { useEffect, useMemo, useRef, useState } from "react";

type AboutContentItem =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "break";
    };

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const { containerRef } = useScrollContainer();
  const [revealProgress, setRevealProgress] = useState(0);

  const aboutContent = useMemo<AboutContentItem[]>(
    () => [
      { type: "text", value: "Founded" },
      { type: "text", value: "in" },
      { type: "text", value: "June" },
      { type: "text", value: "2023" },
      { type: "text", value: "by" },
      { type: "text", value: "Nzube" },
      { type: "text", value: "Ezudo" },
      { type: "image", src: nzubeImg, alt: "Nzube Ezudo" },
      { type: "text", value: "and" },
      { type: "text", value: "Harrison" },
      { type: "text", value: "Obiefule" },
      { type: "image", src: harrisonImg, alt: "Harrison Obiefule" },
      { type: "text", value: "SuperteamNG" },
      { type: "text", value: "has" },
      { type: "text", value: "grown" },
      { type: "text", value: "into" },
      { type: "text", value: "a" },
      { type: "text", value: "38-member" },
      { type: "text", value: "team." },
      { type: "text", value: "In" },
      { type: "text", value: "a" },
      { type: "text", value: "year," },
      { type: "text", value: "members" },
      { type: "text", value: "built" },
      { type: "text", value: "80+" },
      { type: "text", value: "projects," },
      { type: "text", value: "winning" },
      { type: "text", value: "hackathons" },
      { type: "text", value: "like" },
      { type: "text", value: "Renaissance," },
      { type: "text", value: "Hyperdrive," },
      { type: "text", value: "cHack," },
      { type: "text", value: "and" },
      { type: "text", value: "Radar." },
      { type: "break" },
      { type: "break" },
      { type: "text", value: "The" },
      { type: "text", value: "team" },
      { type: "text", value: "runs" },
      { type: "text", value: "five" },
      { type: "text", value: "open" },
      { type: "text", value: "guilds" },
      { type: "text", value: "for" },
      { type: "text", value: "Developers," },
      { type: "text", value: "Designers," },
      { type: "text", value: "Writers," },
      { type: "text", value: "Content" },
      { type: "text", value: "Creators" },
      { type: "text", value: "and" },
      { type: "text", value: "Founders," },
      { type: "text", value: "fostering" },
      { type: "text", value: "collaboration" },
      { type: "text", value: "and" },
      { type: "text", value: "growth." },
    ],
    [],
  );

  const revealItems = aboutContent.filter((item) => item.type !== "break");

  useEffect(() => {
    const container = containerRef?.current;
    const about = aboutRef.current;
    if (!container || !about) return;

    const updateRevealProgress = () => {
      const containerRect = container.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();
      const aboutTop = aboutRect.top - containerRect.top + container.scrollTop;
      const viewportHeight = container.clientHeight;
      const start = aboutTop - viewportHeight * 0.55;
      const end = aboutTop + viewportHeight * 0.35;
      const progress = (container.scrollTop - start) / Math.max(end - start, 1);

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
    const threshold = sequenceIndex / Math.max(revealItems.length - 1, 1);
    return revealProgress >= threshold;
  };

  let sequenceIndex = -1;

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
            {aboutContent.map((item, index) => {
              if (item.type === "break") {
                return <br key={`about-break-${index}`} />;
              }

              sequenceIndex += 1;
              const revealed = isItemRevealed(sequenceIndex);

              if (item.type === "image") {
                return (
                  <img
                    key={`about-image-${index}`}
                    src={item.src}
                    alt={item.alt}
                    className={`mx-1 inline-block h-7 w-16 cursor-pointer overflow-hidden rounded-2xl object-cover align-middle filter transition-all duration-700 hover:grayscale-0 ${
                      revealed ? "grayscale-0" : "grayscale"
                    }`}
                  />
                );
              }

              return (
                <span
                  key={`about-word-${index}`}
                  className={`mr-1.5 transition-colors duration-500 ${
                    revealed ? "text-white" : "text-[#5F5F5F]"
                  }`}
                >
                  {item.value}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
