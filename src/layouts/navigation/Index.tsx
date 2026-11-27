import { useCallback, useEffect, useRef, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import Button from "@/components/button/Index";
import Logo from "@/components/logo/Index";
import { communityUrl } from "@/data/navigation/Index";
import MobileMenu from "./components/MobileMenu";

const MOBILE_MENU_ID = "mobile-menu";

// The hamburger shows below the lg breakpoint (976px in tailwind.config.js)
// so tablets get the menu too; from lg upwards the bar is unchanged.
const DESKTOP_MEDIA_QUERY = "(min-width: 976px)";

const Navigation = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close on route or hash change (each page mounts its own Navigation, but
  // the hash can change in place) and when the viewport grows past lg.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    // While the menu is open the bar sits above the overlay so the logo and
    // the close button stay visible.
    <div
      className={`relative px-[8vw] py-5 flex items-center justify-between ${
        menuOpen ? "z-[100]" : ""
      }`}
    >
      <Logo className="h-8" to="/" />

      <Button
        type="secondary"
        to={communityUrl}
        className="hidden lg:inline-block"
      >
        Join the Community
      </Button>

      <button
        ref={toggleRef}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls={MOBILE_MENU_ID}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
        className="lg:hidden w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white hover:bg-[#333] transition-colors duration-500"
      >
        <span
          className={`flex transition-transform duration-500 ${
            menuOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {menuOpen ? (
            <HiXMark className="text-[22px]" />
          ) : (
            <HiBars3 className="text-[22px]" />
          )}
        </span>
      </button>

      <MobileMenu
        id={MOBILE_MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        toggleRef={toggleRef}
      />
    </div>
  );
};

export default Navigation;
