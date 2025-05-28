import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const singInForm = z.object({
  email: z
    .string()
    .min(1, { message: 'Campo de e-mail vazio.' })
    .email({ message: 'Digite um e-mail válido.' }),
});

type SignInForm = z.infer<typeof singInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(singInForm),
  });
  async function handleSingIn(data: SignInForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);

    toast.success('Enviamos um link de autenticação para o seu e-mail.', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSingIn(data),
      },
    });
  }

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email?.message);
    }
  }, [errors.email]);

  return (
    <>
      <div className="p-8">
        <Button asChild variant={'outline'} className="absolute top-8 right-8">
          <Link to={'/sign-up'}>Novo estabelecimento</Link>
        </Button>

        <div className="flex w-80 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acessar suas vendas pelo painel do parceiro
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSingIn)}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register('email')}
              />
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
