import { Request, Response } from "express"
import { postService } from "./post.service";
import postValidationSchema from "./post.validation";


const createAPost = async(req: Request, res: Response)=>{
    try {
        const {post : postData} = req.body;
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
}



export const postController = {
    createAPost,
}