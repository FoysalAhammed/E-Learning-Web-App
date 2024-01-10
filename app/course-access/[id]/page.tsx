"use client"

import React, { useEffect } from 'react'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import Loader from '../../../app/components/Leader/Loader'
import CourseContent from "../../components/Course/CourseContent"

import { redirect } from 'next/navigation'
type Props = {
    params:any
}

const page = ({params}: Props) => {

    const id = params.id;
    const {isLoading,error,data} = useLoadUserQuery(undefined,{})
  
 
     useEffect(() => {
       if (data) {
         const isPurchased = data.user.courses.find(
          (item:any) => item._id ===id 
          
          );
         if(!isPurchased) {
             redirect("/") 
         }
       }
       if(error) {
        redirect("/")
      
     }
       console.log("abc");
     }, [data,error])
     
  return (
   <>
      {
        isLoading ? (
        <Loader/>
        ):(
          <div className="">
            <CourseContent id={id} user={data.user} />
          </div>
        )
      }

   </>
  )
}

export default page