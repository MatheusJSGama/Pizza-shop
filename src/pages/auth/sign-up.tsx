import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerRestaurant } from '@/api/register-restaurant';

const signUpForm = z.object({
  restaurantName: z
    .string()
    .min(1, { message: 'Campo com o nome do restaurante vazio' }),
  managerName: z.string().min(1, { message: 'Campo com o nome do dono vazio' }),
  phone: z.string().min(11, { message: 'Número de telefone inválido.' }),
  email: z
    .string()
    .min(1, { message: 'Campo de e-mail vazio.' })
    .email({ message: 'Digite um e-mail válido.' }),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    await registerRestaurantFn({
      email: data.email,
      restaurantName: data.restaurantName,
      managerName: data.managerName,
      phone: data.phone,
    });

    toast.success('Restaurante cadastrado com sucesso.', {
      action: {
        label: 'Login',
        onClick: () => navigate(`/sign-in?email=${data.email}`),
      },
    });
  }

  useEffect(() => {
    const firstErrorKey = Object.keys(errors)[0] as keyof SignUpForm;

    if (firstErrorKey) {
      switch (firstErrorKey) {
        case 'restaurantName':
          toast.error(errors.restaurantName?.message);
          break;
        case 'managerName':
          toast.error(errors.managerName?.message);
          break;
        case 'phone':
          toast.error(errors.phone?.message);
          break;
        case 'email':
          toast.error(errors.email?.message);
          break;
        default:
          break;
      }
    }
  }, [errors]);

  return (
    <>
      <div className="p-8">
        <div className="flex w-80 flex-col justify-center gap-6">
          <Button
            asChild
            variant={'outline'}
            className="absolute top-8 right-8"
          >
            <Link to={'/sign-in'}>Fazer login</Link>
          </Button>

          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register('email')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                placeholder="Digite o nome do estabelecimento"
                {...register('restaurantName')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                placeholder="Digite seu nome"
                {...register('managerName')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phoneNumber">Seu celular</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Digite seu número de celular"
                {...register('phone')}
              />
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar você concorda com os nossos
              <a href="" className="underline underline-offset-4">
                {' '}
                termos de serviço
              </a>{' '}
              e
              <a href="" className="underline underline-offset-4">
                {' '}
                politicas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
