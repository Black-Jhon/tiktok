import Link from "next/link";
import Image from "next/image";
import Logo from "../utils/tiktik-logo.png";
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {createOrGetUser} from "../utils";
import useAuthStore from "../store/authStore";
import {IoMdAdd} from "react-icons/io";
import React from "react";
import {IoIosLogOut} from "react-icons/io";

const Navbar = () => {
    const {userProfile, addUser, removeUser} = useAuthStore();
    
    return (
        <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
            <Link href="/">
                <div className="w-[100px] md:w-[130px]">
                    <Image src={Logo} layout="responsive" objectFit="cover" className="cursor-pointer" alt="tiktik"/>
                </div>
            </Link>

            <div className="search">search</div>

            <div>
                {userProfile ? (
                    <div className="flex gap-5 md:gap-10">
                        <Link href={"/upload"}>
                            <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                                <IoMdAdd text-xl/>
                                <span className="hidden md:block capitalize">upload</span>
                            </button>
                        </Link>
                        {userProfile.image && (
                            <Link href="/">
                                <>
                                    <Image src={userProfile.image} width={40} height={40} objectFit="cover"
                                           alt="profile image" className="rounded-full cursor-pointer"/>
                                </>
                            </Link>
                        )}
                        {/* logout btn */}
                        <button type="button" className="px-2">
                            <IoIosLogOut className="text-red-900 text-2xl"
                                         onClick={() => {
                                             googleLogout();
                                             removeUser();
                                         }}
                            />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={() => console.log("error")}
                    />
                )}
            </div>
        </div>
    );
};

// @ts-ignore
export default Navbar;
