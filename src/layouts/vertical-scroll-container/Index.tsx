import React, { useRef, useState, useEffect, ReactNode, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "../navigation/Index";

interface ScrollContextType {
  containerRef: React.RefObject<HTMLDivElement> | null;
}

const ScrollContext = createContext<ScrollContextType>({ containerRef: null });

export const useScrollContainer = () => useContext(ScrollContext);

interface ScrollSectionProps {
  children: ReactNode;
  scrollTop: number;
  containerHeight: number;
  isLast?: boolean;
  layoutVersion?: number;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  scrollTop,
  containerHeight,
  isLast = false,
  layoutVersion = 0,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const updateDimensions = () => {
      setDimensions({
        top: element.offsetTop,
        height: element.offsetHeight,
      });
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [layoutVersion]);

  let distance = 0;
  if (dimensions.height > 0 && containerHeight > 0) {
    const { top, height } = dimensions;
    const viewport = containerHeight;

    if (scrollTop < top) {
      // Entering from below
      const rawDistance = (top - scrollTop) / viewport;
      distance = Math.max(0, rawDistance * 1.5 - 0.2);
    } else {
      // Section is at or past its top snap point
      const scrollPastTop = scrollTop - top;
      const internalScrollDepth = Math.max(0, height - viewport);

      if (scrollPastTop > internalScrollDepth) {
        // Leaving at the top
        if (isLast) {
          // If it's the last section, don't fade out further than the initial snap
          distance = 0;
        } else {
          const rawDistance = (scrollPastTop - internalScrollDepth) / viewport;
          distance = Math.max(0, rawDistance * 1.5 - 0.2);
        }
      } else {
        // Fully focused / Internal scrolling
        distance = 0;
      }
    }
  }

  const getOpacity = () => {
    return Math.max(0.3, 1 - distance * 0.5);
  };

  const getScale = () => {
    return Math.max(0.85, 1 - distance * 0.1);
  };

  const opacity = getOpacity();

  return (
    <section
      ref={sectionRef}
      className={`relative ${isLast ? "min-h-0" : "min-h-screen"} w-full ${isLast ? "snap-end" : "snap-start"} flex ${isLast || dimensions.height > containerHeight ? "items-start" : "items-center"} justify-center overflow-x-clip`}
    >
      <div
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          opacity: opacity,
          transform: `scale(${getScale()}) translateY(${(1 - opacity) * 50}px)`,
        }}
      >
        {children}
      </div>
    </section>
  );
};

interface VerticalScrollContainerProps {
  children: ReactNode;
  showProgress?: boolean;
  showScrollIndicator?: boolean;
  progressBarColor?: string;
}

const VerticalScrollContainer: React.FC<VerticalScrollContainerProps> = ({
  children,
  showProgress = true,
  showScrollIndicator = true,
  //progressBarColor = "from-primary to-secondary",
}) => {
  const location = useLocation();
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollData, setScrollData] = useState({
    scrollTop: 0,
    containerHeight: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = React.Children.toArray(children);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    window.requestAnimationFrame(() => {
      if (!location.hash) {
        container.scrollTo({ top: 0, left: 0 });
        return;
      }

      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight - clientHeight;

      setScrollData({ scrollTop, containerHeight: clientHeight });

      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const notifyLayoutChange = () => {
      setLayoutVersion((v) => v + 1);
      handleScroll();
    };

    const layoutObserver = new ResizeObserver(notifyLayoutChange);
    // Observe body for any layout shifts anywhere in the app
    layoutObserver.observe(document.body);

    const mutationObserver = new MutationObserver(notifyLayoutChange);
    mutationObserver.observe(container, { 
      childList: true, 
      subtree: true,
      attributes: true,
      characterData: true
    });

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      layoutObserver.disconnect();
      mutationObserver.disconnect();
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ containerRef }}>
      <div className="relative w-full h-screen bg-black overflow-hidden">
        {showProgress && (
          <Navigation />
        )}

        {showScrollIndicator && scrollProgress < 5 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white text-sm flex flex-col items-center gap-2 animate-bounce">
            <span className="opacity-60">Scroll</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}

        <div
          ref={containerRef}
          className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
          style={
            {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties
          }
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {sections.map((section, index) => (
            <ScrollSection
              key={index}
              scrollTop={scrollData.scrollTop}
              containerHeight={scrollData.containerHeight}
              isLast={index === sections.length - 1}
              layoutVersion={layoutVersion}
            >
              {section}
            </ScrollSection>
          ))}
        </div>
      </div>
    </ScrollContext.Provider>
  );
};

export default VerticalScrollContainer;
