import { api } from '@/lib/axios';

export async function approveOrder(orderId: string) {
    await api.patch(`/orders/${orderId}/approve`)
}