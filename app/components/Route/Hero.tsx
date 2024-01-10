import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC,useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Leader/Loader";
import {useRouter} from "next/navigation"
type Props = {}; 

const Hero: FC<Props> = (props) => {
  const { data,isLoading } = useGetHeroDataQuery("Banner",{});
   const [search,setSearch] = useState("")
    const router = useRouter()

     const handleSearch = ()=>{
      if (search === "") {
        return
      }else{
        router.push(`/courses?title=${search}`)
      }
     }
  return (
 <>
  {
    isLoading ? (
      <Loader/>
    ):(
   
      <div className="w-full justify-between 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:w-[700px] 1500px:h-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] v-[50vh] hero_animation rounded-full ">   </div>
        <div className="1000px:w-[30%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <Image
            src={data?.layout?.banner?.image?.url}
            width={400}
            height={400}
            alt=""
            className="object-contain 1100px:max-w-[90%] w-[90%]  1500px:max-w[85%] h-[auto] z-[10]"
          />
        </div>
        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center  mt-[150px]">
          <h2 className="dark:text-white text_animate font-[800] text-[#000000c7] text-[30px ] px-3 w-full 1000px:text-[70px] 1000px:leading-[75px] 1500px:w-[600px]">
          {data?.layout?.banner?.title}
          </h2>
          <br />
          <p className="dark:text-[#edfff4]   text-[#000000ac] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] ">
          {data?.layout?.banner?.subTitle}
          </p>
          <br />
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
            <input
              type="search"
              className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:tex-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e]  dark:text-[#ffffffe6] text-[20px]  "
              placeholder="Search Courses...."
              value={search}
              onChange={(e:any) => setSearch(e.target.value)}
            />

            <div 
            onClick={handleSearch}
            className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
              <BiSearch className="text-white" size={30} />
            </div>
          </div>
          <br />
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
            <Image
              src={require(`../../../public/assets/man1.jpg`)}
              alt=""
              className="rounded-full w-[50px]  "
            />
            <Image
              src={require(`../../../public/assets/man1.jpg`)}
              alt=""
              className="rounded-full max-w-[50px]  ml-[-20px] "
            />
            <Image
              src={require(`../../../public/assets/man1.jpg`)}
              alt=""
              className="rounded-full w-[50px]   ml-[-20px] "
            />
            <p className="dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px]">
              5000k+ People already trusted us.{" "}
            
            <Link href="/courses" className="dark:tex-[#46e256] text-[crimson]"shallow >
              View Courses
            </Link>{" "}
            </p>
          </div>
          <br />
      </div>
 
    </div>
      
    )
  }
 </>
  );
};

export default Hero;
