import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import coins_icon from "../assets/coins_icon.png";
import { useNavigate, useLocation } from "react-router-dom";
const SuggestJob = () => {
  const { totalJobs } = useSelector((state) => state.global);
  const [job, setJob] = React.useState([]);
  const navigate = useNavigate();
  // count = 8 if screen width > 1024px else count = 6
  const count = window.innerWidth > 1560 ? 8 : 6;

  const formatJobName = (name) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/\//g, "-")
      .toLowerCase();
  };

  useEffect(() => {
    setJob([]);
    for (let i = 0; i < count; i++) {
      let a = Math.floor(Math.random() * 8);
      let b = Math.floor(Math.random() * 15);
      setJob((prev) => [...prev, totalJobs[a][b]]);
    }
  }, [count]);

  const handleRoute = (job) => {
    navigate(
      `/it-job/${formatJobName(job.job_name)}`,
      {
        state: job
      },
    );
  }

  const formatName = (name) => {
    if (name.length > 49) {
      return name.slice(0, 49) + "...";
    } else return name;
  };

  const formatCompany = (name) => {
    if (name.length > 49) {
      return name.slice(0, 49) + "...";
    } else return name;
  };

  const applyNow = (job_link) => {
    window.open(job_link, "_blank");
  };

  return (
    <div className="flex items-center justify-center mt-[4rem] flex-col">
      <p className=" text-[25px] font-bold">Latest featured jobs</p>

      <div className="flex flex-col items-center justify-center mt-5">
        <h1>Search and find your dream job is now easier than ever.</h1>
        <h1>Just browse a job and apply if you need to.</h1>
      </div>

      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mt-5 ">
        {job.map((item, index) => (
          <div
            key={index}
            className="flex p-3 mt-5 w-[350px] h-fit rounded-[10px] shadow-lg shadow-greyIsh-900 flex-col border-[1px]"
          >
            <div className="py-[1rem]">
              <h1 className="text-[18px] font-bold h-[60px] cursor-pointer"  onClick={() => handleRoute(item)} >
                {formatName(item.job_name)}
              </h1>
              <div className="items-center mt-2">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <svg
                      width="16"
                      height="19"
                      viewBox="0 0 16 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.28572 0C4.61925 0.00196598 3.0216 0.66484 1.84322 1.84321C0.664847 3.02159 0.00197267 4.61924 6.68736e-06 6.28571C-0.00198925 7.64756 0.442853 8.97245 1.26629 10.0571C1.26629 10.0571 1.43772 10.2829 1.46572 10.3154L6.28572 16L11.108 10.3126C11.1331 10.2823 11.3052 10.0571 11.3052 10.0571L11.3057 10.0554C12.1288 8.97121 12.5734 7.64693 12.5714 6.28571C12.5695 4.61924 11.9066 3.02159 10.7282 1.84321C9.54985 0.66484 7.95219 0.00196598 6.28572 0ZM6.28572 8.57143C5.83365 8.57143 5.39173 8.43737 5.01585 8.18622C4.63996 7.93506 4.347 7.57808 4.174 7.16042C4.001 6.74276 3.95573 6.28318 4.04393 5.83979C4.13212 5.39641 4.34981 4.98913 4.66948 4.66947C4.98914 4.34981 5.39642 4.13211 5.8398 4.04392C6.28319 3.95572 6.74277 4.00099 7.16043 4.17399C7.57809 4.34699 7.93507 4.63996 8.18622 5.01584C8.43738 5.39172 8.57144 5.83364 8.57144 6.28571C8.57068 6.89169 8.32962 7.47263 7.90113 7.90112C7.47264 8.32961 6.8917 8.57067 6.28572 8.57143Z"
                        fill="black"
                      />
                    </svg>
                    <h1 className="text-[15px] ml-1">{item.location}</h1>
                  </div>
                  <div className="p-1.5 rounded-lg ml-10 bg-[#FFF8F0]">
                    <h1 className="text-[15px] text-[#FF8100]">Full-time</h1>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <img
                    src={coins_icon}
                    alt=""
                    className="w-[15px] h-[15px] object-contain"
                  />
                  <h1 className="text-[15px] ml-1">{item.salary}</h1>
                </div>
              </div>

              <div className="flex items-center mt-5">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt=""
                    className="w-[50px] h-[50px] object-contain rounded-lg"
                  />
                  <div>
                    <h1 className="ml-5">{formatCompany(item.company_name)}</h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-8 w-full justify-center">
                <div className="bg-blueColor p-2 rounded-lg w-[80%] h-[45px] items-center flex justify-center cursor-pointer hover:bg-blue-700 hover:scale-105 transition duration-300 ease-in-out transform">
                  <h1
                    onClick={() => {
                      applyNow(item.link_job);
                    }}
                    className="text-[15px] text-white"
                  >
                    Appy now
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestJob;
