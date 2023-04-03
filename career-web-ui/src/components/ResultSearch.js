import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ListJob } from "./index";
import { Search } from "./index";
const ResultSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const formatSearch = (str) => {
    const a = str.split(" ");
    const b = a.map((item) => {
      return item[0].toUpperCase() + item.slice(1);
    });
    const c = b.join(" ");
    return c;
  };
  return (
    <div>
      <Search />
      <div className="mt-5 flex flex-col">
        <div>
          <div className="flex items-center">
            <p
              href="/"
              className="cursor-pointer "
              onClick={() => {
                navigate("/");
              }}
            >
              <a href="localhost:3000/" className=" hover:text-blue-500">
                Home Page
              </a>
            </p>
            <p className="px-3">{">"}</p>
            <p className="text-black font-semibold">{data.search}</p>
          </div>
          <h1 className="text-[14px] text-[#888]">
            {`Tìm việc làm ${formatSearch(
              data.search
            )}, tuyển dụng ${formatSearch(
              data.search
            )}, Tổng hợp các việc làm ${formatSearch(data.search)} mới nhất`}
          </h1>
        </div>

        <div className="mt-5 w-[95%] self-center bg-greyIsh rounded-[10px] mb-5">
          <div className="flex  p-5">
            <h1>Tìm thấy</h1>
            <h1 className="text-blue-500 font-semibold px-1">
              {data.result.length}
            </h1>
            <h1> việc làm phù hợp với yêu cầu của bạn</h1>
          </div>
          <div className="border-b-[0.5px] border-[#888]" />
          <div className="flex p-5 flex-col">
            <ListJob job={data.result} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSearch;
