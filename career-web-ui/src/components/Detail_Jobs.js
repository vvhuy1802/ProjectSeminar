import React from "react";
import { BsSend } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
const Detail_Jobs = () => {
  const totalJobs = useSelector((state) => state.global.totalJobs);
  console.log("data: ", totalJobs);
  return (
    <div className="bg-greyIsh">
      {totalJobs.length > 0 &&
        totalJobs[0].map((item,index) => (
          index===0&&
          <>
            <div className="flex">
              <div>
                <div className="px-10 py-8 bg-greyIsh">
                  <div className="flex justify-between bg-white shadow-lg shadow-greyIsh-700 w-full items-center p-5">
                    <div className="flex items-center gap-16">
                      <div className="border rounded-full">
                        <img
                          className=" h-[80px] w-[100px]"
                          src="https://cdn.topcv.vn/80/company_logos/498IvFMDo2L60nGzXP3a0Y75xxrC3S4g_1653639891____c1dbad37e1ff62ce9f069436a1dbbdf4.png"
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
                      <button className=" bg-blueColor p-2 w-[200px] flex items-center justify-center gap-3">
                        <BsSend className="text-white text-2xl" />
                        <span className="text-white text-sm font-medium">
                          ỨNG TUYỂN NGAY
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-10 py-4 bg-greyIsh">
                  <div className="bg-white flex flex-col gap-2 shadow-lg shadow-greyIsh-700 w-full p-5">
                    <span className=" font-semibold text-[20px] text-color_text">
                      Chi tiết tin tuyển dụng{" "}
                    </span>
                    <div className="flex gap-3">
                      {item.require.map((item_require) => (
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
                      <button className=" mb-1 ml-2">
                        <span className=" text-xs underline">See map</span>
                      </button>
                    </div>
                    <div className="border mt-2" />
                    {item.description.map((item) => (
                      <div className="mt-4">
                        <h2 className="font-semibold text-[20px]">
                          {item.title}
                        </h2>
                        <ul>
                          {item.content.split("| ").map((item_content) => (
                            <li className="mt-1">
                              &nbsp;&nbsp;&nbsp;{item_content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-10 py-8 bg-greyIsh">
                  <div className="bg-white flex flex-col gap-2 shadow-lg shadow-greyIsh-700 w-full p-5">
                    <span className=" font-semibold text-[20px] text-color_text">
                      Việc làm liên quan
                    </span>
                    {totalJobs[0].map((item) => (
                    <div className="border p-5 flex justify-between">
                      <div className="flex gap-7 items-center">
                        <img
                          className="w-[90px] h-[90px] border rounded-xl"
                          src="https://cdn.topcv.vn/150/company_logos/versehub-6204d5e76d7ad.jpg"
                          alt="Company"
                        />
                        <div className="flex flex-col gap-1">
                          <p>Frontend Developer( Reactjs)</p>
                          <p>Công ty Cổ Phần Smartten Software</p>
                          <div className="flex border p-[2px] w-fit mt-2">
                            <span className="text-sm">React native</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between h-[90px]">
                        <p className=" text-blueColor font-semibold">
                          25 - 50 triệu
                        </p>
                        <button className=" bg-blueColor rounded-sm p-1">
                          <span className="text-sm text-white">Ứng tuyển</span>
                        </button>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
              <div className="px-6 py-8 bg-greyIsh sticky top-0">
                  <div className="bg-white flex flex-col gap-2 shadow-lg shadow-greyIsh-700 w-full p-5 items-center">
                    <img className="w-[120px] h-[120px]" src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNms4TEE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--6ee8ad1b5dc182197b3debbc28f70c709c4ee9bd/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--bb0ebae071595ab1791dc0ad640ef70a76504047/Screenshot%202022-11-09%20at%2010.22.53%20-%20Hien.png" alt="Company"/>
                    <p className=" font-semibold text-[20px]">Noveo Vietnam</p>
                    <p className=" text-sm mt-2">We develop applications that address the entire breadth your users' expectations</p>
                    <button className=" bg-blueColor p-2 rounded mt-3">
                      <span className="text-sm text-white">Xem trang công ty của chúng tôi</span>
                    </button>
                  </div>
                </div>
            </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Detail_Jobs;
