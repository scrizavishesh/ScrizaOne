import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  adminEmail: z.string().email("Invalid email address"),
  adminPhone: z.string().min(10, "Valid phone number required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type SignupInput = z.infer<typeof signupSchema>;

export function useLogin() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await apiClient.post('/login/all', data);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setAuth({
        token: data.token,
        userId: data.userId,
        companyId: data.companyId || null,
        role: data.role,
      }));
    }
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: async (data: SignupInput) => {
      const res = await apiClient.post('/login/signup', data);
      return res.data;
    }
  });
}
