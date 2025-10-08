-- Adicionar coluna tenant_id à tabela users
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "tenant_id" TEXT;

-- Adicionar índice para a coluna tenant_id
CREATE INDEX IF NOT EXISTS "users_tenant_id_idx" ON "users"("tenant_id");

-- Adicionar foreign key para relacionar com a tabela tenants
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'users_tenant_id_fkey' 
                   AND table_name = 'users') THEN
        ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" 
        FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- Adicionar coluna tenant_id às outras tabelas que também precisam
-- Contatos
ALTER TABLE "contacts" ADD COLUMN IF NOT EXISTS "tenant_id" TEXT;
CREATE INDEX IF NOT EXISTS "contacts_tenant_id_idx" ON "contacts"("tenant_id");
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_tenant_id_fkey" 
FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;

-- Categorias
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "tenant_id" TEXT;
CREATE INDEX IF NOT EXISTS "categories_tenant_id_idx" ON "categories"("tenant_id");
ALTER TABLE "categories" ADD CONSTRAINT "categories_tenant_id_fkey" 
FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;

-- WhatsApp Sessions
ALTER TABLE "whatsapp_sessions" ADD COLUMN IF NOT EXISTS "tenant_id" TEXT;
CREATE INDEX IF NOT EXISTS "whatsapp_sessions_tenant_id_idx" ON "whatsapp_sessions"("tenant_id");
ALTER TABLE "whatsapp_sessions" ADD CONSTRAINT "whatsapp_sessions_tenant_id_fkey" 
FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;

-- Campaigns
ALTER TABLE "campaigns" ADD COLUMN IF NOT EXISTS "tenant_id" TEXT;
CREATE INDEX IF NOT EXISTS "campaigns_tenant_id_idx" ON "campaigns"("tenant_id");
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_tenant_id_fkey" 
FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;

-- Campaign Messages
ALTER TABLE "campaign_messages" ADD COLUMN IF NOT EXISTS "tenant_id" TEXT;
CREATE INDEX IF NOT EXISTS "campaign_messages_tenant_id_idx" ON "campaign_messages"("tenant_id");
ALTER TABLE "campaign_messages" ADD CONSTRAINT "campaign_messages_tenant_id_fkey" 
FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
ON DELETE CASCADE ON UPDATE CASCADE;