import {useState} from "react";
import {AiFillHome, AiOutlineMenu} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import Discover from "./Discover";
import SuggestedAccount from "./SuggestedAccount";
import Footer from "./Footer";

const Sidebar = () => {
    const [showSideBar, setShowSideBar] = useState(true);
    const normalLink = "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#631720] rounded";
    const userProfile = false;

    return (
        <div>
            <div className="block xl:hidden m-2 ml-4 mt-3 text-xl cursor-pointer"
                 onClick={() => setShowSideBar((prev) => !prev)}>
                {showSideBar ? <ImCancelCircle/> : <AiOutlineMenu/>}
            </div>
            {showSideBar && (
                <div
                    className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
                    <div className="xl:border-b-2 border-gray-200 xl:pb-4">
                        <Link href={"/"}>
                            <div className={normalLink}>
                                <p className="text-2xl">
                                    <AiFillHome/>
                                </p>
                                <span className="capitalize text-xl xl:block hidden">for you</span>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Discover/>
                        <SuggestedAccount/>
                        <Footer/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;

