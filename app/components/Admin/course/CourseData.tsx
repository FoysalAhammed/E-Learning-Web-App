import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { MdAddCircle } from "react-icons/md";
type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  preRequisites: { title: string }[];
  setPrerequisites: (preRequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  preRequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenifitChange = (index: number, value: any) => {

    const updateBenifits = [...benefits];
    updateBenifits[index].title = value;
    setBenefits(updateBenifits);
  };

  const handleAddbenifits = () => {
    setBenefits([...benefits, { title:"" }]);
  };

  const handlePrerequistsChange = (index: number, value: any) => {
    const updateprerequisits = [...preRequisites];
    updateprerequisits[index].title = value;
    setPrerequisites(updateprerequisits);
  };

  const handleAddPrerequists = () => {
    setPrerequisites([...preRequisites, { title: "" }]);
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () =>{
    if (benefits[benefits.length - 1]?.title !== "" &&  preRequisites[preRequisites.length - 1]?.title !=="") {
        setActive(active + 1)
    }else{
        toast.error("please Fill The Fields For Go TO Next")
    }
    
  }
  console.log(benefits);
  
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div className="">
        <label htmlFor="email" className={`${styles.label} text-[20]`}>
          what are the benefits for the students in this course?
        </label>
        <br />
        {benefits.map((benifit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benifit"
            placeholder="you wil be able to uild a full stack platform"
            value={benifit.title}
            className={`${styles.input} my-2`}
            onChange={(e) => handleBenifitChange(index, e.target.value)}
          />
        ))}

        <MdAddCircle
          className={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddbenifits}
        />
      </div>

      <div className="">
        <label htmlFor="email" className={`${styles.label} text-[20]`}>
          what are the Prerequists for the students in this course?
        </label>
        <br />
        {preRequisites.map((prerequisit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequists"
            placeholder="You Need basic knowledge of MERNSACK"
            value={prerequisit.title}
            className={`${styles.input} my-2`}
            onChange={(e) => handlePrerequistsChange(index, e.target.value)}
          />
        ))}

        <MdAddCircle
          className={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequists}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
         onClick={() => prevButton() }
        >
          previous
        </div>
        <div className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
         onClick={() => handleOptions() }
        >
          next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
