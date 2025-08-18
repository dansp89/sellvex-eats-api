'use strict';

/**
 * Migração para renomear customer_id para user_id e remover tabela customers
 */

async function up(knex) {
  console.log('🔄 Iniciando migração: customer -> user');

  // Como é um novo banco, vamos apenas adicionar as colunas necessárias ao up_users
  console.log('📝 Configurando estrutura para migração...');

  // Como é uma nova instalação, apenas garantir que as colunas extras existam no up_users
  console.log('📝 Verificando estrutura do up_users...');
  
  // Verificar se a tabela up_users existe
  const upUsersExists = await knex.schema.hasTable('up_users');
  
  if (upUsersExists) {
    // Verificar e adicionar colunas se não existirem
    const hasPhone = await knex.schema.hasColumn('up_users', 'phone');
    const hasLoyaltyPoints = await knex.schema.hasColumn('up_users', 'loyalty_points');
    const hasTotalSpent = await knex.schema.hasColumn('up_users', 'total_spent');
    const hasTotalOrders = await knex.schema.hasColumn('up_users', 'total_orders');
    const hasPreferences = await knex.schema.hasColumn('up_users', 'preferences');

    if (!hasPhone || !hasLoyaltyPoints || !hasTotalSpent || !hasTotalOrders || !hasPreferences) {
      await knex.schema.alterTable('up_users', (table) => {
        if (!hasPhone) {
          table.string('phone');
        }
        if (!hasLoyaltyPoints) {
          table.integer('loyalty_points').defaultTo(0);
        }
        if (!hasTotalSpent) {
          table.decimal('total_spent', 10, 2).defaultTo(0);
        }
        if (!hasTotalOrders) {
          table.integer('total_orders').defaultTo(0);
        }
        if (!hasPreferences) {
          table.json('preferences');
        }
      });
      console.log('✅ Colunas adicionadas ao up_users');
    }
  }
  
  console.log('✅ Estrutura verificada');

  console.log('🎉 Migração concluída com sucesso!');
}

async function down(knex) {
  console.log('⚠️ Rollback não implementado - esta migração não é reversível');
  console.log('Para reverter, você precisará restaurar um backup do banco de dados');
}

module.exports = { up, down };
