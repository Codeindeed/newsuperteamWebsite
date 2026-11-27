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
import { useScrollContainer } from "@/layouts/vertical-scroll-container/context";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement>;
}

// Matches the fade-out duration below so the sheet hides after it fades.
const CLOSE_DURATION_MS = 500;

const TABBABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Keyboard-reachable elements under `root`, in DOM order, skipping anything
// that is not rendered.
const getTabbables = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)).filter(
    (element) => element.tabIndex >= 0 && element.getClientRects().length > 0,
  );

// Full-screen top sheet below lg, portalled to <body> like the gallery
// modal. Every entry is a SiteLink, so section links navigate client-side
// and scroll the page container, exactly as the footer does. The sheet stays
// mounted (hidden) while closed so the toggle's aria-controls always points
// at a real element.
const MobileMenu = ({ id, open, onClose, toggleRef }: MobileMenuProps) => {
  const location = useLocation();
  const { containerRef } = useScrollContainer();
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  // Show, then fade in a beat later so the transition runs; fade out, then
  // hide.
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
  // container does), close on Escape and keep Tab inside the menu. The
  // toggle in the navigation bar stays visible above the overlay and is the
  // menu's close button, so it is part of the Tab cycle; the page content
  // underneath is not.
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
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const sheet = sheetRef.current;
      if (!sheet) return;

      const toggle = toggleRef.current;
      const tabbables = [
        ...(toggle ? [toggle] : []),
        ...getTabbables(sheet),
      ];
      if (tabbables.length === 0) return;

      // The toggle sits in the nav bar, with the whole page between it and
      // the portalled sheet in DOM order, so every Tab step is handled here
      // rather than only the wrap-around at the ends.
      const active = document.activeElement;
      const index =
        active instanceof HTMLElement ? tabbables.indexOf(active) : -1;
      const lastIndex = tabbables.length - 1;
      const next = event.shiftKey
        ? index <= 0
          ? lastIndex
          : index - 1
        : index === -1 || index === lastIndex
          ? 0
          : index + 1;

      event.preventDefault();
      tabbables[next].focus();
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
  }, [containerRef, onClose, open, toggleRef]);

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
      ref={sheetRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!rendered}
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
