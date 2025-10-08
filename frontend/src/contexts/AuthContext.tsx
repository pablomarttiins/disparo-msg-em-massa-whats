import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import OnboardingModal from '../components/OnboardingModal'; // Import the modal

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
  hasCompletedOnboarding: boolean; // Add field
  ultimoLogin?: string | null;
  criadoEm: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showOnboardingModal: boolean; // Add state
  setShowOnboardingModal: (show: boolean) => void; // Add setter
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = '/api';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false); // Add state

  const isAuthenticated = !!user && !!token;

  // Interceptar requisições para adicionar token
  const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Erro ao fazer login');
        return false;
      }

      const { token: newToken, user: userData } = data.data;

      setToken(newToken);
      setUser(userData);
      localStorage.setItem('auth_token', newToken);

      // Check for onboarding
      if (!userData.hasCompletedOnboarding) {
        setShowOnboardingModal(true);
      }

      toast.success('Login realizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Erro de conexão. Tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    toast.success('Logout realizado com sucesso!');
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!token) {
      setIsLoading(false);
      return false;
    }

    try {
      const response = await apiRequest('/auth/verify');

      if (!response.ok) {
        logout();
        return false;
      }

      const data = await response.json();
      setUser(data.data.user);
      return true;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Interceptar respostas 401 da API para fazer logout automático
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      // Só faz logout se for uma resposta 401 de uma rota da API
      if (response.status === 401 && isAuthenticated && args[0]?.toString().includes('/api/')) {
        console.log('Token expirado ou inválido, fazendo logout...');
        logout();
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [isAuthenticated, logout]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    showOnboardingModal,
    setShowOnboardingModal,
    login,
    logout,
    checkAuth,
    setUser,
    setToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showOnboardingModal && <OnboardingModal />}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};