import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { styles } from "../../../styles/style";
import React, { FC, useState, useEffect } from "react";
import Loader from "../../Leader/Loader";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data, isLoading } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDargLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
      <>
        {
          isLoading ? (
            <Loader/>
          ):(
            <div className="w-[80%] m-auto mt-[4rem]">
            <form action="" onSubmit={handleSubmit} className={`${styles.label}`}>
              <div>
                <label htmlFor=""> Course Name</label>
                <input
                  type="name"
                  name=""
                  required
                  value={courseInfo.name}
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, name: e.target.value })
                  }
                  id="name"
                  placeholder="Mern Stack Lms Platmofrom"
                  className={`${styles.input}`}
                />
              </div>
              <br />
              <div className="mb-5">
                <label htmlFor="" className={`${styles.label}`}>
                  {" "}
                  Course Description
                </label>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={5}
                  placeholder="Write something staning"
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, description: e.target.value })
                  }
                  value={courseInfo.description}
                  className={`${styles.input} !h-min !py-2`}
                ></textarea>
              </div>
              <br />
              <div className="w-full flex justify-between">
                <div className="w-[45%]">
                  <label className={`${styles.label}`} htmlFor="">
                    {" "}
                    Course Price
                  </label>
                  <input
                    type="number"
                    name=""
                    required
                    value={courseInfo.price}
                    onChange={(e: any) =>
                      setCourseInfo({ ...courseInfo, price: e.target.value })
                    }
                    id="price"
                    placeholder="30"
                    className={`${styles.input}`}
                  />
                </div>
                <div className="w-[45%]">
                  <label className={`${styles.label}`} htmlFor="">
                    {" "}
                    Course Estimated Price (optional)
                  </label>
                  <input
                    type="number"
                    name=""
                    required
                    value={courseInfo.estimatedPrice}
                    onChange={(e: any) =>
                      setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                    }
                    id="estimatedPrice"
                    placeholder="82"
                    className={`${styles.input}`}
                  />
                </div>
              </div>
              <br />
              <div className="w-full flex justify-between">
                <div className="w-[45%]">
                  <label htmlFor="" className={`${styles.label}`}>
                    {" "}
                    Course Tags
                  </label>
                  <input
                    type="text"
                    name=""
                    required
                    value={courseInfo.tags}
                    onChange={(e: any) =>
                      setCourseInfo({ ...courseInfo, tags: e.target.value })
                    }
                    id="tags"
                    placeholder="Mern,Next 13, IO,CMS,LMS,Tailwind,ReactNativ"
                    className={`${styles.input}`}
                  />
                </div>
      
                <div className="w-[50%] !bg-transparent">
                  <label className={`${styles.label} w-[50%]`} htmlFor="">
                    {" "}
                    Course Categories
                  </label>
                  <select
                    className={`${styles.input} `}
                    value={courseInfo.categories}
                    onChange={(e: any) =>
                      setCourseInfo({ ...courseInfo, categories: e.target.value })
                    }
                  >
                    <option value="" className={`bg-black`}>
                      Select Category
                    </option>
                    {categories.map((item: any) => (
                      <option value={item.title} key={item._id} className="bg-black">
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div className="w-full flex justify-between">
                <div className="w-[45%]">
                  <label className={`${styles.label} `} htmlFor="">
                    {" "}
                    Course Level
                  </label>
                  <input
                    type="text"
                    name=""
                    required
                    value={courseInfo.level}
                    onChange={(e: any) =>
                      setCourseInfo({ ...courseInfo, level: e.target.value })
                    }
                    id="level"
                    placeholder="Beginer/Intermediate/Expert"
                    className={`${styles.input}`}
                  />
                </div>
      
                <div className="w-[50%]">
                  <label className={`${styles.label} w-[50%]`} htmlFor="">
                    {" "}
                    Demo Url
                  </label>
                  <input
                    type="text"
                    name=""
                    required
                    value={courseInfo.demoUrl}
                    onChange={(e: any) =>
                      setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                    }
                    id="demoUrl"
                    placeholder="http://github.com/foysal7788"
                    className={`${styles.input}`}
                  />
                </div>
              </div>
              <br />
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file"
                  className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                    dragging ? "bg-blue-500" : "bg-transparent"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDargLeave}
                  onDrop={handleDrop}
                >
                  {courseInfo.thumbnail ? (
                    <img
                      src={courseInfo.thumbnail}
                      alt=""
                      className="max-h-full w-full object-cover "
                    />
                  ) : (
                    <span className="text-black dark:text-white">
                      Drag and Drop Your Thumbnail here or click to browse
                    </span>
                  )}
                </label>
              </div>
              <br />
              <div className="w-full flex items-center justify-end">
                <input
                  type="submit"
                  value="Next"
                  className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                />
              </div>
              <br />
              <br />
            </form>
          </div>
          )
        }
      </>
  );
};

export default CourseInformation;
