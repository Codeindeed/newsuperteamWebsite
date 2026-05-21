import { harrisonImg, nzubeImg } from "@/data/images/Index";

const About = () => {
  return (
    <div
      id="about"
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
            <span className="text-white mr-1.5">Founded</span> in June 2023 by
            Nzube Ezudo{" "}
            <img
              src={nzubeImg}
              alt=""
              className="mx-1 inline-block h-7 w-16 rounded-2xl overflow-hidden object-cover cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-700 "
            />{" "}
            and Harrison Obiefule{" "}
            <img
              src={harrisonImg}
              alt=""
              className="mx-1 inline-block h-7 w-16 rounded-2xl overflow-hidden object-cover cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-700 "
            />{" "}
            SuperteamNG has grown into a 38-member team. In a year, members
            built 80+ projects, winning hackathons like Renaissance, Hyperdrive,
            cHack, and Radar. <br></br>
            <br></br> The team runs five open guilds for Developers, Designers,
            Writers, Content Creators and Founders, fostering collaboration and
            growth.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
