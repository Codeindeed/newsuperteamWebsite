import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import PossibleSolana from "@/assets/graphics/possible-solana.svg";
import Logo from "@/components/logo/Index";

const siteLinks = [
  { title: "Home", url: "/#home" },
  { title: "About Us", url: "/#about" },
  { title: "Gallery", url: "/gallery" },
  { title: "Events", url: "/#events" },
  { title: "Products", url: "/#products" },
  { title: "Blog", url: "/#blog" },
];

const resourceLinks = [
  { title: "Superteam", url: "https://superteam.fun/" },
  { title: "Build", url: "https://superteam.fun/build" },
  { title: "Earn", url: "https://superteam.fun/earn/" },
];

const guildLinks = [
  { title: "Developers", url: "https://discord.com/invite/C6EgkeEAed" },
  { title: "Product", url: "https://discord.com/invite/C6EgkeEAed" },
  { title: "Designers", url: "https://discord.com/invite/C6EgkeEAed" },
  { title: "Writers", url: "https://discord.com/invite/C6EgkeEAed" },
  { title: "Content Creators", url: "https://discord.com/invite/C6EgkeEAed" },
  { title: "State Guilds", url: "https://discord.com/invite/C6EgkeEAed" },
];

const socialLinks = [
  {
    label: "X",
    url: "https://x.com/SuperteamNG",
    Icon: FaXTwitter,
  },
  {
    label: "Discord",
    url: "https://discord.com/invite/C6EgkeEAed",
    Icon: FaDiscord,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/superteamng/",
    Icon: FaInstagram,
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@superteamng",
    Icon: FaTiktok,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-[1.5vh] md:pt-[14vh] lg:pt-20 min-h-screen pb-[15vh] md:pb-12 px-5 md:px-10 lg:px-[8vw] w-full relative">
      <hr className="border-[#333333] border-[0.5px] mb-10 opacity-30 px-4 md:px-[8vw]" />
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 mt-8">
        {/* Top Section: Newsletter */}
        <div className="grid grid-cols-11 gap-y-8 md:gap-y-16 lg:gap-x-24">
          <div className="col-span-11 lg:col-span-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full mb-4">
              <h2 className="text-heading-5 text-[28px] !font-medium md:w-[55%]">
                No spam, <br /> Just{" "}
                <del className="text-primary inline">Us</del> Sauce
              </h2>
              <p className="text-[#525252] text-body-4 w-[90%] md:w-[45%] ">
                We'll drop monthly updates, alphas and ecosystem tea in your
                inbox. You in?
              </p>
            </div>
            <div className="flex flex-row items-center gap-1.5 w-full md:w-auto max-w-[320px] md:max-w-[280px] lg:max-w-[400px] mt-3 lg:mt-0">
              <div className="relative w-full lg:w-[380px]">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full bg-[#141414] placeholder:text-[#5F5F5F] text-grey-60 border border-transparent rounded-md px-4 py-3 text-body-5 focus:outline-none focus:border-white/20 transition-all duration-700"
                />
              </div>
              <button className="bg-[#5F5F5F] hover:bg-primary duration-700 p-4 rounded-md transition-all">
                <HiArrowUpRight className="text-[10px] text-white" />
              </button>
            </div>
          </div>
          <div className="col-span-11 lg:col-span-7">
            {/* Middle Section: Links & Socials */}
            <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-7 lg:gap-16">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
                {/* Site Map */}
                <BottomLinks
                  title="Site Map"
                  links={siteLinks}
                />

                {/* Resources */}
                <BottomLinks
                  title="Resources"
                  links={resourceLinks}
                />

                {/* Join A Guild */}
                <BottomLinks title="Join A Guild" links={guildLinks} />
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3.5 justify-start xl:justify-end h-fit">
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
        </div>
        {/* Bottom Section: Solana Callout & Copyright */}
        <div>
          <div className="flex justify-end md:mb-[10vh] lg:mb-0">
            <img src={PossibleSolana} alt="" className="block mb-8 h-16" />
          </div>
          <hr className="border-[#1D1D1D] border-[0.5px]" />
          {/* Copyright Bar */}
          <div className="flex flex-col md:flex-row md:mt-9 justify-between items-center">
            <Logo className="h-8 hidden md:block" to="/" />
            <p className="text-[#525252] text-body-4 mt-4 md:mt-0">
              &copy; {currentYear} SuperteamNG. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const BottomLinks = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; url: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-body-6 font-semibold uppercase text-white">
        {title}
      </h4>
      <ul className="flex flex-col gap-3 text-body-6 text-[#525252] uppercase">
        {links.map((item, index) => {
          return (
            <li key={index}>
              <a
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noreferrer" : undefined}
                className="hover:text-grey-40 duration-700 cursor-pointer transition-colors"
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
