import { createContext, RefObject, useContext } from "react";

// The scroll context and the section-scrolling helpers live here, apart from
// the container component, so that anything the container renders (the
// navigation bar, the mobile menu, SiteLink) can use them without importing
// the container back in and creating an import cycle.

export interface ScrollContextType {
  containerRef: RefObject<HTMLDivElement> | null;
}

export const ScrollContext = createContext<ScrollContextType>({
  containerRef: null,
});

export const useScrollContainer = () => useContext(ScrollContext);

// Top of the section holding `id`, measured from the untransformed section
// wrapper so the scroll-linked scale on the inner content cannot throw it
// off. Null when the element is not in the DOM yet.
export const getSectionTop = (container: HTMLDivElement, id: string) => {
  const target = document.getElementById(id);
  if (!target) return null;

  const wrapper = Array.from(container.children).find((child) =>
    child.contains(target),
  );
  const anchor = (wrapper as HTMLElement | undefined) ?? target;
  const top =
    anchor.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop;

  return Math.max(0, Math.round(top));
};

// Scrolls the page container so that section sits right under the
// navigation bar. Returns false when the element is not in the DOM yet.
export const scrollToSection = (
  container: HTMLDivElement,
  id: string,
  behavior: ScrollBehavior = "smooth",
) => {
  const top = getSectionTop(container, id);
  if (top === null) return false;
  container.scrollTo({ top, behavior });
  return true;
};
