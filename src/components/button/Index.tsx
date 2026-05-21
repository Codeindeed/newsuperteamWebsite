import { ReactNode } from "react";
import { HiArrowSmallRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  to?: string;
  typeoF?: "button" | "submit" | "reset";
  disabled?: boolean;
  type: string;
  onClick?: any;
}

function Button({
  className,
  to,
  type,
  typeoF,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const base =
    "px-3.5 py-3.5 md:px-4 md:py-3 text-body-5 text-center font-medium transition-all focus:outline-none disabled:cursor-not-allowed duration-[800ms] rounded-lg overflow-hidden relative md:pl-12 pl-11 group  md:before:w-8 md:before:h-8 before:w-[30px] before:h-8 before:rounded-lg  before:absolute before:top-1/2 before:left-1.5 z-[2] before:z-[-1] before:-translate-y-1/2 hover:before:w-[calc(100%-12px)] before:transition-all before:duration-700 " +
    className;

  let style;

  if (type === "primary") {
    style =
      base +
      " bg-[#262626] text-white before:bg-[#686868] py-[16px] md:py-[14px] ";
  } else if (type === "secondary") {
    style =
      base + " bg-white text-[#3D3D3D] hover:text-white before:bg-[#00AD66]";
  }
  //else if (type === "small") {
  //   style =
  //     "px-3 py-1 text-body-xs lg:text-body-sm bg-variant-20 rounded-3xl text-grey-40 flex gap-0.5 justify-center items-center " +
  //     className;
  // }

  //BUTTON IS A LINK TYPE
  if (to) {
    const isExternal = /^https?:\/\//.test(to);
    const content = (
      <>
        <HiArrowSmallRight className="text-white -rotate-45 text-[14px] md:text-[17px] absolute top-1/2 -translate-y-1/2 left-3.5 " />
        {children}
      </>
    );

    if (isExternal) {
      return (
        <a
          href={to}
          className={style}
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link to={to} className={style} {...props}>
        {content}
      </Link>
    );
  }

  //BUTTON IS A BUTTON TYPE
  return (
    <button className={style} disabled={disabled} {...props} type={typeoF}>
      <HiArrowSmallRight className="text-white -rotate-45 text-[14px] md:text-[17px] absolute top-1/2 -translate-y-1/2 left-3.5 " />
      {children}
    </button>
  );
}

export default Button;
