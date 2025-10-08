import { useSettings } from '../hooks/useSettings';
import { useAuth } from '../contexts/AuthContext';
import { TenantSelector } from './TenantSelector';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const { settings } = useSettings();
  const { user } = useAuth();

  const getUserRoleText = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'USER':
        return 'Usuário';
      default:
        return 'Usuário';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Título e Subtítulo */}
        <div className="flex items-center space-x-4">
          {/* Logo da empresa no header */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">WC</span>
            </div>
            <div className="border-l border-gray-300 pl-3">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Ações da direita */}
        <div className="flex items-center space-x-4">
          {/* Tenant Selector */}
          <TenantSelector />

          {/* Avatar do usuário */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.nome || 'Usuário'}</p>
              <p className="text-xs text-gray-500">{getUserRoleText(user?.role || 'USER')}</p>
            </div>
          </div>

          {/* Ações customizadas */}
          {actions && (
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}