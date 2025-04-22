import React from "react";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

interface DetailItem {
  label: string;
  value: string | number;
}

interface OverviewCardProps {
  title: string;
  value: string | number;
  details: DetailItem[];
  link: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  details,
  link,
}) => {
  return (
    <div className="flex justify-between items-center gap-1 p-3 bg-white rounded-lg shadow-sm">
      {/* Left Section of the card */}
      <div className="bg-white text-[#282828]">
        <h2 className="text-xs italic font-medium mb-1">{title}</h2>
        <p className="text-3xl font-semibold mb-3">{value}</p>
        <Link href={link} passHref legacyBehavior>
          <a className="flex items-center text-xs text-[#032041] font-normal px-3 py-2 bg-[#DEE2E6] rounded-lg border border-transparent transition hover:bg-white hover:border-[#FF931D] hover:text-[#FF931D]">
            View details
            <FaRegArrowAltCircleRight className="ml-3 transition group-hover:text-[#FF931D]" />
          </a>
        </Link>
      </div>

      {/* Right Section of the card */}
      <div className="bg-[#DEE2E6] rounded-lg shadow-inner w-[42%]">
        <div className="flex gap-4 justify-center items-center text-sm py-5 h-full">
          {details.map((detail, index) => (
            <div key={index} className="text-black text-xs font-medium py-1">
              <p className="font-normal">{detail.label}</p>
              <p className="text-2xl font-bold mt-3 text-center">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
