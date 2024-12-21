import { Request, Response } from 'express';
import { postService } from './post.service';
import postValidationSchema from './post.validation';



//controllers


//create a post controller
const createAPost = async (req: Request, res: Response) => {
  try {
    const { post: postData } = req.body;
    const zodParsedData = postValidationSchema.parse(postData);
    const result = await postService.createAPostIntoDb(zodParsedData);

    console.log('haha', result);
    res.status(200).json({
      success: true,
      message: 'Post created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'An error occurred while creating the Post',
      success: false,
      error: {
        name: err.name || 'UnknownError',
        details: err.message || 'An unexpected error occurred',
      },
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
};

//get post with controller

const getAllPost = async (req: Request, res: Response)=>{
    try {
        const result = await postService.getAllPostFromDb();
        console.log('result from controller boy', result);

        if (result.length === 0) {
            res.status(404).json({
              //i got error here by adding return keyword
              success: false,
              message: 'No products found matching your search criteria.',
              error: 'No matching products',
              data: result,
            });
          }
      
          res.status(200).json({
            success: true,
            message: 'Post retrieved successfully',
            data: result,
          });
        } catch (err: any) {
          res.status(500).json({
            message: 'An error occurred while reading the post',
            success: false,
            error: {
              name: err.name || 'UnknownError',
              details: err.message || 'An unexpected error occurred',
            },
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
          });
        }  
}

//export post controller
export const postController = {
  createAPost,
  getAllPost,
};
