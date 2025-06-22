import { api } from '@/lib/axios';

export interface GetMenegedRestaurantResponse {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}
export async function getMenegedRestaurant() {
  const response = await api.get<GetMenegedRestaurantResponse>(
    '/managed-restaurant',
  );
  return response.data;
}
