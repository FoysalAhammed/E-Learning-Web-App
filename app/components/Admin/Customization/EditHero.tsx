import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data,refetch } = useGetHeroDataQuery("Banner",{refetchOnMountOrArgChange:true});
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setImage(data?.layout?.banner?.image?.url);
      setSubTitle(data?.layout?.banner?.subTitle);
    }
    if (isSuccess) {
      refetch()
      toast.success("Hero Updated Successfully!");
      console.log("success");
      
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async() => {
    await editLayout({
      type:"Banner",
      image,
      title,
      subTitle,
    });
  };
  console.log(data?.layout?.banner.title);

  return (
    <>
      <div className="w-full 1000px:flex items-center ">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:w-[500px] 1500px:h-[500px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] v-[50vh] hero_animation rounded-[50%] 1500px:left-[21rem] ">
          {" "}
        </div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-evenly">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[80%] w-[80%]  1500px:max-w[80%] h-[auto] z-[10]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              className="hidden"
              onChange={handleUpdate}
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20 dark:text-white text-black ">
              <AiOutlineCamera className="dark:text-white text-black text-[px] cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] ">
          <textarea
            placeholder="improve your online learning experience better"
            className="resize-none dark:text-white  text-[#000000c7] text-[25px ] px-3 w-full outline-none 1000px:text-[70px] bg-transparent  1500px:w-[600px] "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          ></textarea>

          <br />
          <textarea
            placeholder="improve your online learning experience better"
            className="dark:text-white  resize-none  text-[#000000ac] text-[18px] bg-transparent 1500px:!w-[55%] 1100px:!w-[78%] outline-none "
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          >
          </textarea>
          <br />
          <br />
          <br />
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
               ${
                 data?.layout?.banner.title !== title ||
                 data?.layout?.banner.subTitle !== subTitle ||
                 data?.layout?.banner?.image?.url !== image
                   ? "!cursor-pointer !bg-[#42d383]"
                   : "!cursor-not-allowed"
               } !rounded absolute bottom-12 right-12
            `}
            onClick={
              data?.layout?.banner.title !== title ||
              data?.layout?.banner.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
