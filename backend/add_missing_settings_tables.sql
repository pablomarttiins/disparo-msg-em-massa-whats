-- Create global_settings table
CREATE TABLE IF NOT EXISTS "global_settings" (
    "id" TEXT NOT NULL,
    "singleton" BOOLEAN NOT NULL DEFAULT true,
    "waha_host" TEXT NOT NULL DEFAULT '',
    "waha_api_key" TEXT NOT NULL DEFAULT '',
    "evolution_host" TEXT NOT NULL DEFAULT '',
    "evolution_api_key" TEXT NOT NULL DEFAULT '',
    "logo_url" TEXT,
    "favicon_url" TEXT,
    "icon_url" TEXT,
    "company_name" TEXT,
    "page_title" TEXT,
    "primary_color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_settings_pkey" PRIMARY KEY ("id")
);

-- Create unique index for global_settings
CREATE UNIQUE INDEX IF NOT EXISTS "global_settings_singleton_key" ON "global_settings"("singleton");

-- Create tenant_settings table
CREATE TABLE IF NOT EXISTS "tenant_settings" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "openai_api_key" TEXT,
    "groq_api_key" TEXT,
    "custom_branding" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_settings_pkey" PRIMARY KEY ("id")
);

-- Create unique index for tenant_settings
CREATE UNIQUE INDEX IF NOT EXISTS "tenant_settings_tenant_id_key" ON "tenant_settings"("tenant_id");

-- AddForeignKey for tenant_settings (skip if it already exists)
DO $$
BEGIN
    BEGIN
        ALTER TABLE "tenant_settings" ADD CONSTRAINT "tenant_settings_tenant_id_fkey" 
        FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END$$;