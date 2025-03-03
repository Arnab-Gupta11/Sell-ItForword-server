import { z } from 'zod';

export const createListingValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),
    price: z.number().min(0, 'Price must be a positive number'),
    condition: z.enum(['new', 'used']),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    category: z.string().min(3, 'Category must be at least 3 characters long'),
    status: z.enum(['available', 'sold']).default('available'),
    address: z
      .string()
      .min(3, 'Address is required and must be at least 3 characters long'),
    city: z
      .string()
      .min(2, 'City is required and must be at least 2 characters long'),
    phone: z.string().regex(/^01[3-9]\d{8}$/, {
      message:
        'Phone number must be 11 digits long and start with 01 (valid for Bangladesh)',
    }),
  }),
});

export const ListingValidations = {
  createListingValidationSchema,
};
