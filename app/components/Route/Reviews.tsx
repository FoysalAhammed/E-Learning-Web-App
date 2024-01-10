import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
type Props = {};
export const reviews = [
  {
    name: "Gane Bates",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    profession: "Student  || Cambridge University ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Jon Doe",
    avatar: "https://randomuser.me/api/portraits/men/59.jpg",
    profession: "Graduated  || Barmingham University ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Suart Broat",
    avatar: "https://randomuser.me/api/portraits/men/69.jpg",
    profession: "Web Designer  ||Front DevBd",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Emuwe Lindles",
    avatar: "https://randomuser.me/api/portraits/men/79.jpg",
    profession: "UI/UX Designer || UMAO Dev LTD ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Saimon Dale",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    profession: "Student  || Cambridge University ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Marlin Hassie",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    profession: "Student  || Cambridge University ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Mickel Man",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    profession: "Student  || Cambridge University ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Gane Bates",
    avatar: "https://randomuser.me/api/portraits/men/80.jpg",
    profession: "UI/UX Designer  || EVSLEY ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Taylor Jeson",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    profession: "MERN DEVELOPER  || Daraz LTD ",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
  {
    name: "Rodrigues Bates",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    profession: "ReactJs Developer  || Sysco System LTD",
    comment:
      "Wow, I just completed this course, and I can't say enough good things about it! The content was incredibly informative, the instructor was engaging and knowledgeable, and the assignments were challenging yet rewarding. I feel like I've gained a solid foundation in [insert course topic], and I'm excited to apply what I've learned. Highly recommend this course to anyone looking to expand their knowledge in this area!",
  },
];
const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className=" 800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/reviewtwobg.png")}
            alt="business"
            width={500}
            height={500}
          />
        </div>
        <div className=" 800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Student Are{" "}
            <span className="text_animate  font-[800]">Our Strength</span>{" "}
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
            assumenda nemo, rem doloremque eaque libero similique fugiat alias
            ut fugit deserunt numquam, velit adipisci! Dignissimos rerum magnam
            facere eos animi.{" "}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 xl:grid-cols-2 xl:gap-[35px] lg:gap-[25px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt=[-40px] ">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
