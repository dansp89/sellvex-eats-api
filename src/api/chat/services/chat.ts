import { factories } from '@strapi/strapi';
import { QueryType } from '~types/app';

export default factories.createCoreService('api::chat.chat', ({ strapi }) => ({
  // Enviar mensagem
  async sendMessage({ senderId, receiverId, orderId, message, attachments = [] }) {
    const trx = await strapi.db.connection.transaction();
    
    try {
      // Verificar se o destinatário existe
      const [user] = await strapi.db.connection.raw(
        'SELECT id FROM up_users WHERE id = ?',
        [receiverId]
      );

      if (!user || user.length === 0) {
        throw new Error('Destinatário não encontrado');
      }

      // Inserir a mensagem
      const [messageResult] = await trx.raw(
        `INSERT INTO chats 
        (message, sender_id, receiver_id, order_id, is_read, created_at, updated_at, published_at)
        VALUES (?, ?, ?, ?, false, NOW(), NOW(), NOW())
        RETURNING *`,
        [message, senderId, receiverId, orderId || null]
      );

      // Inserir anexos se houver
      if (attachments && attachments.length > 0) {
        const attachmentsData = attachments.map((file: any) => ({
          name: file.name,
          url: file.url,
          mime: file.mime,
          size: file.size,
          chat_id: messageResult.rows[0].id,
          created_at: new Date(),
          updated_at: new Date()
        }));

        if (attachmentsData.length > 0) {
          await trx('chat_attachments').insert(attachmentsData);
        }
      }

      await trx.commit();
      
      // Buscar a mensagem completa para retornar
      const [completeMessage] = await strapi.db.connection.raw(
        `SELECT c.*, 
          json_build_object(
            'id', u1.id,
            'username', u1.username,
            'email', u1.email
          ) as sender,
          json_build_object(
            'id', u2.id,
            'username', u2.username,
            'email', u2.email
          ) as receiver
        FROM chats c
        JOIN up_users u1 ON c.sender_id = u1.id
        JOIN up_users u2 ON c.receiver_id = u2.id
        WHERE c.id = ?`,
        [messageResult.rows[0].id]
      );

      return completeMessage.rows[0];
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  // Buscar conversa entre dois usuários
  async getConversation({ currentUserId, otherUserId, orderId, page = 1, pageSize = 20 }) {
    try {
      const offset = (page - 1) * pageSize;

      // Query para buscar mensagens
      const messagesQuery = `
        SELECT 
          c.id,
          c.message,
          c.is_read,
          c.created_at,
          c.updated_at,
          json_build_object(
            'id', u1.id,
            'username', u1.username,
            'email', u1.email
          ) as sender,
          json_build_object(
            'id', u2.id,
            'username', u2.username,
            'email', u2.email
          ) as receiver,
          (
            SELECT COALESCE(json_agg(
              json_build_object(
                'id', ca.id,
                'name', ca.name,
                'url', ca.url,
                'mime', ca.mime,
                'size', ca.size
              )
            ), '[]')
            FROM chat_attachments ca 
            WHERE ca.chat_id = c.id
          ) as attachments
        FROM chats c
        JOIN up_users u1 ON c.sender_id = u1.id
        JOIN up_users u2 ON c.receiver_id = u2.id
        WHERE (
          (c.sender_id = ? AND c.receiver_id = ?) OR 
          (c.sender_id = ? AND c.receiver_id = ?)
        )
        ${orderId ? 'AND (c.order_id = ? OR c.order_id IS NULL)' : ''}
        ORDER BY c.created_at DESC
        LIMIT ? OFFSET ?
      `;

      // Query para contar total de mensagens
      const countQuery = `
        SELECT COUNT(*) as total
        FROM chats c
        WHERE (
          (c.sender_id = ? AND c.receiver_id = ?) OR 
          (c.sender_id = ? AND c.receiver_id = ?)
        )
        ${orderId ? 'AND (c.order_id = ? OR c.order_id IS NULL)' : ''}
      `;

      const queryParams = [
        currentUserId, otherUserId,
        otherUserId, currentUserId
      ];

      if (orderId) {
        queryParams.push(orderId);
      }

      const [messages, countResult] = await Promise.all([
        strapi.db.connection.raw(
          messagesQuery, 
          [...queryParams, pageSize, offset]
        ),
        strapi.db.connection.raw(
          countQuery,
          queryParams
        )
      ]);

      const total = parseInt(countResult.rows[0].total);
      const pageCount = Math.ceil(total / pageSize);

      return {
        data: messages.rows,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount,
            total
          }
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar conversa: ${error.message}`);
    }
  },

  // Marcar mensagens como lidas
  async markAsRead({ userId, messageIds }) {
    try {
      if (!messageIds || messageIds.length === 0) {
        return false;
      }

      await strapi.db.connection.raw(
        `UPDATE chats 
        SET is_read = true, updated_at = NOW()
        WHERE id = ANY(?) AND receiver_id = ?`,
        [messageIds, userId]
      );

      return true;
    } catch (error) {
      throw new Error(`Erro ao marcar mensagens como lidas: ${error.message}`);
    }
  },

  // Buscar conversas recentes
  async getRecentConversations({ userId, page = 1, pageSize = 10 }) {
    try {
      const offset = (page - 1) * pageSize;

      const query = `
        WITH last_messages AS (
          SELECT 
            CASE 
              WHEN sender_id = ? THEN receiver_id
              ELSE sender_id
            END as other_user_id,
            MAX(created_at) as last_message_at
          FROM chats
          WHERE sender_id = ? OR receiver_id = ?
          GROUP BY other_user_id
          ORDER BY last_message_at DESC
          LIMIT ? OFFSET ?
        )
        SELECT 
          u.id,
          u.username,
          u.email,
          u.provider,
          u.confirmed,
          u.blocked,
          u.created_at,
          u.updated_at,
          (
            SELECT json_build_object(
              'id', c.id,
              'message', c.message,
              'is_read', c.is_read,
              'created_at', c.created_at,
              'sender_id', c.sender_id
            )
            FROM chats c
            WHERE (c.sender_id = u.id AND c.receiver_id = ?)
               OR (c.sender_id = ? AND c.receiver_id = u.id)
            ORDER BY c.created_at DESC
            LIMIT 1
          ) as last_message,
          (
            SELECT COUNT(*) 
            FROM chats c
            WHERE c.sender_id = u.id 
              AND c.receiver_id = ? 
              AND c.is_read = false
          ) as unread_count
        FROM up_users u
        JOIN last_messages lm ON u.id = lm.other_user_id
        ORDER BY lm.last_message_at DESC
      `;

      const [conversations, countResult] = await Promise.all([
        strapi.db.connection.raw(query, [
          userId, userId, userId, 
          pageSize, offset,
          userId, userId,
          userId
        ]),
        strapi.db.connection.raw(
          `SELECT COUNT(DISTINCT 
            CASE 
              WHEN sender_id = ? THEN receiver_id
              ELSE sender_id
            END
          ) as total
          FROM chats
          WHERE sender_id = ? OR receiver_id = ?`,
          [userId, userId, userId]
        )
      ]);

      const total = parseInt(countResult.rows[0].total);
      const pageCount = Math.ceil(total / pageSize);

      return {
        data: conversations.rows,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount,
            total
          }
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar conversas recentes: ${error.message}`);
    }
  },

  // Método para buscar mensagem específica por documentId
  async findOnePublic(documentId: string) {
    try {
      const query = `
        SELECT 
          c.id,
          c.document_id,
          c.message,
          c.is_read,
          c.created_at,
          c.updated_at,
          c.published_at,
          json_build_object(
            'id', u1.id,
            'username', u1.username,
            'email', u1.email
          ) as sender,
          json_build_object(
            'id', u2.id,
            'username', u2.username,
            'email', u2.email
          ) as receiver,
          (
            SELECT COALESCE(json_agg(
              json_build_object(
                'id', ca.id,
                'name', ca.name,
                'url', ca.url,
                'mime', ca.mime,
                'size', ca.size
              )
            ), '[]')
            FROM chat_attachments ca 
            WHERE ca.chat_id = c.id
          ) as attachments
        FROM chats c
        JOIN up_users u1 ON c.sender_id = u1.id
        JOIN up_users u2 ON c.receiver_id = u2.id
        WHERE c.document_id = ? AND c.published_at IS NOT NULL
      `;

      const result = await strapi.db.connection.raw(query, [documentId]);
      
      if (!result.rows?.length) {
        return null;
      }

      return {
        data: result.rows[0]
      };
    } catch (error) {
      throw new Error(`Erro ao buscar mensagem: ${error.message}`);
    }
  },

  // Método para buscar mensagens públicas
  async findPublic(query: QueryType) {
    try {
      const page = typeof query.page === 'number' ? query.page : parseInt(query.page || '1', 10) || 1;
      const pageSize = Math.min(
        typeof query.pageSize === 'number' ? query.pageSize : parseInt(query.pageSize || '25', 10) || 25,
        100
      );
      const offset = (page - 1) * pageSize;

      const messagesQuery = `
        SELECT 
          c.id,
          c.document_id,
          c.message,
          c.is_read,
          c.created_at,
          c.updated_at,
          c.published_at,
          json_build_object(
            'id', u1.id,
            'username', u1.username,
            'email', u1.email
          ) as sender,
          json_build_object(
            'id', u2.id,
            'username', u2.username,
            'email', u2.email
          ) as receiver,
          (
            SELECT COALESCE(json_agg(
              json_build_object(
                'id', ca.id,
                'name', ca.name,
                'url', ca.url,
                'mime', ca.mime,
                'size', ca.size
              )
            ), '[]')
            FROM chat_attachments ca 
            WHERE ca.chat_id = c.id
          ) as attachments
        FROM chats c
        JOIN up_users u1 ON c.sender_id = u1.id
        JOIN up_users u2 ON c.receiver_id = u2.id
        WHERE c.published_at IS NOT NULL
        ORDER BY c.created_at DESC
        LIMIT ? OFFSET ?
      `;

      const countQuery = `
        SELECT COUNT(*) as total
        FROM chats c
        WHERE c.published_at IS NOT NULL
      `;

      const [messages, countResult] = await Promise.all([
        strapi.db.connection.raw(messagesQuery, [pageSize, offset]),
        strapi.db.connection.raw(countQuery)
      ]);

      const total = parseInt(countResult.rows[0].total);
      const pageCount = Math.ceil(total / pageSize);

      return {
        data: messages.rows,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount,
            total
          }
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar mensagens públicas: ${error.message}`);
    }
  }
}));
