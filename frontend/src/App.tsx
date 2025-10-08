import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TenantProvider } from './contexts/TenantContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { ContactsPage } from './pages/ContactsPage';
import { WhatsAppConnectionsPage } from './pages/WhatsAppConnectionsPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { SettingsPage } from './pages/SettingsPage';
import { UsersPage } from './pages/UsersPage';
import { LoginPage } from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { SuperAdminPage } from './pages/SuperAdminPage';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { SuperAdminManagerPage } from './pages/SuperAdminManagerPage';
import LandingPage from './components/LandingPage';
import { useGlobalSettings } from './hooks/useGlobalSettings';
import './styles/globals.css';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { settings } = useGlobalSettings();

  // Aplicar meta tags dinâmicas (título e favicon)
  useEffect(() => {
    // Atualizar título da página
    if (settings?.pageTitle) {
      document.title = settings.pageTitle;
    }

    // Atualizar favicon
    if (settings?.faviconUrl) {
      // Remover favicons existentes
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(favicon => favicon.remove());

      // Adicionar novo favicon com cache busting
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = settings.faviconUrl + '?v=' + Date.now();
      document.head.appendChild(favicon);

      // Adicionar também como shortcut icon para compatibilidade
      const shortcutIcon = document.createElement('link');
      shortcutIcon.rel = 'shortcut icon';
      shortcutIcon.type = 'image/png';
      shortcutIcon.href = settings.faviconUrl + '?v=' + Date.now();
      document.head.appendChild(shortcutIcon);
    }
  }, [settings?.pageTitle, settings?.faviconUrl]);

  // Remove any banners dynamically - more specific targeting
  useEffect(() => {
    const removeBanners = () => {
      // Remove elements with specific version banner text
      const elements = Array.from(document.querySelectorAll('*')).filter(el =>
        el.textContent && el.textContent.includes('BUILD 2025-09-17-19:02')
      );
      elements.forEach(el => {
        el.remove();
      });
    };

    // Run on mount
    removeBanners();

    // Run every 5 seconds (less aggressive)
    const interval = setInterval(removeBanners, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="main-content flex-1 flex flex-col">
        <Routes>
          <Route path="/login" element={<Navigate to="/contatos" replace />} />
          <Route path="/" element={<Navigate to="/contatos" replace />} />
          <Route
            path="/contatos"
            element={
              <ProtectedRoute>
                <ContactsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/whatsapp"
            element={
              <ProtectedRoute>
                <WhatsAppConnectionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campanhas"
            element={
              <ProtectedRoute>
                <CampaignsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute superAdminOnly={true}>
                <SuperAdminManagerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/dashboard"
            element={
              <ProtectedRoute superAdminOnly={true}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/tenants"
            element={
              <ProtectedRoute superAdminOnly={true}>
                <SuperAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute adminOnly={true}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <TenantProvider>
          <AppContent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
                padding: '12px 16px',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </TenantProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;