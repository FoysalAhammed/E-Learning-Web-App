import React, { FC, useState, useEffect } from "react";
import { styles } from "@/app/styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/man1.jpg";
import Image from "next/image";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess:successProfileEdit, error:erorredit }] = useEditProfileMutation();

  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState == 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (isSuccess || successProfileEdit) {
      setLoadUser(true);
    }
    if (error || erorredit) {
      console.log(error);
    }
    if (successProfileEdit) {
       toast.success("Profile Upadated Successfully")
    }
  }, [isSuccess, error,successProfileEdit,erorredit]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
    await  editProfile({
        name:name,
      })
    }
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form action="" onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label
                htmlFor=""
                className="block pb-2 text-black dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label
                htmlFor=""
                className="block pb-2 text-black dark:text-white mt-2"
              >
                Email Address
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                readOnly
                value={user?.email}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <input
              type="submit"
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
