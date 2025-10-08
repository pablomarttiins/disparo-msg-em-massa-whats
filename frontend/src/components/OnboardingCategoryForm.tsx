import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { CategoryInput } from '../types';
import { apiService } from '../services/api';

const categorySchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cor: z.string().min(1, 'Cor é obrigatória'),
  descricao: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface OnboardingCategoryFormProps {
  onSuccess: () => void;
}

const defaultColors = [
  '#1e3a5f', '#4a9eff', '#10B981', '#F59E0B', '#EF4444',
  '#8B5CF6', '#F97316', '#06B6D4', '#84CC16', '#EC4899',
];

export function OnboardingCategoryForm({ onSuccess }: OnboardingCategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nome: '',
      cor: '#1e3a5f',
      descricao: '',
    },
  });

  const selectedColor = watch('cor');

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const categoryInput: CategoryInput = {
        nome: data.nome,
        cor: data.cor,
        descricao: data.descricao || undefined,
      };
      await apiService.createCategory(categoryInput);
      toast.success('Categoria criada com sucesso');
      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar categoria';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">
          Nome da Categoria *
        </label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="input-field"
          placeholder="Ex: Clientes VIP"
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cor *
        </label>
        <div className="grid grid-cols-5 gap-2">
          {defaultColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue('cor', color)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-800' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-2 px-4 disabled:opacity-50"
      >
        {isSubmitting ? 'Criando...' : 'Criar Categoria'}
      </button>
    </form>
  );
}