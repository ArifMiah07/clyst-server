import express from 'express';
import { postController } from './post.controller';

//router
const router = express.Router()

//routes
router.post('/feed', postController.createAPost)


//export routes
export const postRoutes = router;