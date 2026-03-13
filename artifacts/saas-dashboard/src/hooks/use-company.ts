import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { useDispatch } from 'react-redux';
import { setCompany, setCompanyId } from '../store';
import { z } from 'zod';

export const companySchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyEmailId: z.string().email("Valid email required"),
  companyPhone: z.string().min(10, "Valid phone required"),
  companyAddress: z.string().min(5, "Address is required"),
  companyDescription: z.string().optional(),
  companyEstablishedDate: z.string().optional(),
});
export type CompanyInput = z.infer<typeof companySchema>;

export function useCreateCompany() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompanyInput) => {
      const res = await apiClient.post('/company/create', data);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setCompany(data));
      if (data.companyId) {
        dispatch(setCompanyId(data.companyId));
      }
      queryClient.invalidateQueries({ queryKey: ['company'] });
    }
  });
}
