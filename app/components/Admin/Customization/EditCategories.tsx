import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Leader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (isSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);
  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoriesTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const handleEdit = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoriesTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title} `}>All Categories</h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="p3">
                  <div className="flex items-center w-full justify-center">
                    <input
                      placeholder="Enter Category Title"
                      value={item.title}
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoAddCircleOutline
              classname="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
                   ${
                     areCategoriesUnchanged(
                       data.layout.categories,
                       categories
                     ) || isAnyCategoriesTitleEmpty(categories)
                       ? "!cursor-not-allowed"
                       : "!cursor-pointer !bg-[#42d383]"
                   } !rounded absolute bottom-12 right-12
                `}
            onClick={
              areCategoriesUnchanged(data.layout?.categories, categories) ||
              isAnyCategoriesTitleEmpty(categories)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
