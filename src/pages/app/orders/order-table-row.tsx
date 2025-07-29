import { Button } from '@/components/ui/button';
import { ArrowRight, Search, X } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { OrderDetails } from './order-details';
import { OrderStatus } from '@/components/order.status';
import { formatDistanceToNow} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cache, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { cancelOrder } from '@/api/cancel-order';
import { queryClient } from '@/lib/react-query';
import type { GetOrdersResponse } from '@/api/get-orders';

export interface OrderTableRowProps {
  orderId: string;
  createdAt: string;
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
  customerName: string;
  total: number;
}

export function OrdertableRow({
  createdAt,
  customerName,
  orderId,
  status,
  total
}: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: cancelOrderFn} = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, orderId){
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'] //Busca todas as queries que começam com a chave 'orders' já que tenho mais de uma lista
      })

      ordersListCache.forEach(([cacheKey, cacheData])=> { //Percorre todas as listar trazendo a key e os dados do cache de cada uma
        if(!cacheData){
          return
        }

        // altera o valor do cache passando o key da lista e percorre toda a lista procurando o Id do pedido que
        // seja igual ao Id passado para o cancelamento e altera o status dele pra canceled
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, { 
          ...cacheData,
          orders: cacheData.orders.map(order => {
            if(order.orderId === orderId){
              return {
                ...order,
                status: 'canceled'
              }
            }

            return order
          })
        })
      })
    }
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' className='p-2.5'>
              <Search className='h-3 w-3' />
              <span className='sr-only'>Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={orderId} open={isDetailsOpen}/>
        </Dialog>
      </TableCell>
      <TableCell className='font-mono text-xs font-medium'>
        {orderId}
      </TableCell>
      <TableCell className='text-muted-foreground'>
        {formatDistanceToNow(createdAt, {
          locale: ptBR,
          addSuffix: true
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={status}/>
      </TableCell>
      <TableCell className='font-medium'>{customerName}</TableCell>
      <TableCell className='font-medium'>{(total / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}</TableCell>
      <TableCell>
        <Button variant='outline' className='p-2.5'>
          <ArrowRight className='mr-2 h-3 w-3' />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button 
        onClick={()=> cancelOrderFn(orderId)}
        disabled={!['pending', 'processing'].includes(status)} variant='ghost' className='p-2.5'>
          <X className='mr-2 h-3 w-3' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
