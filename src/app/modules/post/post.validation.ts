import { z } from 'zod';

// Zod validation schema for Post
const postValidationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required and cannot be empty')
    .max(100, 'Name is too long, must be 100 characters or less'),

  userName: z
    .string()
    .min(1, 'Username is required and cannot be empty')
    .max(50, 'Username is too long, must be 50 characters or less'),

  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email is too long, must be 100 characters or less'),

  date: z
    .string()
    .min(1, 'Date is required and cannot be empty')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  time: z
    .string()
    .min(1, 'Time is required and cannot be empty')
    .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),

  text: z
    .string()
    .min(1, 'Text is required and cannot be empty')
    .max(500, 'Text is too long, must be 500 characters or less'),

  imgUrl: z
    .string()
    .url('Invalid image URL format')
    .max(500, 'Image URL is too long'),

  profileImage: z
    .string()
    .url('Invalid profile image URL format')
    .max(500, 'Profile image URL is too long'),

  isDeleted: z.boolean().default(false),
});

export default postValidationSchema;
