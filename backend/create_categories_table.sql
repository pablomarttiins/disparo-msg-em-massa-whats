-- Criar a tabela categories baseada no schema.prisma
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "descricao" TEXT,
    "tenant_id" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "categories_tenant_id_idx" ON "categories"("tenant_id");