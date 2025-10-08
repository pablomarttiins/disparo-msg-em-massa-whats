-- CreateEnum for AlertType (ignore if exists)
DO $$
BEGIN
    BEGIN
        CREATE TYPE "AlertType" AS ENUM ('QUOTA_WARNING', 'QUOTA_EXCEEDED', 'SYSTEM_ERROR', 'TENANT_INACTIVE', 'SESSION_FAILED', 'CAMPAIGN_FAILED', 'DATABASE_ERROR', 'API_ERROR', 'BACKUP_FAILED', 'SECURITY_ALERT');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END;
END$$;

-- CreateEnum for AlertSeverity (ignore if exists)
DO $$
BEGIN
    BEGIN
        CREATE TYPE "AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END;
END$$;

-- CreateEnum for NotificationMethod (ignore if exists)
DO $$
BEGIN
    BEGIN
        CREATE TYPE "NotificationMethod" AS ENUM ('IN_APP', 'EMAIL', 'WEBHOOK');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END;
END$$;

-- Create tenant_quotas table
CREATE TABLE IF NOT EXISTS "tenant_quotas" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "max_users" INTEGER NOT NULL DEFAULT 10,
    "max_contacts" INTEGER NOT NULL DEFAULT 1000,
    "max_campaigns" INTEGER NOT NULL DEFAULT 50,
    "max_connections" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_quotas_pkey" PRIMARY KEY ("id")
);

-- Create unique index for tenant_quotas
CREATE UNIQUE INDEX IF NOT EXISTS "tenant_quotas_tenant_id_key" ON "tenant_quotas"("tenant_id");

-- AddForeignKey for tenant_quotas (skip if it already exists)
DO $$
BEGIN
    BEGIN
        ALTER TABLE "tenant_quotas" ADD CONSTRAINT "tenant_quotas_tenant_id_fkey" 
        FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END$$;

-- Create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS "categories" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "descricao" TEXT,
    "tenant_id" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- Create index for categories
CREATE INDEX IF NOT EXISTS "categories_tenant_id_idx" ON "categories"("tenant_id");

-- AddForeignKey for categories (skip if it already exists)
DO $$
BEGIN
    BEGIN
        ALTER TABLE "categories" ADD CONSTRAINT "categories_tenant_id_fkey" 
        FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END$$;

-- Create alerts and notifications tables if they don't exist
CREATE TABLE IF NOT EXISTS "alerts" (
    "id" TEXT NOT NULL,
    "type" "AlertType" NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "tenant_id" TEXT,
    "user_id" TEXT,
    "metadata" JSONB,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolved_at" TIMESTAMP(3),
    "resolved_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "notifications" (
    "id" TEXT NOT NULL,
    "alert_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "method" "NotificationMethod" NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3),
    "read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- Create indexes for alerts
CREATE INDEX IF NOT EXISTS "alerts_tenant_id_idx" ON "alerts"("tenant_id");
CREATE INDEX IF NOT EXISTS "alerts_type_severity_idx" ON "alerts"("type", "severity");
CREATE INDEX IF NOT EXISTS "alerts_resolved_created_at_idx" ON "alerts"("resolved", "created_at");

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS "notifications_user_id_read_idx" ON "notifications"("user_id", "read");
CREATE INDEX IF NOT EXISTS "notifications_alert_id_idx" ON "notifications"("alert_id");

-- AddForeignKeys for alerts and notifications (skip if they already exist)
DO $$
BEGIN
    BEGIN
        ALTER TABLE "alerts" ADD CONSTRAINT "alerts_tenant_id_fkey" 
        FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE "alerts" ADD CONSTRAINT "alerts_user_id_fkey" 
        FOREIGN KEY ("user_id") REFERENCES "users"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE "notifications" ADD CONSTRAINT "notifications_alert_id_fkey" 
        FOREIGN KEY ("alert_id") REFERENCES "alerts"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" 
        FOREIGN KEY ("user_id") REFERENCES "users"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END$$;

-- Create user_tenants table
CREATE TABLE IF NOT EXISTS "user_tenants" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_tenants_pkey" PRIMARY KEY ("id")
);

-- Create indexes for user_tenants
CREATE INDEX IF NOT EXISTS "user_tenants_user_id_idx" ON "user_tenants"("user_id");
CREATE INDEX IF NOT EXISTS "user_tenants_tenant_id_idx" ON "user_tenants"("tenant_id");
CREATE UNIQUE INDEX IF NOT EXISTS "user_tenants_user_id_tenant_id_key" ON "user_tenants"("user_id", "tenant_id");

-- AddForeignKeys for user_tenants (skip if they already exist)
DO $$
BEGIN
    BEGIN
        ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_user_id_fkey" 
        FOREIGN KEY ("user_id") REFERENCES "users"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE "user_tenants" ADD CONSTRAINT "user_tenants_tenant_id_fkey" 
        FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END$$;