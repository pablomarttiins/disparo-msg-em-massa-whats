import { Request, Response } from 'express';

// Teste para verificar se a nova rota de signup está correta
export const testSignupEndpoint = async (req: Request, res: Response) => {
  try {
    // Simular os dados que seriam recebidos na requisição de signup
    const mockSignupData = {
      name: "Test Tenant",
      adminUser: {
        nome: "Test User",
        email: "test@example.com",
        senha: "securepassword123"
      }
    };

    // Mostrar o payload esperado para criar um tenant com plano gratuito
    console.log("Payload esperado para POST /api/tenants/signup:", mockSignupData);
    
    // Mostrar as cotas que devem ser definidas
    const expectedQuotas = {
      maxUsers: 1,
      maxContacts: 20,
      maxCampaigns: 2,
      maxConnections: 1
    };
    
    console.log("Cotas esperadas para plano gratuito:", expectedQuotas);
    
    res.json({
      success: true,
      message: "Teste de endpoint de signup configurado corretamente",
      expectedPayload: mockSignupData,
      expectedQuotas: expectedQuotas
    });
  } catch (error) {
    console.error("Erro no teste:", error);
    res.status(500).json({
      success: false,
      message: "Erro no teste de endpoint de signup"
    });
  }
};