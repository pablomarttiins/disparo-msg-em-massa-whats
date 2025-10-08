import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiService } from '../services/api';

interface Category {
  id: string;
  nome: string;
}

interface WhatsAppSession {
  name: string;
  displayName?: string;
}

const campaignSchema = z.object({
  nome: z.string().min(1, 'Nome da campanha é obrigatório'),
  messageContent: z.string().min(1, 'A mensagem é obrigatória'),
  targetTag: z.string().min(1, 'Selecione uma categoria'),
  sessionName: z.string().min(1, 'Selecione uma conexão com o WhatsApp'),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface OnboardingCampaignFormProps {
  onSuccess: () => void;
}

export function OnboardingCampaignForm({ onSuccess }: OnboardingCampaignFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sessions, setSessions] = useState<WhatsAppSession[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, sessionData] = await Promise.all([
          apiService.getCategories({ page: 1, pageSize: 100 }),
          apiService.getWhatsAppSessions(),
        ]);
        setCategories(catData.categories || []);
        setSessions(sessionData || []);
      } catch (error) {
        console.error('Erro ao carregar dados para o formulário:', error);
        toast.error('Não foi possível carregar categorias e sessões.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const campaignData = {
        nome: data.nome,
        targetTags: [data.targetTag],
        sessionNames: [data.sessionName],
        messageType: 'text',
        messageContent: { text: data.messageContent },
        startImmediately: true,
      };

      await apiService.createCampaign(campaignData);
      toast.success('Campanha criada com sucesso!');
      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar campanha';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">Nome da Campanha *</label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="input-field"
          placeholder="Ex: Campanha de Boas-Vindas"
          disabled={loading}
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="targetTag" className="block text-sm font-semibold text-gray-700 mb-1">Categoria de Contatos *</label>
        <select id="targetTag" {...register('targetTag')} className="input-field" disabled={loading || categories.length === 0}>
          <option value="">{loading ? 'Carregando...' : 'Selecione a categoria'}</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        {errors.targetTag && <p className="text-red-500 text-sm mt-1">{errors.targetTag.message}</p>}
      </div>

      <div>
        <label htmlFor="sessionName" className="block text-sm font-semibold text-gray-700 mb-1">Conexão WhatsApp *</label>
        <select id="sessionName" {...register('sessionName')} className="input-field" disabled={loading || sessions.length === 0}>
          <option value="">{loading ? 'Carregando...' : 'Selecione a conexão'}</option>
          {sessions.map((s) => <option key={s.name} value={s.name}>{s.displayName || s.name}</option>)}
        </select>
        {errors.sessionName && <p className="text-red-500 text-sm mt-1">{errors.sessionName.message}</p>}
      </div>

      <div>
        <label htmlFor="messageContent" className="block text-sm font-semibold text-gray-700 mb-1">Mensagem *</label>
        <textarea
          id="messageContent"
          {...register('messageContent')}
          rows={4}
          className="input-field"
          placeholder="Digite sua mensagem. Você pode usar {{nome}} para personalizar."
          disabled={loading}
        />
        {errors.messageContent && <p className="text-red-500 text-sm mt-1">{errors.messageContent.message}</p>}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        <p><strong>Opcional:</strong> Você pode integrar com IA para gerar mensagens automáticas e personalizadas. Isso pode ser configurado depois, na edição da campanha.</p>
      </div>

      <button type="submit" disabled={isSubmitting || loading} className="w-full btn-primary py-2 px-4 disabled:opacity-50">
        {isSubmitting ? 'Criando...' : 'Criar Campanha'}
      </button>
    </form>
  );
}