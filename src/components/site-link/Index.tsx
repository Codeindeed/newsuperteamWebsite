import { forwardRef, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  scrollToSection,
  useScrollContainer,
} from "@/layouts/vertical-scroll-container/Index";

interface SiteLinkProps {
  url: string;
  className?: string;
  children: ReactNode;
  current?: boolean;
  onClick?: () => void;
}

// One link element for every entry in the site map:
// - "https://..."  opens in a new tab
// - "/#section"    client-side navigation to the homepage section; the page
//                  container (never the window) scrolls to it
// - "/route"       client-side navigation
const SiteLink = forwardRef<HTMLAnchorElement, SiteLinkProps>(
  ({ url, className, children, current, onClick }, ref) => {
    const location = useLocation();
    const { containerRef } = useScrollContainer();
    const ariaCurrent = current ? "page" : undefined;

    if (/^https?:\/\//.test(url)) {
      return (
        <a
          ref={ref}
          href={url}
          target="_blank"
          rel="noreferrer"
          className={className}
          aria-current={ariaCurrent}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    if (url.startsWith("/#")) {
      const hash = url.slice(1);

      const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
        onClick?.();

        // Same page, same hash: the location will not change, so the
        // container's hash effect will not run. Scroll right away instead.
        if (location.pathname === "/" && location.hash === hash) {
          event.preventDefault();
          const container = containerRef?.current;
          if (container) scrollToSection(container, hash.slice(1));
        }
      };

      return (
        <Link
          ref={ref}
          to={{ pathname: "/", hash }}
          className={className}
          aria-current={ariaCurrent}
          onClick={handleClick}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        ref={ref}
        to={url}
        className={className}
        aria-current={ariaCurrent}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  },
);

SiteLink.displayName = "SiteLink";

export default SiteLink;
