import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import avatarIcon from "../../../public/assets/man1.jpg";
import toast from "react-hot-toast";
import {
  courseApi,
  useAddAnswerinQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIo from "socket.io-client"
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIo(ENDPOINT,{transports:["websocket"]});

type Props = {
  user: any;
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  setActiveVideo,
  activeVideo,
  id,
  refetch,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [review, setReview] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reply, setReply] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [rating, setRating] = useState(1);
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreateLoading },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerinQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreateLoading,
    },
  ] = useAddAnswerinQuestionMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addReviewInCourse,
    {
      isSuccess: reviewCreateSuccess,
      error: reviewError,
      isLoading: reviewCreateLoading,
    },
  ] = useAddReviewInCourseMutation();
  const [
    addReplyInReview,
    {
      isSuccess: reviewReplyCreateSuccess,
      error: reviewReplyError,
      isLoading: reviewReplyCreateLoading,
    },
  ] = useAddReplyInReviewMutation();
  const course = courseData?.course;
  console.log(course?.reviews);

  const isReviewExists = course?.reviews?.find(
    (item: any) => item?.user?._id === user?._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question Can't be Empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };
  const handleAnswerSubmit = () => {
    addAnswerinQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question Added Succesfully");
      socketId.emit("notification",{
        title:"New Question Received",
        Message:`You have a new Question form ${data[activeVideo]?.title}`,
        userId:user._id,
      })
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Reply Added Succesfully");
      if (user.role !== "admin") {
        socketId.emit("notification",{
          title:"New Reply Received",
          Message:`You have a new Question Reply  in ${data[activeVideo]?.title}`,
          userId:user._id,
        })
      }
    }
    if (reviewCreateSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review Added Succesfully");
      socketId.emit("notification",{
        title:"New Review Received",
        Message:`You have a new Review form ${data[activeVideo]?.title}`,
        userId:user._id,
      })
      
    }
    if (reviewReplyCreateSuccess) {
      setReply("");
      setIsReviewReply(false);
      courseRefetch();
      toast.success("Review Reply Added Succesfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewCreateSuccess,
    reviewError,
    reviewReplyCreateSuccess,
    reviewReplyError,
  ]);

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error(" Review cant't be empty ");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };
  const handleReviewReplySubmit = () => {
    if (!reviewReplyCreateLoading) {
      if (reply === "") {
        toast.error(" Review Reply cant't be empty ");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId: reviewId });
      }
    }
  };

  return (
    <div className="pl-5">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-[93%] flex items-center justify-between my-3  ">
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" /> Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <AiOutlineArrowRight className="mr-2" /> Next Lesson
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">
        {data[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-[93%] p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            className={`800px:text-[20px] cursor-pointer  ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black pb-[50px]">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div className="">
          {data[activeVideo]?.links.map((item: any, index: any) => (
            <div className="mb-5">
              <h2 className=" 800px:text-[20px] 800px:inline-block dark:text-white text-black ">
                {item.title && item.title + ":"}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-[93%]">
            <Image
              src={user.avatar ? user.avatar?.url : avatarIcon}
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="write your question....?"
              className="outline-none bg-transparent dark:text-[#ffffffa4]  text-black ml-3 border border-black dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[85%] 800px:text-[18px]"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreateLoading && "cursor-not-allowed"
              } `}
              onClick={questionCreateLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div className="">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreateLoading={answerCreateLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-[93%]">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar?.url : avatarIcon}
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-5 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-3 pb-3">
                      {[1, 2, 3.4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="write your question....?"
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[85%] 800px:text-[18px]"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 cursor-pointer 800px:mr-0 mr-2 ${
                      reviewCreateLoading && "cursor-not-allowed"
                    } `}
                    onClick={
                      reviewCreateLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />

            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>

            <div className="w-full">
              {(course?.reviews && [...course.reviews]?.reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full my-5 text-black dark:text-[#ffffff83]">
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={
                            item?.user?.avatar
                              ? item?.user?.avatar?.url
                              : avatarIcon
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="rounded-full w-[50px] h-[50px] object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px] text-black dark:text-[#ffffff83]">
                          {item?.user?.name}
                        </h1>

                        <Ratings rating={item.rating} />
                        <p className="text-black dark:text-[#ffffff83]">
                          {item.comment}
                        </p>
                        <small className=" text-black dark:text-[#ffffff83]">
                          {!item?.createdAt ? "" : format(item?.createdAt)}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && (
                      <span
                        className={` ${styles.label} !ml-[58px] cursor-pointer`}
                        onClick={() => {
                          setIsReviewReply(true), setReviewId(item._id);
                        }}
                      >
                        Add Reply{" "}
                      </span>
                    )}
                    {isReviewReply && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          name=""
                          id=""
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          placeholder="Enter your Reply ...."
                          className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b text-black dark:text-white border-[#00000027] dark:border-[#fff] p-[5px] w-[93%]`}
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1 dark:text-white text-black"
                          onClick={handleReviewReplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5">
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              i?.user?.avatar
                                ? i?.user?.avatar?.url
                                : avatarIcon
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="rounded-full w-[50px] h-[50px] object-cover"
                          />
                        </div>
                        <div className="pl-3">
                          <div className="flex items-center">
                            <h5 className="text-[20px] text-black dark:text-white ">
                              {i?.user.name}
                            </h5>{" "}
                            <VscVerifiedFilled
                              size={20}
                              className="text-[#498dc5] ml-2 text-[20px]"
                            />
                          </div>
                          <p className="text-black dark:text-white">
                            {i?.comment}
                          </p>
                          <small className=" text-black dark:text-[#ffffff83]">
                            {format(i?.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  user,
  handleAnswerSubmit,
  setQuestionId,
  answerCreateLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].question.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            index={index}
            item={item}
            activeVideo={activeVideo}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreateLoading={answerCreateLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
  answerCreateLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  const [reply, setReply] = useState("");
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={item?.user?.avatar ? item?.user?.avatar?.url : avatarIcon}
            width={50}
            height={50}
            alt=""
            className="rounded-full w-[50px] h-[50px] object-cover"
          />

          {/* <div className="w-[50px] h-[50px]">
          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
            <h1 className="uppercase text-[18px]">{item?.user?.name.slice(0,2)}</h1>
          </div>
        </div> */}
          <div className="pl-3">
            <h5 className="text-[20px] text-black dark:text-white ">
              {item.user.name}
            </h5>
            <p className="text-black dark:text-white">{item?.question}</p>
            <small className=" text-black dark:text-[#ffffff83]">
              {!item?.createdAt ? "" : format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2 "
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer dark:text-[#ffffff83] text-[#000000b8]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-[#000000b8] ">
            {item?.questionReplies?.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any) => (
              <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                <div className="">
                  <Image
                    src={
                      item?.user?.avatar ? item?.user?.avatar?.url : avatarIcon
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px] text-black dark:text-white ">
                      {item.user.name}
                    </h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled
                        size={20}
                        className="text-[#498dc5] ml-2 text-[20px]"
                      />
                    )}
                  </div>
                  <p className="text-black dark:text-white">{item?.answer}</p>
                  <small className=" text-black dark:text-[#ffffff83]">
                    {format(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter Your Answer"
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="block 800px:ml-12 mt-12 outline-none bg-transparent border-b text-black dark:text-white border-[#00000027] dark:border-[#fff] p-[5px] w-[93%]"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1 dark:text-white text-black"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreateLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
