import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import React,{useState,useEffect} from 'react'
import CourseCard from "../Course/CourseCard"
import Loader from '../Leader/Loader'
type Props = {}

const Courses = (props: Props) => {
  const {data,isLoading} = useGetAllCoursesQuery({})
  const [courses,setCourses] = useState<any[]>([])
useEffect(() => {
 setCourses(data?.courses)
}, [data])
   
  return (
    < >
       {
        isLoading ? (
          <Loader/>
        ):(
          <div className={`w-[90%] 800px:w-[80%] m-auto `}>
          <h1 className="text-center  text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
            <span className="text_animate">Expand Your  </span><span className="text_animate">
            Career Oppurtunity 
            </span> <br /> <span className=''>Oppurtunity  With Our Courses</span>
          </h1>
          <br /> <br />
          <div className="grid   grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
            {
              courses && courses.map((item:any,index:number) => (
               <>
                 <CourseCard
                 item={item}
                 key={index}
                />
    
               </>
              ))
            }
          </div>
        </div>
        )
       }
    </>
  )
}

export default Courses