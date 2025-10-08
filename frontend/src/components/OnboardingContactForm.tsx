import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ContactInput } from '../types';
import { apiService } from '../services/api';
import { validatePhone } from '../utils/phoneUtils';

interface Category {
  id: string;
  nome: string;
}

const contactSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  telefone: z.string().min(1, 'Telefone é obrigatório').refine(validatePhone, {
    message: 'Formato de telefone inválido',
  }),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  categoriaId: z.string().min(1, 'Selecione uma categoria'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface OnboardingContactFormProps {
  onSuccess: () => void;
}

export function OnboardingContactForm({ onSuccess }: OnboardingContactFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await apiService.getCategories({ page: 1, pageSize: 100 }); // Fetch all categories
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      toast.error('Não foi possível carregar as categorias.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      const contactInput: ContactInput = {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email || undefined,
        categoriaId: data.categoriaId,
      };

      await apiService.createContact(contactInput);
      toast.success('Contato criado com sucesso');
      onSuccess();
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar contato';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">Nome *</label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="input-field"
          placeholder="Nome do Contato"
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-1">Telefone *</label>
        <input
          id="telefone"
          type="tel"
          {...register('telefone')}
          placeholder="+55 11 99999-9999"
          className="input-field"
        />
        {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>}
      </div>

      <div>
        <label htmlFor="categoriaId" className="block text-sm font-semibold text-gray-700 mb-1">Categoria *</label>
        <select
          id="categoriaId"
          {...register('categoriaId')}
          className="input-field"
          disabled={loadingCategories}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nome}
            </option>
          ))}
        </select>
        {errors.categoriaId && <p className="text-red-500 text-sm mt-1">{errors.categoriaId.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-2 px-4 disabled:opacity-50"
      >
        {isSubmitting ? 'Criando...' : 'Criar Contato'}
      </button>
    </form>
  );
}