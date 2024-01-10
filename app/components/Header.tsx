import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import NavItems from "../utils/NavItems";
import CustomModel from "../utils/CustomModel";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSession } from "next-auth/react";
import Image from "next/image";
import avatar from "../../public/assets/man1.jpg";
import { useSelector } from "react-redux";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import avatarIcon from "../../public/assets/man1.jpg";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
const {data:userData,isLoading,refetch} = useLoadUserQuery(undefined,{refetchOnMountOrArgChange:true})
  const { data } = useSession();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
       if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
         refetch();
       }
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Succesfull ");
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, userData,isLoading,isSuccess]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-lg transition duration-500 "
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow "
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] text_animate font-[800] text-black dark:text-white`}
              >
                ElearningBd
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {/*  only for mobile version */}
              <div className="800px:hidden ">
                <HiOutlineMenuAlt3
                  className="cursor-pointer dark:text-white text-black "
                  size={23}
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <Link href={"/profile"} shallow >
                  <Image
                     src={userData.user.avatar || avatar ? userData.user.avatar?.url || avatar : avatarIcon}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{border:activeItem === 5 ? "2px solid #37a39a" : ""}}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  className="hidden 800px:block cursor-pointer dark:text-white text-black "
                  size={23}
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile sidebar functionality */}

        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 z-[9999] dark:bg-[unset] bg-[#00000024]"
            id="screen"
            onClick={handleClose}
          >
            <div className="fixed w-[70%] z-[999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <Link href={"/profile"} >
                  <Image
                     src={userData.user.avatar || avatar ? userData.user.avatar?.url || avatar : avatarIcon}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer ml-6"
                    style={{border:activeItem === 5 ? "2px solid #37a39a" : ""}}
                  /> 
                </Link>
              ) : (
                <HiOutlineUserCircle
                  className="hidden 800px:block cursor-pointer dark:text-white text-black "
                  size={23}
                  onClick={() => setOpen(true)}
                />
              )}
              <br /> <br />
              <p>Copyright 2023 ElearnignBd</p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
