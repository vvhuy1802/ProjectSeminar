import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
const Search = () => {
  return (
    <div className="searchDiv grid bg-greyIsh rounded-[10px] p-[3rem]">
      <div className="flex gap-[20px]">
        <div className="flex items-center">
          <MdOutlineLocationOn className="ml-1 text-[25px] icon absolute" />
          <select className="firstDiv flex rounded-[8px] gap-[10px] bg-white px-6 py-4 shadow-lg shadow-greyIsh-700 w-[200px]">
            <option value="volvo">All Cities</option>
            <option value="volvo">Ho Chi Minh</option>
            <option value="volvo">Da Nang</option>
            <option value="volvo">Ha Noi</option>
            <option value="volvo">Others</option>
          </select>
        </div>
        <div className="secondDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white shadow-lg p-5 shadow-greyIsh-700 w-full h-[56px] self-center">
          <div className=" flex gap-2 items-center w-full">
            <AiOutlineSearch className="text-[25px] icon" />
            <input
              type="text"
              className=" bg-transparent text-blue-500 focus:outline-none w-[100%]"
              placeholder="Search Job Here..."
            />
            <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-textColor icon" />
          </div>
        </div>
        <div className="px-6 py-4">
          <button className="bg-blueColor text-white rounded-[8px] shadow-lg shadow-greyIsh-700 w-[150px] h-[45px] ">
            Search
          </button>
        </div>
      </div>
      <div className="secDiv flex items-center gap-10 justify-center">
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="relevance" className="text-[#808080] font-semibold">
            Sort By:
          </label>
          <select name="" id="relevance" className="bg-white rounded-[3px] px-4 py-1">
            <option value="">Relevance</option>
            <option value="">Relevance</option>
            <option value="">Relevance</option>
            <option value="">Relevance</option>
          </select>
        </div>
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="relevance" className="text-[#808080] font-semibold">
            Sort By:
          </label>
          <select name="" id="relevance" className="bg-white rounded-[3px] px-4 py-1">
            <option value="">Relevance</option>
            <option value="">Relevance</option>
            <option value="">Relevance</option>
            <option value="">Relevance</option>
          </select>
        </div>
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="relevance" className="text-[#808080] font-semibold">
            Sort By:
          </label>
          <select name="" id="relevance" className="bg-white rounded-[3px] px-4 py-1">
            <option value="">Relevance</option>
            <option value="">Relevance</option>
            <option value="">Relevance</option>
            <option value="">Relevance</option>
          </select>
        </div>
        <span className="text-[#a1a1a1] cursor-pointer">
          Clear All
        </span>
      </div>
    </div>
  );
};

export default Search;
