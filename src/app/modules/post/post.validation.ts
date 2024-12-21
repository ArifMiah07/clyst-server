
import { z } from "zod";

// Zod validation schema for Post
const postValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  userName: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email format"),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  text: z.string().nonempty("Text is required"),
  imgUrl: z.string().url("Invalid image URL"),
  profileImage: z.string().url("Invalid profile URL"),
  isDeleted: z.boolean().default(false),
});


export default postValidationSchema;
