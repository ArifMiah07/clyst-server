import { Post } from '../post.model';
import { TPost } from './post.interface';

//make operation
const createAPostIntoDb = async (postData: TPost) => {
  const result = await Post.create(postData);
  return result;
};

// Get all posts from the database with an optional search term
export const getAllPostsFromDb = async (searchTerm?: string) => {
  try {
    let filter = {};
    if (searchTerm) {
      filter = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { date: { $regex: searchTerm, $options: 'i' } },
          { time: { $regex: searchTerm, $options: 'i' } },
          { userName: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
          { text: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }
    // Query the database and sort by creation date (descending)
    return await Post.find(filter).sort({ createdAt: -1 });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch posts');
  }
};
//export all services
export const postService = {
  createAPostIntoDb,
  getAllPostsFromDb,
};
