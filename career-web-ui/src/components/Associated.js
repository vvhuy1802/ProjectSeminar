import React from "react";
import topcv_logo from "../assets/topcv_logo.png";
import itviec_logo from "../assets/itviec_logo.png";
import vnwork_logo from "../assets/vnwork_logo.png";
import itjob_logo from "../assets/itjob_logo.png";
const Associated = () => {
  return (
    <div className="mb-[2rem] mt-[4rem] flex flex-col justify-center items-center">
      <p className=" text-[25px] font-bold">Associated with</p>

      <div className="flex gap-10 justify-center items-center mt-[4rem] bg-[#D8E9F7] rounded-[10px] p-2">
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <a href="https://topcv.vn/">
            <img src={topcv_logo} alt="" className="w-[100px] object-contain" />
          </a>
        </div>
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <a href="https://itviec.com/">
            <img
              src={itviec_logo}
              alt=""
              className="w-[100px] object-contain"
            />
          </a>
        </div>
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <a href="https://www.vietnamworks.com/">
            <img
              src={vnwork_logo}
              alt=""
              className="w-[100px] object-contain"
            />
          </a>
        </div>
        <div className="w-[120px] h-[60px] items-center flex justify-center ">
          <a href="https://www.itjobs.com.vn/vi">
            <img src={itjob_logo} alt="" className="w-[100px] object-contain" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Associated;
