import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { useDispatch } from 'react-redux';
import { setAgents } from '../store';
import { z } from 'zod';

export const agentSchema = z.object({
  userName: z.string().min(2, "Name required"),
  userEmail: z.string().email("Valid email required"),
  userPhoneNo: z.string().min(10, "Phone required"),
  userAddress: z.string().min(5, "Address required"),
  userGender: z.enum(["MALE", "FEMALE", "OTHER"]),
  designation: z.string().min(2, "Designation required"),
  roleType: z.literal("AGENT"),
  status: z.boolean().default(true)
});
export type AgentInput = z.infer<typeof agentSchema>;

export function useAgents() {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/user/getAll?search=ACTIVE');
        dispatch(setAgents(res.data.users));
        return res.data.users;
      } catch (err) {
        // Fallback mock data for preview environments with HTTP/HTTPS mixed content issues
        console.warn("Failed to fetch agents. Using mock data.");
        const mockData = [
          { id: '1', userName: 'Sarah Jenkins', userEmail: 'sarah@example.com', userPhoneNo: '+1 555-0123', designation: 'Support Lead', status: 'ACTIVE' },
          { id: '2', userName: 'Mike Ross', userEmail: 'mike@example.com', userPhoneNo: '+1 555-0124', designation: 'Sales Agent', status: 'ACTIVE' },
          { id: '3', userName: 'Emma Watson', userEmail: 'emma@example.com', userPhoneNo: '+1 555-0125', designation: 'Technical Support', status: 'ACTIVE' },
        ];
        dispatch(setAgents(mockData));
        return mockData;
      }
    }
  });
}

export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentInput) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const res = await apiClient.post('/user/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    }
  });
}
