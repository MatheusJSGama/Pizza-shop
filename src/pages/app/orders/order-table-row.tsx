import { Button } from '@/components/ui/button';
import { ArrowRight, Search, X } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { OrderDetails } from './order-details';
import { OrderStatus } from '@/components/order.status';
import { formatDistanceToNow} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react';

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
        <Button variant='ghost' className='p-2.5'>
          <X className='mr-2 h-3 w-3' />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
