import { settingsService } from './settingsService';

interface EvolutionCreateInstanceRequest {
  instanceName: string;
  qrcode: boolean;
  integration: string;
}

interface EvolutionCreateInstanceResponse {
  instance: {
    instanceName: string;
    status: string;
  };
  hash: {
    apikey: string;
  };
  qrcode?: {
    pairingCode?: string;
    code?: string;
    base64?: string;
  };
}

interface EvolutionInstanceInfo {
  instanceName: string;
  status: string;
  profilePictureUrl?: string;
  profileName?: string;
  profileStatus?: string;
  owner?: string;
}

export class EvolutionApiService {
  private static instance: EvolutionApiService;

  public static getInstance(): EvolutionApiService {
    if (!EvolutionApiService.instance) {
      EvolutionApiService.instance = new EvolutionApiService();
    }
    return EvolutionApiService.instance;
  }

  private async getConfig() {
    return await settingsService.getEvolutionConfig();
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const config = await this.getConfig();

    if (!config.host || !config.apiKey) {
      throw new Error('Configurações Evolution API não encontradas. Configure nas configurações do sistema.');
    }

    const url = `${config.host}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'apikey': config.apiKey,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Evolution API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response;
  }

  async createInstance(instanceName: string): Promise<EvolutionCreateInstanceResponse> {
    const requestData: EvolutionCreateInstanceRequest = {
      instanceName,
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS'
    };

    const response = await this.makeRequest('/instance/create', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });

    return response.json() as Promise<EvolutionCreateInstanceResponse>;
  }

  async getInstanceInfo(instanceName: string): Promise<EvolutionInstanceInfo> {
    const response = await this.makeRequest(`/instance/fetchInstances?instanceName=${instanceName}`);
    const data = await response.json() as EvolutionInstanceInfo[];

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    throw new Error(`Instância ${instanceName} não encontrada`);
  }

  async getQRCode(instanceName: string): Promise<string> {
    const response = await this.makeRequest(`/instance/connect/${instanceName}`);
    const data = await response.json() as { base64?: string };

    if (data.base64) {
      // Verificar se o base64 já tem o prefixo data:image
      if (data.base64.startsWith('data:image/')) {
        return data.base64;
      }
      return `data:image/png;base64,${data.base64}`;
    }

    throw new Error('QR Code não disponível');
  }

  async deleteInstance(instanceName: string): Promise<void> {
    await this.makeRequest(`/instance/delete/${instanceName}`, {
      method: 'DELETE'
    });
  }

  async restartInstance(instanceName: string): Promise<void> {
    await this.makeRequest(`/instance/restart/${instanceName}`, {
      method: 'PUT'
    });
  }

  async getInstanceStatus(instanceName: string): Promise<string> {
    try {
      const info = await this.getInstanceInfo(instanceName);
      console.log(`🔍 Evolution getInstanceInfo para ${instanceName}:`, info);

      // Mapear status Evolution para status do sistema
      const statusMap: { [key: string]: string } = {
        'open': 'WORKING',
        'connecting': 'SCAN_QR_CODE',
        'close': 'STOPPED',
        'qr': 'SCAN_QR_CODE'
      };

      // Evolution API usa connectionStatus, não status
      const evolutionStatus = (info as any).connectionStatus || info.status;
      return statusMap[evolutionStatus] || 'STOPPED';
    } catch (error) {
      console.warn(`⚠️ Erro ao obter status Evolution para ${instanceName}:`, error);
      return 'STOPPED';
    }
  }

  async listInstances(): Promise<EvolutionInstanceInfo[]> {
    const response = await this.makeRequest('/instance/fetchInstances');
    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  }
}

export const evolutionApiService = EvolutionApiService.getInstance();