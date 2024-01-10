"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
type Props = {id:string};

const EditCourse: FC<Props> = ({id}) => {
    const [courseData, setCourseData] = useState({});
    const [active, setActive] = useState(0);
    
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [preRequisites, setPrerequisites] = useState([{ title: "" }]);
   console.log(id);

  const { isLoading, data, isSuccess,error } = useGetAllCoursesQuery(
    {}
  );
  const editCourseData = data && data?.courses?.find((i:any)=> i._id === id)

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "", 
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "", 
  });
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl:"",
      title: "",
      description: "",
      videoSection: "Untitled Section ",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "0",
    },
  ]);
    

  // useEffect(() => {
  // if (isSuccess) {
  //   toast.success("Course edit Succesfully");
  //   redirect("/admin/all-courses")
  // }
  // if (error) {
  //    if ("data" in error) {
  //       const errorMessage = error as any;
  //       toast.error(errorMessage.data.message)
  //    }
  // }
  // }, [isSuccess,error])

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
         name: editCourseData.name,
         description:  editCourseData.description,
         price:editCourseData.price,
         estimatedPrice: editCourseData?.estimatedPrice,
         tags:editCourseData.tags,
         level: editCourseData.level,
         demoUrl: editCourseData.demoUrl,
         thumbnail: editCourseData?.thumbnail?.url, 
      })
      setBenefits(editCourseData.benefits)
      setCourseContentData(editCourseData.courseData)
      setPrerequisites(editCourseData.preRequisites)
    }
 
 }, [editCourseData])



  const handleSubmit = async () =>{
            //  formate benefits array  
            const formattedbenefits = benefits.map((benefits) => ({title:benefits.title}))

            // formate preRequisites array 
            const formattedPrerequists = preRequisites.map((preRequisites) => ({title:preRequisites.title}))

            // formate course content array 
            const formattedCourseContentData = courseContentData.map((courseContentData) => ({
               videoUrl:courseContentData.videoUrl,
               title:courseContentData.title,
               description:courseContentData.description,
               videoSection:courseContentData.videoSection,
               links:courseContentData.links.map((link) => ({
                title:link.title,
                url:link.url,
               })),
                  suggestion:courseContentData.suggestion,

            }))

            const data = {
              name:courseInfo.name,
              description:courseInfo.description,
              price:courseInfo.price,
              estimatedPrice:courseInfo.estimatedPrice,
              tags:courseInfo.tags,
              thumbnail:courseInfo.thumbnail,
              level:courseInfo.level,
              demoUrl:courseInfo.demoUrl,
              totalVideos:courseContentData.length,
              benefits:formattedbenefits,
              preRequisites:formattedPrerequists,
              courseData:formattedCourseContentData,
            }
            setCourseData(data)
  }
const handleCourseCreate =async(e:any) =>{
   const data = courseData;
    if (!isLoading) {
      
    }
}
console.log(data);

  return (
    <div className="w-full flex  min-h-screen">
      <div className="w-[80%]">
        { active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        { active === 1 && (
          <CourseData
           benefits={benefits}
           setBenefits={setBenefits}
           preRequisites={preRequisites}
           setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        { active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit = {handleSubmit}
          />
        )}
        { active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            coursedata={courseData}
            
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
