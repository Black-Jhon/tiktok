import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../utils";
import {IUser, Video} from "../../types";
import Image from "next/image";
import {GoVerified} from "react-icons/go";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[],
    };
}

const Profile = ({data}: IProps) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videoList, setVideoList] = useState<Video[]>([]);
    const {user, userVideos, userLikedVideos} = data;

    const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
    const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

    useEffect(() => {
        if (showUserVideos) {
            setVideoList(userVideos);
        } else {
            setVideoList(userLikedVideos);
        }
    }, [showUserVideos, userLikedVideos, userVideos]);

    return (
        <div className="w-full">
            <div className="flex gap-6 md:gap-10 bg-white mb-4 w-full">
                <div className="w-16 h-16">
                    <Image src={user.image} width={120} height={120} layout={"responsive"}
                           alt="profile picture" className="rounded-full"/>
                </div>

                <div className="hidden xl:block">
                    <p className="flex gap-1 items-center justify-center text-2xl tracking-wider font-bold text-primary lowercase">
                        {user.userName.replaceAll(" ", "")}
                        <GoVerified className="text-blue-400 text-md"/>
                    </p>
                    <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
                </div>
            </div>

            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p className={`text-xl font-semibold cursor-pointer mt-2 capitalize ${videos}`}
                   onClick={() => setShowUserVideos(true)}>videos
                </p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 capitalize ${liked}`}
                   onClick={() => setShowUserVideos(false)}>liked
                </p>
            </div>

            <div className="flex gap-6 flex-wrap md:justify-start">
                {videoList.length > 0 ? (
                    videoList.map((post: Video, idx: number) => (
                        <VideoCard post={post} key={idx}/>
                    ))
                ) : (
                    <NoResults text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}/>
                )}
            </div>
        </div>
    );
};

export const getServerSideProps = async ({params: {id}}: { params: { id: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: {data: res.data}
    };
};

export default Profile;
