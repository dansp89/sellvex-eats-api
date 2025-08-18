# Configuração do Módulo de Chat

Este documento descreve como configurar as permissões para o módulo de chat no painel administrativo do Strapi.

## Tabelas do Banco de Dados

O módulo de chat utiliza duas tabelas principais:

1. `chats` - Armazena as mensagens de chat
2. `chat_attachments` - Armazena os anexos das mensagens

## Permissões

Para configurar as permissões do módulo de chat, siga estes passos:

1. Acesse o painel administrativo do Strapi
2. Vá para "Configurações" (ícone de engrenagem)
3. Selecione "Usuários e Permissões"
4. Clique em "Funções"
5. Selecione a função que deseja configurar (ex: "Autenticado", "Público")
6. Role até a seção "Permissões"
7. Procure por "Chat" na lista de permissões
8. Marque as permissões desejadas:
   - `find` - Visualizar mensagens
   - `findOne` - Visualizar uma mensagem específica
   - `create` - Enviar mensagens
   - `update` - Atualizar mensagens (opcional)
   - `delete` - Excluir mensagens (opcional)
9. Clique em "Salvar"

## Configuração Recomendada

### Para Usuários Autenticados:
- `find`: Permitido
- `findOne`: Permitido
- `create`: Permitido
- `update`: Apenas próprio
- `delete`: Apenas próprio

### Para Entregadores:
- `find`: Permitido
- `findOne`: Permitido
- `create`: Permitido
- `update`: Apenas próprio
- `delete`: Apenas próprio

### Para Administradores:
- Todas as permissões ativadas

## Testando as Permissões

Para testar se as permissões estão configuradas corretamente:

1. Faça login como um usuário com permissões limitadas
2. Tente acessar as rotas do chat
3. Verifique se as ações permitidas funcionam conforme esperado
4. Verifique se as ações não permitidas retornam erro de permissão

## Solução de Problemas

Se as permissões não estiverem sendo aplicadas corretamente:

1. Verifique se o usuário está autenticado
2. Confirme se a função do usuário tem as permissões corretas
3. Limpe o cache do navegador
4. Verifique os logs do servidor para erros
5. Certifique-se de que as migrações foram executadas corretamente

## Rotas da API

O módulo de chat expõe as seguintes rotas:

- `POST /chat/messages` - Enviar mensagem
- `GET /chat/conversation/:userId` - Buscar conversa com um usuário
- `PUT /chat/messages/read` - Marcar mensagens como lidas
- `GET /chat/conversations` - Listar conversas recentes

Consulte o arquivo `src/api/chat/routes/01-custom.ts` para mais detalhes sobre as rotas e seus parâmetros.
