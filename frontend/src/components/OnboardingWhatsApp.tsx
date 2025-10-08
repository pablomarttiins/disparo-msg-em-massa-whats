import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSettings } from '../hooks/useSettings';

interface WhatsAppSession {
  name: string;
  displayName?: string;
  status: 'WORKING' | 'SCAN_QR_CODE' | 'STOPPED' | 'FAILED';
  provider: 'WAHA' | 'EVOLUTION';
  qr?: string;
  qrExpiresAt?: Date;
  me?: { id: string; pushName: string; };
}

interface OnboardingWhatsAppProps {
  onSuccess: () => void;
}

export function OnboardingWhatsApp({ onSuccess }: OnboardingWhatsAppProps) {
  const { settings } = useSettings();
  const [sessionName, setSessionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const [sessionCreated, setSessionCreated] = useState<WhatsAppSession | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  
  const [isConnected, setIsConnected] = useState(false);

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = { 'Content-Type': 'application/json', ...options.headers };
    if (token) { (headers as Record<string, string>).Authorization = `Bearer ${token}`; }
    const tenantId = localStorage.getItem('selected_tenant_id');
    if (tenantId) { (headers as Record<string, string>)['X-Tenant-Id'] = tenantId; }
    return fetch(url, { ...options, headers });
  };

  const handleCreateSession = async () => {
    if (!sessionName.trim()) {
      toast.error('Digite um nome para a sessão');
      return;
    }
    if (!settings?.evolutionHost || !settings?.evolutionApiKey) {
      toast.error('As credenciais da Evolution API não estão configuradas pelo administrador.');
      return;
    }

    setIsCreating(true);
    try {
      const response = await authenticatedFetch('/api/waha/sessions', {
        method: 'POST',
        body: JSON.stringify({ name: sessionName.trim(), provider: 'EVOLUTION' }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao criar sessão');
      }
      
      // The backend returns the response from the Evolution API
      const evolutionResponse = await response.json();

      // We need to build the session object ourselves to proceed
      const sessionForNextStep: WhatsAppSession = {
        name: evolutionResponse.instance.instanceName, // Use the real name from the API response
        displayName: sessionName.trim(),
        status: 'STOPPED', // Initial status
        provider: 'EVOLUTION',
      };

      setSessionCreated(sessionForNextStep);
      toast.success('Sessão criada! Agora clique em Conectar para ler o QR Code.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Um erro ocorreu');
    } finally {
      setIsCreating(false);
    }
  };

  const handleConnect = async () => {
    if (!sessionCreated) return;

    setIsConnecting(true);
    try {
      await authenticatedFetch(`/api/waha/sessions/${sessionCreated.name}/start`, { method: 'POST' });
      await new Promise(resolve => setTimeout(resolve, 2000));

      const qrResponse = await authenticatedFetch(`/api/waha/sessions/${sessionCreated.name}/auth/qr`);
      const qrData = await qrResponse.json();
      if (qrData.qr) {
        setQrCode(qrData.qr);
        pollForConnection(sessionCreated.name);
      } else {
        toast.error('Não foi possível obter o QR Code. Tente novamente.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao buscar QR Code');
    } finally {
      setIsConnecting(false);
    }
  };

  const pollForConnection = (name: string) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await authenticatedFetch('/api/waha/sessions');
        if (!response.ok) return;
        const sessions = await response.json();
        const current = sessions.find((s: any) => s.name === name);
        if (current && current.status === 'WORKING') {
          setIsConnected(true);
          setQrCode(null);
          toast.success(`Conectado como ${current.me.pushName}!`);
          clearInterval(intervalId);
          onSuccess();
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 5000);
  };

  return (
    <div className="space-y-4">
      {!sessionCreated ? (
        <>
          <p className="text-gray-600">Primeiro, crie uma sessão para a conexão. Use um nome fácil de lembrar.</p>
          <div>
            <label htmlFor="session-name" className="block text-sm font-semibold text-gray-700 mb-1">Nome da Sessão *</label>
            <input
              id="session-name"
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="Ex: WhatsApp Principal"
              className="input-field"
              disabled={isCreating}
            />
          </div>
          <button onClick={handleCreateSession} disabled={isCreating || !sessionName.trim()} className="w-full btn-primary py-2 px-4 disabled:opacity-50">
            {isCreating ? 'Criando...' : '1. Criar Sessão'}
          </button>
        </>
      ) : !isConnected ? (
        <div className="text-center">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                <h3 className="text-lg font-medium text-green-800">Sessão "{sessionCreated.name}" Criada!</h3>
                <p className="text-gray-600">Agora, clique no botão abaixo para gerar o QR Code e conectar seu aparelho.</p>
            </div>

            {!qrCode ? (
                <button onClick={handleConnect} disabled={isConnecting} className="w-full bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-md disabled:opacity-50">
                    {isConnecting ? 'Gerando QR Code...' : '2. Conectar e Ler QR Code'}
                </button>
            ) : (
                <div>
                    <h3 className="text-lg font-medium mb-2">Escaneie o QR Code</h3>
                    <p className="text-sm text-gray-600 mb-4">Abra o WhatsApp no seu celular e vá em Aparelhos Conectados.</p>
                    <img src={qrCode} alt="QR Code" className="w-64 h-64 mx-auto border-2 border-gray-200 rounded" />
                </div>
            )}
        </div>
      ) : (
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-medium text-green-800">Conectado!</h3>
          <p className="text-gray-600">Sua conexão foi estabelecida com sucesso.</p>
        </div>
      )}
    </div>
  );
}
