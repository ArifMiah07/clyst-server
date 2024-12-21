import { Post } from "../post.model"
import { TPost } from "./post.interface"



const createAPostIntoDb = async(postData : TPost)=>{
    const result = await Post.create(postData);
    return result;
}


export const postService = {
    createAPostIntoDb,
}