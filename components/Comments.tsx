import React from "react";
import NoResults from "./NoResults";
import useAuthStore from "../store/authStore";

const Comments = () => {
    const comments = [];
    const {userProfile} = useAuthStore();
    const isPostingComment = false;
    return (
        <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px] mt-3">
            <div className="overflow-scroll lg:h-[475px]">
                {comments.length ? (
                    <div>video</div>
                ) : (
                    <NoResults text="No comments yet!"/>
                    // <div></div>
                )}
            </div>
            {userProfile && (
                <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
                    <form className="flex gap-4" onSubmit={() => {
                    }}>
                        <input type="text" value="" onChange={() => {
                        }} placeholder="Add comment..."
                               className="bg-primary px-6 py-4 text-md font-medium border-2 w-full md:w-[700px] lg:w-[250px]
                               border-gray-100 focus:outline-none focus:border-2 focus:border-gray-200 flex-1 rounded-lg"/>
                        <button className="text-gray-400 text-md" onClick={() => {
                        }}>
                            {isPostingComment ? "Commenting..." : "Comment"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Comments;