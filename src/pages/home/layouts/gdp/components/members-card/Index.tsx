import { membersImg } from "@/data/images/Index";

const MembersCard = () => (
  <div className="bg-[#0F0F0F] rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden group">
    <div className="flex justify-between items-start">
      <div className="bg-[#00AD66] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        Active
      </div>
      <div className="flex -space-x-3">
        <img
          src={membersImg}
          alt="Members"
          className="h-9 w-auto object-contain"
          draggable={false}
        />
      </div>
    </div>
    <div className="mt-8 text-heading-7 md:text-heading-6 md:!text-[25px] !font-medium">
      <div className="text-white">7k+</div>
      <div className="text-[#5F5F5F]">Members</div>
    </div>
  </div>
);

export default MembersCard;
