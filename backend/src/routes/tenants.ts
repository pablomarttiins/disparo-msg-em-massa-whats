import { Router } from 'express';
import { TenantController } from '../controllers/tenantController';
import { authMiddleware } from '../middleware/auth';

// Roteador para rotas públicas de tenant (ex: signup)
const publicTenantRouter = Router();
publicTenantRouter.post('/signup', TenantController.signupTenant);

// Roteador para rotas protegidas de tenant (apenas SUPERADMIN)
const protectedTenantRouter = Router();

// Aplicar middleware de autenticação a todas as rotas protegidas
protectedTenantRouter.use(authMiddleware);

// Definir rotas protegidas
protectedTenantRouter.get('/', TenantController.listTenants);
protectedTenantRouter.post('/', TenantController.createTenant);
protectedTenantRouter.get('/:tenantId', TenantController.getTenant);
protectedTenantRouter.put('/:tenantId', TenantController.updateTenant);
protectedTenantRouter.delete('/:tenantId', TenantController.deleteTenant);

export { publicTenantRouter, protectedTenantRouter };
