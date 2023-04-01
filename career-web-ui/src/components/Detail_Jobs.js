import React from 'react'
import {BsSend} from "react-icons/bs"
const Detail_Jobs = () => {
  return (
    <div>
        <div className='px-24 py-8 bg-greyIsh'>
        <div className='flex justify-between bg-white shadow-lg shadow-greyIsh-700 w-full items-center p-5'>
                <div className='border rounded-full '>
                <img className=' h-[100px] w-[100px]' src="https://cdn.topcv.vn/80/company_logos/498IvFMDo2L60nGzXP3a0Y75xxrC3S4g_1653639891____c1dbad37e1ff62ce9f069436a1dbbdf4.png" alt="My Image"/>
                </div>
                <div>
                        <h1 className=' font-semibold text-blueColor text-xl'>Frontend Developer (Reactjs) - Thu Nhập Upto 30 Triệu</h1>
                        <h2 className=' font-medium text-lg'>XIPAT FLEXIBLE SOLUTIONS COMPANY LIMITED</h2>
                </div>
                <div>
                        <button className=' bg-blueColor p-2 w-[200px] flex items-center justify-center gap-3'>
                                <BsSend className='text-white text-2xl'/>
                                <span className='text-white text-sm font-medium'>ỨNG TUYỂN NGAY</span>
                        </button>
                </div>
        </div>
        </div>
    </div>
  )
}

export default Detail_Jobs