import express from 'express';
import { postController } from './post.controller';

//router
const router = express.Router();

//routes
router.post('/feed', postController.createAPost);
router.get('/feed', postController.getAllPost);

//export routes
export const postRoutes = router;
