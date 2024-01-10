'use client'
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import Link from "next/link"
import { styles } from "@/app/styles/style";
import CourseContentList from "../Course/CourseContentList"
import CheckoutForm from "../Payment/CheckoutForm"
import {Elements}  from "@stripe/react-stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { AnyNode } from "postcss";
type Props = {
  data: any;
  clientSecret:string;
  stripePromise:any;
  setRoute:any;
  setOpen:any;
};

const CourseDetails = ({ data,stripePromise,clientSecret,setRoute,setOpen:openAuthModal }: Props) => {
  const { data:userData } = useLoadUserQuery(undefined,{})

  
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>()


  useEffect(() => {
      setUser(userData?.user)
  }, [userData])
  
  const discountParcentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountParcentagePrice = discountParcentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);
  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true)
    }else{
       setRoute("Login")
       openAuthModal(true)
    }
       
  };
  
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-[600] text-black dark:text-white">
              {" "}
              {data.name}{" "}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {" "}
                {data.purchased} Students{" "}
              </h5>
            </div>
            <br />
            <h5 className="text-[25px] font-[600] text-black dark:text-white">
              {" "}
              What You Will Learn From This Course{" "}
            </h5>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div className="w-full flex 800px:items-center py-2">
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {" "}
                    {item.title}{" "}
                  </p>
                </div>
              ))}
            </div>
            <br />
            <br />
            <h1 className="text-[25px] font-[600] text-black dark:text-white">
              {" "}
              What are the prerequsites{" "}
            </h1>
            <div>
              {data.preRequisites?.map((item: any, index: number) => (
                <div className="w-full flex 800px:items-center py-2">
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {" "}
                    {item.title}{" "}
                  </p>
                </div>
              ))}
            </div>
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-[600] text-black dark:text-white">
                {" "}
              Course Overview{" "}
              </h1>
              <CourseContentList 
               data={data?.courseData}
               isDemo={true}
              />
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[25px] font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center pb-5">
                <Ratings rating={data.ratings} />
                <div className="mb-2 800px:mb-[unset]">
                  <h5 className="text-[25px] font-[600] text-black dark:text-white">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}{" "}
                    Course Rating {data?.reviews?.length} Reviews
                  </h5>
                </div>
                <br />
              </div>

              {(data?.reviews && [...data?.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div className="w-full pb-4">
                      <div className="flex">
                        <div className="w-[50px] h-[50px]">
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            {/* <h1 className="uppercase text-[18px] text-black dark:text-white">
                              {user.name.slice(0, 1)} 
                            </h1> */}
                            {/* <Image src={`${user?.avatar?.url}`} width={50} height={50} className="rounded-[50px]" alt=" "/> */}
                          </div>
                        </div>
                        <div className=" hidden 800px:block pl-3">
                          <div className="flex items-center">
                            
                            <h5 className="text-[18px] uppercase pr-2 text-black dark:text-white">
                              {user?.name}  
                            </h5>
                            <Ratings rating={item.rating} />
                            <h5 className="text-[18px]  pr-2 text-black dark:text-white">
                              {item.rating}
                            </h5>
                          </div>
                       
                          <p className="text-black dark:text-white">
                            {item.comment}
                          </p>
                          <small className="text-[#000000d1] dark:text-[#ffffff83]">
                            {format(item.createdAt)}
                          </small>
                          {/* <div className=" flex  items-center">
                            <h5 className="text-[18px] uppercase pr-2 text-black dark:text-white">
                              {user.name}  
                            </h5>
                            <Ratings rating={item.rating} />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
              <div className="top-[100px] left-0 w-full">
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
                <div className="flex items-center">
                  <h1 className="pt-5 text-[25px] text-black dark:text-white">
                    {data.price === 0? "Free" :data.price + "$"}
                  </h1>
                  <h5 className="pl-3 text-[20px] mt-2 line-through opacity-50 text-black dark:text-white">
                    {data.estimatedPrice}
                  </h5>
                  <h4 className="pl-5 pt-4 text-[22px]  text-black dark:text-white">
                    {discountParcentagePrice}% off 
                  </h4>
                </div>
                <div className="flex items-center">
                  {isPurchased ? (
                   <Link className={`${styles.button}  !w-[180px] my-3 cursor-pointer !bg-[crimson] `}
                    href={`/course-access/${data._id}`}
                   > Enrolled  </Link>
                  ):(
                    <div className={`${styles.button}  !w-[180px] my-3 cursor-pointer !bg-[crimson] `}
                    onClick={handleOrder}
                   > 
                   Buy Now {data.price}
                    </div>
                  )
                
                }
                </div>
                <br />
              <p className="pb-1 text-black dark:text-white">Source Code Included</p>
                <p className="pb-1 text-black dark:text-white">Full lifeTime Access</p>
                <p className="pb-1 text-black dark:text-white">Source Code Included</p>
                <p className="pb-1 text-black dark:text-white">Certificate of Completetion</p>
                <p className="pb-1 text-black dark:text-white">Premium Support 24/7 Days</p>
              </div>
        </div>  
        </div>

      </div>
      <>
      {
        open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
              <IoCloseOutline size={40}
                 className="text-black cursor-pointer"
                 onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {
                  stripePromise && clientSecret && (
                    <Elements  stripe={stripePromise} options={{clientSecret}} >
                         <CheckoutForm  setOpen={setOpen} data={data} user={user}/>
                    </Elements>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
      </>
    </div>
  );
};

export default CourseDetails;
