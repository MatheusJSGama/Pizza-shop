import { api } from '@/lib/axios';

interface registerRestaurantBody {
  email: string;
  restaurantName: string;
  managerName: string;
  phone: string;
}
export async function registerRestaurant({
  restaurantName,
  email,
  managerName,
  phone,
}: registerRestaurantBody) {
  await api.post('/restaurants', {
    email,
    restaurantName,
    managerName,
    phone,
  });
}
