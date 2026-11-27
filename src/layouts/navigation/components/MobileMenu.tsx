import {
  MouseEvent as ReactMouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import Button from "@/components/button/Index";
import SiteLink from "@/components/site-link/Index";
import { communityUrl, siteLinks, socialLinks } from "@/data/navigation/Index";
import { useScrollContainer } from "@/layouts/vertical-scroll-container/Index";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement>;
}

// Matches the fade-out duration below so the sheet unmounts after it hides.
const CLOSE_DURATION_MS = 500;

// Full-screen top sheet below lg, portalled to <body> like the gallery
// modal. Every entry is a SiteLink, so section links navigate client-side
// and scroll the page container, exactly as the footer does.
const MobileMenu = ({ id, open, onClose, toggleRef }: MobileMenuProps) => {
  const location = useLocation();
  const { containerRef } = useScrollContainer();
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  // Mount, then fade in a beat later so the transition runs; fade out, then
  // unmount.
  useEffect(() => {
    if (open) {
      setRendered(true);
      const timeout = window.setTimeout(() => setVisible(true), 20);
      return () => window.clearTimeout(timeout);
    }

    setVisible(false);
    const timeout = window.setTimeout(
      () => setRendered(false),
      CLOSE_DURATION_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [open]);

  // While open: lock the page container (the window never scrolls, the
  // container does) and close on Escape.
  useEffect(() => {
    if (!open) return;

    const container = containerRef?.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousContainerOverflow = container?.style.overflow;
    const previousContainerOverscroll = container?.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (container) {
      container.style.overflow = "hidden";
      container.style.overscrollBehavior = "contain";
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;

      if (container) {
        container.style.overflow = previousContainerOverflow ?? "";
        container.style.overscrollBehavior = previousContainerOverscroll ?? "";
      }

      document.removeEventListener("keydown", handleKeydown);
    };
  }, [containerRef, onClose, open]);

  // Focus the first item once the sheet is showing; hand focus back to the
  // toggle when it closes.
  useEffect(() => {
    if (visible) firstItemRef.current?.focus();
  }, [visible]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      toggleRef.current?.focus();
    }
  }, [open, toggleRef]);

  if (!rendered) return null;

  const isCurrent = (url: string) => {
    if (url.startsWith("/#")) {
      const hash = url.slice(1);
      return (
        location.pathname === "/" &&
        (location.hash === hash || (hash === "#home" && location.hash === ""))
      );
    }
    return location.pathname === url;
  };

  const itemClass =
    "inline-flex items-center gap-3 text-heading-5 !font-medium text-white transition-colors duration-500 hover:text-[#5F5F5F] active:text-[#5F5F5F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  const closeOnBackdrop = (event: ReactMouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={`fixed inset-0 z-[90] lg:hidden overflow-y-auto transition-opacity duration-500 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor: "#0F0F0FE5",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={closeOnBackdrop}
    >
      <div
        className={`flex min-h-full flex-col px-[8vw] pt-28 pb-10 transition-transform duration-700 ease-out ${
          visible ? "translate-y-0" : "-translate-y-4"
        }`}
        onClick={closeOnBackdrop}
      >
        <nav aria-label="Site map">
          <ul className="flex flex-col gap-5">
            {siteLinks.map((link, index) => {
              const current = isCurrent(link.url);

              return (
                <li key={link.title}>
                  <SiteLink
                    ref={index === 0 ? firstItemRef : undefined}
                    url={link.url}
                    current={current}
                    onClick={onClose}
                    className={itemClass}
                  >
                    {current && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                      />
                    )}
                    {link.title}
                  </SiteLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-8 pt-12">
          <Button type="secondary" to={communityUrl} className="w-fit">
            Join the Community
          </Button>

          <div className="flex items-center gap-3.5">
            {socialLinks.map(({ label, url, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-[24px] text-white hover:text-primary duration-700 cursor-pointer transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MobileMenu;
