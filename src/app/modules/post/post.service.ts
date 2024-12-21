import { Post } from '../post.model';
import { TPost } from './post.interface';


//make operation
const createAPostIntoDb = async (postData: TPost) => {
  const result = await Post.create(postData);
  return result;
};

//get a post from db

const getAllPostFromDb = async()=>{
    const result = await Post.find().sort({ createdAt: -1 });
    return result;
}



//export all services
export const postService = {
  createAPostIntoDb,
  getAllPostFromDb,
};
