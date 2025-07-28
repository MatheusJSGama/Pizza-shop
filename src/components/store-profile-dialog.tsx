import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  getMenegedRestaurant,
  type GetMenegedRestaurantResponse,
} from '@/api/get-managed-restaurant';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from '@/api/update-profile';
import { toast } from 'sonner';
import { queryClient } from '@/lib/react-query';

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable()
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {

  const { data: managedRestaurant } = useQuery({
    queryFn: getMenegedRestaurant,
    queryKey: ['menaged-restaurant'],
    staleTime: Infinity,
  });

  function updateManagedRestaurantCache({name, description}: StoreProfileSchema){ 
    const cached = queryClient.getQueryData<GetMenegedRestaurantResponse>([
        'menaged-restaurant',
      ]);
      if (cached) {
        queryClient.setQueryData<GetMenegedRestaurantResponse>( // Atualiza os valores novos vindos do input direto no cache
          ['menaged-restaurant'],
          {
            ...cached,
            name,
            description,
          },
        );
      }

      return { cached }
  }

  const { mutateAsync: updateRestaurantProfile } = useMutation({
    mutationFn: updateProfile,
    onMutate({name, description}){ // O onMutate atualiza os dados enviados do input na hora, não espera dar sucesso como no onSuccess 
     const { cached } = updateManagedRestaurantCache({name, description}) 

      return { previousProfile: cached }
    },
    onError(_error, _variables, context) { // pega o cached que é o valor antes da alteração e caso de erro volta para o valor que era antes
      if(context?.previousProfile){
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
    // onSuccess(_, { name, description }) {
    //   const cached = queryClient.getQueryData<GetMenegedRestaurantResponse>([ //Pega a informção atual que já existe dentro do cache
    //     'menaged-restaurant', 
    //   ]);

    //   if (cached) {
    //     queryClient.setQueryData<GetMenegedRestaurantResponse>( // Atualizaça as informações da query no cache sem precisdar de uma nova requisição
    //       ['menaged-restaurant'],
    //       {
    //         ...cached,
    //         name,
    //         description,
    //       },
    //     );
    //   }
    // },    
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateRestaurantProfile({
        name: data.name,
        description: data.description,
      });

      toast.success('Perfil atualizado com sucesso!');
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!');
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
