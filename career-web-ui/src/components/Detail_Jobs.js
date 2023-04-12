import React,{useEffect,useState} from "react";
import { BsSend } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const Detail_Jobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;
  const totalJobs = useSelector((state) => state.global.totalJobs);
  const [relevantJobs, setRelevantJobs] = useState([]);
  const applyNow = (link_company) => {
    window.open(link_company, "_blank");
  };

  const handleRoute = (job) => {
    navigate(
      `/it-job/${job.job_name.replace(/ /g, '-').replace(/-{2,}/g, '-').replace(/\//g, '-')}`,
      {
        state: job
      },
    )
  }

  useEffect(() => {
    let job_relevant =[]
   totalJobs.map((job) => {
      job.map((item1) => {
        if (item1.tag===item.tag) {
          job_relevant.push(item1)
        }
      });
    });
    setRelevantJobs(job_relevant)
  }, [item]);

  return (
        <div className="bg-greyIsh">
          {window.scrollTo(0, 0)}
          <div className="mx-10 py-8 bg-greyIsh hidden lg:block">
                <div className="flex justify-between bg-white shadow-lg shadow-greyIsh-700 w-full items-center p-5">
                  <div className="flex items-center gap-16">
                    <div>
                      <img
                        className=" h-[80px] w-[100px]"
                        src={item.image}
                        alt="My Image"
                      />
                    </div>
                    <div>
                      <h1 className=" font-semibold text-blueColor text-xl">
                        {item.job_name}
                      </h1>
                      <h2 className=" font-medium text-lg">
                        {item.company_name}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <button className=" mr-2 bg-blueColor p-2 w-[200px] flex items-center justify-center gap-3 rounded-[5px] ease-in-out transform hover:-translate-y-1 hover:scale-105 transition duration-500">
                      <BsSend className="text-white text-2xl" />
                      <span className="text-white text-sm font-medium" onClick={()=>applyNow(item.link_job)}>
                        ỨNG TUYỂN NGAY
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mx-10 py-8 bg-greyIsh lg:hidden">
                <div className="flex justify-between bg-white shadow-lg shadow-greyIsh-700 w-full items-center p-5">
                  <div className="flex items-center gap-5">
                    <div>
                      <img
                        className=" h-[70px] w-[100px]"
                        src={item.image}
                        alt="My Image"
                      />
                    </div>
                    <div>
                      <h1 className=" font-semibold text-blueColor text-[18px]">
                        {item.job_name}
                      </h1>
                      <h2 className=" font-medium text-[16px]">
                        {item.company_name}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <button className=" ml-3 bg-blueColor p-2 w-[170px] flex items-center justify-center gap-3 rounded-[5px] ease-in-out transform hover:-translate-y-1 hover:scale-105 transition duration-500">
                      <BsSend className="text-white text-[15px]" />
                      <span className="text-white text-sm font-medium" onClick={()=>applyNow(item.link_job)}>
                        ỨNG TUYỂN NGAY
                      </span>
                    </button>
                  </div>
                </div>
              </div>
          <div className="flex">
            <div>
              <div className="px-10 py-4 bg-greyIsh">
                <div className="bg-white flex flex-col gap-2 shadow-lg shadow-greyIsh-700 w-full p-5">
                  <span className=" font-semibold text-[20px] text-color_text">
                    Chi tiết tin tuyển dụng{" "}
                  </span>
                  <div className="flex gap-3">
                    {item.require &&
                      item.require.map((item_require) => (
                        <div className="flex border p-[2px] w-fit">
                          <span className="text-sm">{item_require}</span>
                        </div>
                      ))}
                  </div>
                  <div className="flex gap-1 items-center">
                    <RiMoneyDollarCircleLine className="text-blueColor text-xl" />
                    <span className="text-sm text-blueColor">
                      {item.salary}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <SlLocationPin className=" text-xl" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <div className="border mt-2" />
                  {item.description &&
                    item.description.map((item) => (
                      <div className="mt-4">
                        <h2 className="font-semibold text-[20px]">
                          {item.title}
                        </h2>
                        <ul>
                          {item.content &&
                            item.content
                              .split("| ")
                              .map((item_content) => (
                                <li className="mt-1">
                                  &nbsp;&nbsp;&nbsp;{item_content}
                                </li>
                              ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
              <div className="lg:hidden">
              <div className="px-10 py-4 bg-greyIsh sticky top-0">
                <div className="bg-white flex gap-2 shadow-lg shadow-greyIsh-700 w-full p-5 items-center">
                <div className="gap-4 flex items-center">
                  <img
                    className="w-[70px] h-[70px]"
                    src={item.image}
                    alt="Company"
                  />
                  <div>
                  <p className=" font-semibold text-[17px]">{item.company_name}</p>
                  <p className=" text-sm mt-2">
                    {item.company_description.length>100?item.company_description.slice(0,100)+"...":item.company_description}
                  </p>
                  </div>
                  </div>
                  <button className=" h-12 bg-blueColor rounded-[5px] ease-in-out transform hover:-translate-y-1 hover:scale-105 transition duration-500" onClick={()=>{applyNow(item.link_company)}}>
                    <span className="text-[14px] text-white">
                      Xem trang công ty của chúng tôi
                    </span>
                  </button>
                </div>
              </div>
            </div>
              <div className="px-10 py-8 bg-greyIsh">
                <div className="bg-white flex flex-col gap-2 shadow-lg shadow-greyIsh-700 w-full p-5">
                  <span className=" font-semibold text-[20px] text-color_text">
                    Việc làm liên quan
                  </span>
                  {relevantJobs.map((item) => (
                    <div className="border p-5 flex justify-between shadow-lg shadow-greyIsh-700 ease-in-out transform hover:-translate-y-1 hover:scale-105 transition duration-500 mt-3">
                      <div className="flex gap-7 items-center">
                        <img
                          className="w-[90px] h-[90px] border rounded-xl"
                          src={item.image}
                          alt="Company"
                        />
                        <div className="flex flex-col gap-1">
                          <p className=" cursor-pointer hover:text-blueColor font-semibold" onClick={() => handleRoute(item)}>{item.job_name}</p>
                          <p>{item.company_name}</p>
                          <div className="flex gap-3">
                          {item.require.map((item_require)=>(
                             <div className="flex border p-[2px] w-fit mt-2">
                             <p className="text-sm">{item_require}</p>
                            </div>
                          ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between h-[90px]">
                        <p className=" text-blueColor font-semibold">
                          {item.salary}
                        </p>
                        <button className=" bg-blueColor rounded-[5px] w-28 h-8 self-end">
                          <span className="text-sm text-white">Ứng tuyển</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden lg:block" >
              <div className="w-[400px] py-4 bg-greyIsh sticky top-0 mx-5">
                <div className="bg-white flex flex-col gap-2 shadow-lg shadow-greyIsh-700 w-full p-5 items-center">
                  <img
                    className="w-[120px] h-[120px]"
                    src={item.image}
                    alt="Company"
                  />
                  <p className=" font-semibold text-[20px] text-center">{item.company_name}</p>
                  <p className=" text-sm mt-2">
                    {item.company_description.length>100?item.company_description.slice(0,100)+"...":item.company_description}
                  </p>
                  <button className=" bg-blueColor p-2 rounded-[5px] mt-3 ease-in-out transform hover:-translate-y-1 hover:scale-105 transition duration-500" onClick={()=>{applyNow(item.link_company)}}>
                    <span className="text-sm text-white">
                      Xem trang công ty của chúng tôi
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Detail_Jobs;
