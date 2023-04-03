import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import coins_icon from "../assets/coins_icon.png";
export default function ListJob(props) {
  const { job } = props;
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = job.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(job.length / itemsPerPage);

  const handlePageClick = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const newOffset = (event.selected * itemsPerPage) % job.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="rendered">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="w-full h-[160px] mb-5 bg-white rounded-[10px] border flex items-center justify-center p-5 shadow-lg shadow-greyIsh-700"
          >
            <div className="w-full h-full flex">
              <div className="imgDiv w-[130px] h-full p-2 rounded-[10px] border">
                <img src={item.image} alt="" className="w-full h-full" />
              </div>
              <div className="textDiv w-full ml-3 h-full">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-[20px]">{item.job_name}</h1>
                  <div className="flex items-center">
                    <img
                      src={coins_icon}
                      alt=""
                      className="w-[20px] h-[20px] object-contain"
                    />
                    <h1 className=" font-semibold text-[15px] ml-1">
                      {item.salary}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-[14px]">{item.company_name}</h1>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-[14px]">{item.location}</h1>
                </div>
                <div className="flex mt-2">
                  {item.require.map((item, index) => (
                    <div
                      key={index}
                      className="bg-greyIsh p-1 px-2 rounded-[10px] mr-4"
                    >
                      <h1 className=" text-[14px]">{item}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        previousClassName="page-item"
        nextClassName="page-item"
        activeClassName="active"
      />
    </>
  );
}
