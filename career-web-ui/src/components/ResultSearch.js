import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Search } from "./index";
const ResultSearch = ({ state }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div>
      <Search />
      <div className="mt-5">
        <div>
          <div className="flex items-center">
            <p
              href="/"
              className="cursor-pointer "
              onClick={() => {
                navigate(-1);
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
            {`Tìm việc làm ${data.search}, tuyển dụng ${data.search}, Tổng hợp các việc làm ${data.search} mới nhất`}
          </h1>
        </div>
        <div className="mt-5">
          <div className="w-[200px] h-[200px]">

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSearch;
