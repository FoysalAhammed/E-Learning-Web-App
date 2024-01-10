import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: `get-all-course`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deletCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: `get-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion:builder.mutation({
      query:({question,courseId,contentId}) =>({
        url:"add-question",
        body:{
          question,courseId,contentId
        },
        method:"PUT",
        credentials:"include" as const,
      })
    }),
    addAnswerinQuestion:builder.mutation({
      query:({answer,questionId,courseId,contentId}) =>({
        url:"add-answer",
        body:{
          answer,questionId,courseId,contentId
        },
        method:"PUT",
        credentials:"include" as const,
      })
    }),
    addReviewInCourse:builder.mutation({
      query:({review,courseId,rating}:any) =>({
        url:`add-review/${courseId}`,
        body:{
          review,courseId,rating
        },
        method:"PUT",
        credentials:"include" as const,
      })
    }),
    addReplyInReview:builder.mutation({
      query:({comment,courseId,reviewId}:any) =>({
        url:"add-review-reply",
        body:{
          comment,courseId,reviewId
        },
        method:"PUT",
        credentials:"include" as const,
      })
    }),

  })
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeletCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerinQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation
} = courseApi;
