import React from "react";
import { styles } from "../styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        {" "}
        What is <span className="text_animate">ELearningBD</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px]">
        **About ELearningBD - Building the Web of Tomorrow**

At ELearningBD , we are passionate about creating exceptional web experiences that empower businesses and individuals to thrive in the digital world. Our journey began with a simple idea: to provide innovative, reliable, and customized web solutions that make a difference.

**Our Story**

Founded in 2017, ELearningBD has steadily grown into a dynamic and creative web development firm. With a team of highly skilled professionals, we've had the privilege of working with a diverse range of clients from startups to established enterprises. Our commitment to excellence and a client-first approach have been the cornerstones of our success.

**Our Mission**

Our mission is clear: to transform your ideas into digital reality. We strive to deliver web solutions that not only meet your immediate needs but also pave the way for your future success. By staying at the forefront of technology and design trends, we create websites that are not just visually stunning but also highly functional, secure, and scalable.

**Why Choose ELearningBD ?**

- **Expertise**: Our team of developers, designers, and strategists is equipped with the latest tools and knowledge to deliver cutting-edge web solutions.

- **Customization**: We understand that each client is unique. Our approach is always tailored to your specific requirements and goals.

- **Results-Driven**: Our focus is on delivering real results for your business, whether it's increased online visibility, user engagement, or conversion rates.

- **Reliability**: You can count on us to be your long-term digital partner, providing ongoing support and maintenance.

**Let's Collaborate**

We believe in collaboration, and we're ready to embark on your web development journey with you. Whether you need a new website, e-commerce platform, web app, or a complete digital transformation, we're here to turn your vision into reality.

Join us as we continue to shape the digital landscape and create a web that works for you. Let's connect and start building the web of tomorrow, together.

Contact us today at 01778821588 or Mail-To supportelearningbd@gmail.com to get started.

        </p>
        <br />
        <span className="font-Cursive text-[22px]">MD FOYSAL AHAMMED</span>
        <h5 className="text-[18px]">Founder and CEO Of ELearningBD</h5>
        <br />
        <br />
        <br />

      </div>
    </div>
  );
};

export default About;
