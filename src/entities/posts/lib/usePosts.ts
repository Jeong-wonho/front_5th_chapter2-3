import { useEffect } from "react";
import { usePostsQuery } from "../api/queries";
import { usePostStore } from "../models";

export const usePosts = (limit:number, skip:number) => {
    const {setPosts, setTotal} = usePostStore();
    const postsData = usePostsQuery(limit, skip);

    useEffect(() => {
        if (postsData.data) {
            setPosts(postsData.data.posts);
            setTotal(postsData.data.total);
        }
    }, [postsData.data, setPosts, setTotal]);

    return postsData;
}