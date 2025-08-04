import { api } from '@/lib/axios';

export async function dispatchOrder(orderId: string) {
    await api.patch(`/orders/${orderId}/dispatch`)
}