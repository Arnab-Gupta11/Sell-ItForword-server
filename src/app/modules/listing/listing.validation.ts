import { z } from 'zod';

export const createListingValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price is required'),
    condition: z.enum(['new', 'used'], {
      errorMap: () => ({ message: 'Condition is required' }),
    }),
    image: z.string().min(1, 'At least one image is required'),
    category: z.string().min(1, 'Category is required'),
    status: z.enum(['available', 'sold']).default('available'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    phone: z.string().min(1, 'Phone number is required'),
  }),
});

export const ListingValidations = {
  createListingValidationSchema,
};
