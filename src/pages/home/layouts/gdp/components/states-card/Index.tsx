const StatesCard = () => {
  const states = [
    "Abia",
    "Abuja",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Kogi",
    "Kwara",
    "Lagos",
  ];

  return (
    <div className="bg-[#0F0F0F] rounded-2xl md:px-8 md:py-8 py-6 px-4 h-full flex items-center">
      <div className="grid grid-cols-12 gap-8 w-full">
        <div className="md:col-span-3 col-span-12 flex flex-col justify-center text-heading-7 md:text-heading-6 md:!text-[25px] !font-medium">
          <div className="text-white">30 States</div>
          <div className="text-[#5F5F5F]">in Nigeria</div>
        </div>
        <div className="md:col-span-9 col-span-12 w-full -ml-[7px] md:ml-0">
          <div className="flex flex-wrap gap-2 justify-start md:justify-end ">
            {states.map((state) => (
              <span
                key={state}
                className="px-2 py-1.5 bg-[#131E19] text-[#00AD66] rounded-full text-body-6 !text-[13px] hover:bg-[#222] transition-colors cursor-default flex items-center gap-1"
              >
                <span className="w-[5.15px] block h-[5.15px] rounded-full bg-[#00AD66]"></span>
                {state}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatesCard;
