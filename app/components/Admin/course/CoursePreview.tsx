import React, { FC, useState } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import Ratings from "../../../utils/Ratings";
import { styles } from "../../../../app/styles/style";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
type Props = {
  active: number;
  setActive: (active: number) => void;
  coursedata: any;
  handleCourseCreate: any;
  isEdit?:boolean
};

const CoursePreview: FC<Props> = ({
  coursedata,
  handleCourseCreate,
  setActive,
  active,
  isEdit
}) => {
  const disCountPercentage =
    ((coursedata?.estimatedPrice - coursedata?.price) /
      coursedata?.estimatedPrice) *
    100;

  const disCountPercentagePrice = disCountPercentage.toFixed(0);

  const prevButton = () =>{
    setActive(active - 1)
  }
  const createCourse = () =>{
    handleCourseCreate();
  }
  return (
    <div className="w-[90%] m-auto py-6 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={coursedata?.demoUrl}
            title={coursedata?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {coursedata?.price === 0 ? "Free" : coursedata?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {coursedata?.estimatedPrice}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {disCountPercentagePrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {coursedata?.price}$
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text "
            name=""
            id=""
            placeholder="Discount code ..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%]  ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 cursor-pointer`}
          >
            {" "}
            Apply
          </div>
        </div>
        <p className="pb-1">. Source COde Included</p>
        <p className="pb-1">. Source COde Included</p>
        <p className="pb-1">. Source COde Included</p>
        <p className="pb-1">. Source COde Included</p>
        <p className="pb-3">. Source COde Included</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px]font-[600]">{coursedata?.name}</h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-[600]">
            What you will lwarn from this course?{" "}
          </h1>
        </div>
        {coursedata?.benifits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-. py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2"> {item.title} </p>
          </div>
        ))}
        <br /> <br />
        <h1 className="text-[25px] font-[600]"> what are the preRequisites for starting this course?</h1>
        {coursedata?.preRequisites?.map((item:any,index:number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2"> {item.title} </p>
              </div>
        ))}
        {/* course descriptions */}
        <div className="w-full">
          <h1 className="text-[25px] font-[600]"> Course Details</h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden"> {coursedata?.description}</p>
        </div>
        <br /> <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
         onClick={() => prevButton() }
        >
          previous
        </div>
        <div className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
         onClick={() => createCourse() }
        >
           Create
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;

