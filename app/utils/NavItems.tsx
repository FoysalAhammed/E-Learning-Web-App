import Link from "next/link";
import React from "react";

type Props = {
  activeItem: number;
  isMobile: boolean;
};

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref shallow>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a]  text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref shallow>
              <span className={`text-[25px] text-black dark:text-white`}>ElearnignBd</span>
            </Link>
          </div>
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href="/" passHref shallow>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "dark:text-white text-black"
                    } block py-5  text-[18px] px-6`}
                  >{i.name}</span>
                </Link>
              ))}
          </div>
      )}
    </>
  );
};

export default NavItems;