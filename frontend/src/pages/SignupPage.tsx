import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Chama o endpoint de signup para criar tenant com plano gratuito
      const response = await fetch('/api/tenants/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          adminUser: {
            nome: data.name,
            email: data.email,
            senha: data.password
          }
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Conta criada com sucesso!');
        navigate('/login');
      } else {
        toast.error(result.message || 'Erro ao criar conta. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro na conexão. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">WC</div>
          <h1 className="text-3xl font-bold text-gray-900">Crie sua conta</h1>
          <p className="text-gray-600 mt-2">Comece a automatizar suas vendas no WhatsApp</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Seu nome completo"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="seu@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Criando conta...' : 'Criar conta grátis'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 font-medium hover:text-blue-700">
              Faça login
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Ao criar uma conta, você concorda com nossos{' '}
            <a href="#" className="text-blue-500 hover:text-blue-700">Termos de Serviço</a>{' '}
            e <a href="#" className="text-blue-500 hover:text-blue-700">Política de Privacidade</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;