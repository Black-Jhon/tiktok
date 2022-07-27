import React, {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../utils";
import {IUser, Video} from "../../types";
import {useRouter} from "next/router";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import Image from "next/image";
import {GoVerified} from "react-icons/go";
import Link from "next/link";

const Search = ({videos}: { videos: Video[] }) => {
    const [isAccount, setIsAccount] = useState(false);
    const router = useRouter();
    const {searchTerm}: any = router.query;
    // console.log(searchTerm);

    const {allUsers} = useAuthStore();

    const account = isAccount ? "border-b-2 border-black" : "text-gray-400";
    const isVideos = !isAccount ? "border-b-2 border-black" : "text-gray-400";
    const searchedAccount = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm));

    return (
        <div className="w-full">
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold cursor-pointer mt-2 capitalize ${account}`}
                   onClick={() => setIsAccount(true)}>account
                </p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 capitalize ${isVideos}`}
                   onClick={() => setIsAccount(false)}>videos
                </p>
            </div>
            {isAccount ? (
                <div className="md:mt-16">
                    {searchedAccount.length > 0 ? (
                        searchedAccount.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx}>
                                <div className="flex items-start gap-3">
                                    <div>
                                        <Image
                                            width={50}
                                            height={50}
                                            className="rounded-full cursor-pointer"
                                            src={user.image}
                                            alt="user-profile"
                                            layout="responsive"
                                        />
                                    </div>

                                    <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                                        {user.userName}{" "}
                                        <GoVerified className="text-blue-400"/>
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : <NoResults text={`No Video Results for ${searchTerm}`}/>}
                </div>
            ) : (
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
                    {videos.length ? (
                        videos.map((video: Video, idx) => (
                            <VideoCard post={video} key={idx}/>
                        ))
                    ) : <NoResults text={`No Video Results for ${searchTerm}`}/>}
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = async ({params: {searchTerm}}: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: {videos: res.data}
    };
};

export default Search;
