import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SelectValue,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import * as z from 'zod';

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderID');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');

  const { register, handleSubmit, reset, control } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        customerName: customerName ?? '',
        orderId: orderId ?? '',
        status: status ?? 'all',
      },
    });

  function handleFilters({
    customerName,
    orderId,
    status,
  }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId);
      } else {
        state.delete('orderId');
      }

      if (customerName) {
        state.set('customerName', customerName);
      } else {
        state.delete('customerName');
      }

      if (status) {
        state.set('status', status);
      } else {
        state.delete('stauts');
      }

      state.set('page', '1');

      return state;
    });
  }

  function handleClearFilters(){
    setSearchParams(state => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')

      return state
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all'
    })
  }

  return (
    <form
      className='flex items-center gap-2'
      onSubmit={handleSubmit(handleFilters)}
    >
      <span className='text-sm font-semibold'>Filtros:</span>
      <Input
        placeholder='Id do pedido'
        className='h-8 w-auto'
        {...register('orderId')}
      />
      <Input
        placeholder='Nome do cliente'
        className='h-8 w-[320px]'
        {...register('customerName')}
      />

      <Controller
        name='status'
        control={control}
        render={({ field: { name, value, onChange, disabled } }) => {
          return (
            <Select
              defaultValue='all'
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className='h-8 w-[180px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos status</SelectItem>
                <SelectItem value='pending'>Pendente</SelectItem>
                <SelectItem value='canceled'>Cancelado</SelectItem>
                <SelectItem value='processing'>Em preparo</SelectItem>
                <SelectItem value='deliverung'>Em entrega</SelectItem>
                <SelectItem value='delivered'>Entregue</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />

      <Button type='submit' variant='secondary'>
        <Search className='mr-2 h-4 w-4' />
        Filtrar resultados
      </Button>

      <Button type='button' variant='outline' onClick={handleClearFilters}>
        <X className='mr-2 h-4 w-4' />
        Remover filtros
      </Button>
    </form>
  );
}
