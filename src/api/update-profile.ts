import { api } from '@/lib/axios';

interface UpdateProfileBody {
  description: string | null;
  name: string;
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  await api.put('/profile', {
    name,
    description,
  });
}
