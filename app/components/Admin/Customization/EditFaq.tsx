import { styles } from "@/app/styles/style";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Leader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, refetch,isLoading  } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
 console.log(data);
 
  const [question, setQuestion] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestion(data.layout.faq);
    }
    if (isSuccess) {
      refetch()
      toast.success("faq updated successfully")
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data,isSuccess,error]);

  const toggleQuestion = (id: any) => {
    setQuestion((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  const handleQuestionChange = (id: any, value: any) => {
    setQuestion((prevQuestions) =>
    prevQuestions.map((q) => (q._id === id ? { ...q,  question:value } : q))
  );
  }

  const handleAnswerChange = (id: any, value: any) => {
    setQuestion((prevQuestions) =>
    prevQuestions.map((q) => (q._id === id ? { ...q, answer:value } : q))
  );
  };

    const newFaqHnadler = () =>{
      setQuestion([
        ...question,
       { question:"",
        answer:""
      }
      ])
    }

//  function to check if the FAQ is  arays are unhcanged

 const areQuestionUnchanged = (
  originalQuestions :any[],
  newQuestion:any[]
 ) =>{
  
  return JSON.stringify(originalQuestions) === JSON.stringify(newQuestion)

}

 const isAnyQuestionEmpty = (question:any[]) =>{
  return question.some((q) => q.question === "" || q.answer ==="")
 }
 const handleEdit = async () =>{
    if (!areQuestionUnchanged(data.layout.faq,question ) && !isAnyQuestionEmpty(question)) {
       await editLayout({
        type:"FAQ",
        faq:  question,
       })
    }
  
 }


  return (
  
    <>
      {
        isLoading ? (
          <Loader/>
        ):(
          <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {question.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== question[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      onClick={() => toggleQuestion(q._id)}
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    >
                      <input
                        placeholder={"Add Your Question ??"}
                        className={`${styles.input} border-none`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus clasName="h-6 w-6" />
                        ) : (
                          <HiPlus clasName="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        type="text"
                        value={q.answer}
                        className={`${styles.input} border-none`}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder={"Add Your Answer"}
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() => {
                            setQuestion((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[18px] cursor-pointer"
              onClick={newFaqHnadler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
                   ${
                     areQuestionUnchanged(data.layout.faq, question) ||
                     isAnyQuestionEmpty(question)
                       ? "!cursor-not-allowed"
                       : "!cursor-pointer !bg-[#42d383]"
                   } !rounded absolute bottom-12 right-12
                `}
            onClick={
              areQuestionUnchanged(data.layout?.faq , question) ||
              isAnyQuestionEmpty(question)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div> 
        )

      }
    </>
    
  );
};

export default EditFaq;


