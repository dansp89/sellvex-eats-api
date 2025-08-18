'use strict';

async function up(knex) {
  // Criar tabela de mensagens de chat
  await knex.schema.createTable('chats', (table) => {
    table.increments('id').primary();
    table.text('message').notNullable();
    
    // Relacionamento com o remetente (usuário)
    table.integer('sender_id').unsigned().notNullable();
    table.foreign('sender_id').references('id').inTable('up_users').onDelete('CASCADE');
    
    // Relacionamento com o destinatário (usuário)
    table.integer('receiver_id').unsigned().notNullable();
    table.foreign('receiver_id').references('id').inTable('up_users').onDelete('CASCADE');
    
    // Relacionamento com pedido (opcional)
    table.integer('order_id').unsigned().nullable();
    table.foreign('order_id').references('id').inTable('orders').onDelete('SET NULL');
    
    // Status da mensagem
    table.boolean('is_read').defaultTo(false);
    
    // Timestamps
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  // Criar tabela de anexos de mensagens
  await knex.schema.createTable('chat_attachments', (table) => {
    table.increments('id').primary();
    
    // Relacionamento com a mensagem
    table.integer('chat_id').unsigned().notNullable();
    table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE');
    
    // Informações do arquivo
    table.string('name').notNullable();
    table.string('url').notNullable();
    table.string('mime').notNullable();
    table.bigInteger('size').notNullable();
    
    // Timestamps
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  // Adicionar índices para melhorar desempenho nas consultas frequentes
  await knex.schema.raw(`
    CREATE INDEX idx_chats_sender_receiver ON chats(sender_id, receiver_id);
    CREATE INDEX idx_chats_receiver_sender ON chats(receiver_id, sender_id);
    CREATE INDEX idx_chats_order ON chats(order_id);
    CREATE INDEX idx_chats_created_at ON chats(created_at);
  `);
}

module.exports = { up };
