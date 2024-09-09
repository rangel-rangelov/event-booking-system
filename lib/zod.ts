import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email({ message: 'Please provide a valid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, 'Email is required')
      .email({ message: 'Please provide a valid email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, 'Password is required'),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(1, 'Confirm password is required'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: "The passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });
