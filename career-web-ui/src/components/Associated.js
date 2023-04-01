import React from "react";
import topcv_logo from "../assets/topcv_logo.png";
import itviec_logo from "../assets/itviec_logo.png";
import vnwork_logo from "../assets/vnwork_logo.png";
import itjob_logo from "../assets/itjob_logo.png";
const Associated = () => {
  return (
    <div className="mb-[2rem] mt-[2rem] flex flex-col justify-center items-center">
      <p className=" text-[25px] font-bold">Associated with</p>

      <div className="flex gap-8 justify-center items-center mt-[2rem] bg-[#F7DFD4] rounded-[10px] p-2">
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <img src={topcv_logo} alt="" className="w-[100px] object-contain" />
        </div>
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <img src={itviec_logo} alt="" className="w-[100px] object-contain" />
        </div>
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <img src={vnwork_logo} alt="" className="w-[100px] object-contain" />
        </div>
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <img src={itjob_logo} alt="" className="w-[100px] object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Associated;
