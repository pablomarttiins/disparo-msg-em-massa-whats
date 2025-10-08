#!/bin/sh

echo "🚀 Starting Astra Campaign Backend..."

# Aguardar um pouco para o banco subir
echo "⏳ Waiting for database startup..."
sleep 20

echo "🔄 Setting up database..."

# Marca a migração inicial como aplicada (baseline).
# É seguro executar este comando múltiplas vezes.
echo "📋 Baselining database by resolving initial migration..."
npx prisma migrate resolve --applied 0_init

# Aplica quaisquer outras migrações pendentes.
echo "📋 Applying pending migrations..."
npx prisma migrate deploy

# Executar seed
echo "🌱 Running database seed..."
npx prisma db seed || echo "⚠️ Seed failed, continuing..."

# Gerar cliente prisma
echo "🔧 Generating Prisma client..."
npx prisma generate || echo "⚠️ Prisma generate failed, continuing..."

# Iniciar servidor
echo "🎯 Starting server..."
exec node dist/server.js

echo "🎉 Astra Campaign Backend started!"
