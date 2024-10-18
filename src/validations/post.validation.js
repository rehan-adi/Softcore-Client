import { z } from 'zod';

export const createPostValidation = z.object({
    content: z
        .string()
        .min(1, { message: 'Content should have at least 1 character' })
        .transform((val) => val.trim()),
    tags: z
        .string()
        .optional()
        .transform((val) => val ? val.split(',').map(tag => tag.trim()) : [])
        .refine(tagsArray => tagsArray.length <= 10, { message: "Maximum 10 tags allowed." })
        .refine(tagsArray => tagsArray.every(tag => tag.length > 0), { message: "Tags cannot be empty." }),
    category: z
        .string()
        .min(1, { message: 'Category is required' })
        .transform((val) => val.trim()),
    image: z
        .instanceof(File)
        .refine((file) => file !== null, { message: 'Image is required' }),
});
