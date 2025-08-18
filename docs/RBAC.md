# 🔐 RBAC - Role-Based Access Control

## Sellvex Eats - Sistema de Controle de Acesso Baseado em Funções

Este documento define as funções (roles) e permissões do sistema Sellvex Eats, estabelecendo um controle de acesso robusto e escalável.

---

## 📋 **Índice**

1. [Visão Geral](#visão-geral)
2. [Hierarquia de Funções](#hierarquia-de-funções)
3. [Funções Principais](#funções-principais)
4. [Matriz de Permissões](#matriz-de-permissões)
5. [Content Types e Acessos](#content-types-e-acessos)
6. [APIs Customizadas](#apis-customizadas)
7. [Implementação](#implementação)

---

## 🎯 **Visão Geral**

O sistema Sellvex Eats implementa um modelo RBAC (Role-Based Access Control) hierárquico com as seguintes características:

- **22 funções distintas** cobrindo todos os aspectos do negócio
- **Hierarquia de permissões** do público geral ao super administrador  
- **Controle granular** por content type e ação
- **Segregação de responsabilidades** por área de atuação
- **Escalabilidade** para crescimento do negócio

---

## 🏗️ **Hierarquia de Funções**

```
Supreme Master (Nível 10)
    ├── Super Admin (Nível 9)
        ├── Developer (Nível 8)
        ├── Admin (Nível 7)
            ├── Manager (Nível 6)
                ├── Delivery Manager (Nível 5)
                ├── Analyst (Nível 5)
                ├── Accountant (Nível 5)
                    ├── Kitchen Staff (Nível 4)
                    ├── Cashier (Nível 4)
                    ├── Support Agent (Nível 4)
                    ├── Chat Operator (Nível 4)
                        ├── Employee (Nível 3)
                        ├── Delivery Driver (Nível 3)
                            ├── VIP Customer (Nível 2)
                            ├── Customer (Nível 2)
                                ├── Authenticated (Nível 1)
                                    └── Public (Nível 0)
```

---

## 👥 **Funções Principais**

### **🌍 Acesso Público**

#### **Public** (Nível 0)
- **Descrição:** Usuários não autenticados
- **Responsabilidades:**
  - Visualização do cardápio público
  - Consulta de informações básicas da loja
  - Acesso às páginas de marketing
- **Permissões:**
  - `product:find` (somente produtos ativos)
  - `category:find` (somente categorias ativas)
  - `setting:findOne` (configurações públicas)

---

### **🔐 Usuários Autenticados**

#### **Authenticated** (Nível 1)
- **Descrição:** Usuários com conta criada mas sem função específica
- **Responsabilidades:**
  - Acesso básico ao sistema
  - Atualização de perfil próprio
- **Permissões:**
  - Herda todas as permissões de `Public`
  - `users-permissions:me` (visualizar próprio perfil)

#### **Customer** (Nível 2)
- **Descrição:** Cliente final padrão
- **Responsabilidades:**
  - Realização de pedidos
  - Avaliação de produtos e serviços
  - Atualização de dados pessoais
  - Acompanhamento de pedidos
- **Permissões:**
  - Herda todas as permissões de `Authenticated`
  - `order:create` (criar pedidos)
  - `order:find` (apenas próprios pedidos)
  - `payment:create` (processar pagamentos)
  - `payment:find` (apenas próprios pagamentos)
  - `review:create` (avaliar produtos)
  - `review:update` (apenas próprias avaliações)
  - `chat:create` (comunicação com suporte)
  - `notification:find` (próprias notificações)
  - `notification:update` (marcar como lida)

#### **VIP Customer** (Nível 2)
- **Descrição:** Cliente VIP com benefícios especiais
- **Responsabilidades:**
  - Todas as responsabilidades de Customer
  - Acesso a produtos e ofertas exclusivas
  - Suporte prioritário
- **Permissões:**
  - Herda todas as permissões de `Customer`
  - Acesso a produtos com `isVipOnly: true`
  - Prioridade no chat de suporte

---

### **👷 Funcionários**

#### **Employee** (Nível 3)
- **Descrição:** Funcionário básico da empresa
- **Responsabilidades:**
  - Acesso interno ao sistema
  - Consulta de informações operacionais básicas
- **Permissões:**
  - Herda permissões de `Authenticated`
  - `order:find` (todos os pedidos - visualização)
  - `product:find` (todos os produtos)
  - `category:find` (todas as categorias)

#### **Delivery Driver** (Nível 3)
- **Descrição:** Entregador responsável pelas entregas
- **Responsabilidades:**
  - Entrega de pedidos aos clientes
  - Atualização de status de entrega
  - Coleta de pagamentos (se aplicável)
  - Manutenção de veículo/equipamentos
- **Permissões:**
  - Herda todas as permissões de `Employee`
  - `order:update` (apenas status de entrega)
  - `order:findForDriver` (API customizada)
  - `order:acceptOrder` (API customizada)
  - `order:updateStatus` (API customizada)
  - `delivery-driver:findProfile` (próprio perfil)
  - `delivery-driver:findAvailableOrders` (API customizada)
  - `delivery-driver:findMyDeliveries` (API customizada)
  - `chat:create` (comunicação com cliente)
  - `notification:find` (próprias notificações)

#### **Kitchen Staff** (Nível 4)
- **Descrição:** Funcionário da cozinha
- **Responsabilidades:**
  - Preparo de pedidos
  - Controle de estoque de ingredientes
  - Atualização de status de preparo
- **Permissões:**
  - Herda todas as permissões de `Employee`
  - `order:update` (status de preparo)
  - `ingredient:find`
  - `ingredient:update` (quantidade em estoque)
  - `product:update` (disponibilidade)

#### **Cashier** (Nível 4)
- **Descrição:** Funcionário do caixa
- **Responsabilidades:**
  - Processamento de pagamentos
  - Atendimento ao cliente
  - Controle de vendas
- **Permissões:**
  - Herda todas as permissões de `Employee`
  - `payment:find`
  - `payment:update`
  - `order:update` (status de pagamento)

#### **Chat Operator** (Nível 4)
- **Descrição:** Operador de chat e suporte
- **Responsabilidades:**
  - Atendimento ao cliente via chat
  - Resolução de problemas básicos
  - Escalação para níveis superiores
- **Permissões:**
  - Herda todas as permissões de `Employee`
  - `chat:find`
  - `chat:create`
  - `chat:update`
  - `notification:create` (notificar clientes)

#### **Support Agent** (Nível 4)
- **Descrição:** Agente de suporte especializado
- **Responsabilidades:**
  - Suporte técnico avançado
  - Resolução de problemas complexos
  - Gestão de reclamações
- **Permissões:**
  - Herda todas as permissões de `Chat Operator`
  - `review:find`
  - `review:update` (moderação)
  - `order:update` (resolução de problemas)

---

### **👔 Gestão e Administração**

#### **Analyst** (Nível 5)
- **Descrição:** Analista de dados e performance
- **Responsabilidades:**
  - Análise de métricas de negócio
  - Geração de relatórios
  - Insights para tomada de decisão
- **Permissões:**
  - Herda todas as permissões de `Support Agent`
  - Acesso completo de leitura a todos os content types
  - APIs de relatórios e analytics

#### **Accountant** (Nível 5)
- **Descrição:** Contador/Financeiro
- **Responsabilidades:**
  - Gestão financeira
  - Controle de pagamentos e recebimentos
  - Relatórios fiscais
- **Permissões:**
  - Herda todas as permissões de `Analyst`
  - `payment:find` (todos)
  - `payment:update`
  - `order:update` (aspectos financeiros)

#### **Delivery Manager** (Nível 5)
- **Descrição:** Gerente de entrega
- **Responsabilidades:**
  - Coordenação de entregas
  - Gestão de entregadores
  - Otimização de rotas
- **Permissões:**
  - Herda todas as permissões de `Accountant`
  - `delivery-driver:find`
  - `delivery-driver:update`
  - `delivery-zone:find`
  - `delivery-zone:update`

#### **Manager** (Nível 6)
- **Descrição:** Gerente geral da operação
- **Responsabilidades:**
  - Supervisão geral da operação
  - Gestão de equipes
  - Controle de qualidade
- **Permissões:**
  - Herda todas as permissões de `Delivery Manager`
  - Acesso completo de edição na maioria dos content types
  - Gestão de funcionários de nível inferior

#### **Admin** (Nível 7)
- **Descrição:** Administrador da loja/restaurante
- **Responsabilidades:**
  - Gerenciamento de cardápio e produtos
  - Configuração de preços e promoções
  - Relatórios de vendas e performance
  - Gestão de funcionários da loja
- **Permissões:**
  - Herda todas as permissões de `Manager`
  - `product:create`, `product:update`, `product:delete`
  - `category:create`, `category:update`, `category:delete`
  - `ingredient:create`, `ingredient:update`, `ingredient:delete`
  - `setting:update`
  - Gestão completa de usuários até nível `Manager`

#### **Developer** (Nível 8)
- **Descrição:** Desenvolvedor do sistema
- **Responsabilidades:**
  - Desenvolvimento e manutenção do sistema
  - Debugging e resolução de bugs
  - Implementação de novas funcionalidades
- **Permissões:**
  - Herda todas as permissões de `Admin`
  - Acesso completo a APIs de desenvolvimento
  - Logs e debugging
  - Configurações avançadas do sistema

#### **Super Admin** (Nível 9)
- **Descrição:** Super administrador do sistema
- **Responsabilidades:**
  - Administração completa do sistema
  - Gestão de todos os usuários
  - Configurações críticas do sistema
- **Permissões:**
  - Herda todas as permissões de `Developer`
  - Acesso completo a todos os content types
  - Gestão de todos os usuários e permissões
  - Configurações de sistema críticas

#### **Supreme Master** (Nível 10)
- **Descrição:** Nível máximo de acesso
- **Responsabilidades:**
  - Controle absoluto do sistema
  - Gestão de Super Admins
  - Decisões estratégicas críticas
- **Permissões:**
  - Acesso irrestrito a todo o sistema
  - Todas as permissões possíveis

---

### **🤖 Sistema e API**

#### **API User** (Acesso Especial)
- **Descrição:** Usuário para integrações e APIs externas
- **Responsabilidades:**
  - Integrações com sistemas externos
  - Processamento automatizado
  - Sincronização de dados
- **Permissões:**
  - Permissões específicas por integração
  - Rate limiting aplicado
  - Logs de auditoria obrigatórios

---

## 📊 **Matriz de Permissões por Content Type**

| Content Type | Public | Auth | Customer | Employee | Staff | Manager | Admin | Super |
|-------------|--------|------|----------|----------|-------|---------|-------|-------|
| **Product** | R (ativos) | R (ativos) | R (ativos) | R (todos) | R/U (estoque) | R/U | CRUD | CRUD |
| **Category** | R (ativas) | R (ativas) | R (ativas) | R (todas) | R | R/U | CRUD | CRUD |
| **Ingredient** | - | - | - | R | R/U | R/U | CRUD | CRUD |
| **Order** | - | - | R/C (próprios) | R | R/U (status) | R/U | CRUD | CRUD |
| **Payment** | - | - | R/C (próprios) | - | R/U | R/U | CRUD | CRUD |
| **Review** | R | R | R/C/U (próprias) | R | R/U (moderação) | R/U | CRUD | CRUD |
| **Notification** | - | - | R/U (próprias) | R (próprias) | R/C | R/C/U | CRUD | CRUD |
| **Chat** | - | - | R/C (próprios) | R (relacionados) | R/C/U | R/C/U | CRUD | CRUD |
| **DeliveryDriver** | - | - | - | - | R/U (próprio) | R/U | CRUD | CRUD |
| **DeliveryZone** | - | - | - | R | R | R/U | CRUD | CRUD |
| **Setting** | R (públicas) | R (públicas) | R (públicas) | R (operacionais) | R | R/U | R/U | CRUD |
| **User** | - | R (próprio) | R/U (próprio) | R (básico) | R | R/U (subordinados) | CRUD (nível inferior) | CRUD |

**Legenda:**
- **R**: Read (Leitura)
- **C**: Create (Criação)  
- **U**: Update (Atualização)
- **D**: Delete (Exclusão)
- **CRUD**: Create, Read, Update, Delete (Acesso completo)

---

## 🔌 **APIs Customizadas e Permissões**

### **Users-Permissions APIs**
- `GET /api/users/profile` - Todos os usuários autenticados
- `GET /api/users/orders` - Todos os usuários autenticados

### **Order APIs**
- `GET /api/orders/for-customer/:id` - Customer, Staff+
- `GET /api/orders/for-driver/:id` - Delivery Driver, Staff+
- `POST /api/orders/accept/:id` - Delivery Driver
- `PUT /api/orders/status/:id` - Delivery Driver, Kitchen Staff+
- `GET /api/orders/track/:trackingNumber` - Public (com token válido)

### **Payment APIs**
- `GET /api/payments/customer` - Customer (próprios), Staff+

### **Delivery Driver APIs**
- `GET /api/delivery-drivers/profile` - Delivery Driver
- `GET /api/delivery-drivers/available-orders` - Delivery Driver
- `GET /api/delivery-drivers/my-deliveries` - Delivery Driver

---

## ⚙️ **Implementação**

### **Middleware de Autorização**
```typescript
// Exemplo de middleware
const authorize = (roles: string[], options?: AuthOptions) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    
    if (!user) {
      return ctx.unauthorized('Authentication required');
    }
    
    if (!roles.includes(user.role.type)) {
      return ctx.forbidden('Insufficient permissions');
    }
    
    await next();
  };
};
```

### **Verificação Hierárquica**
```typescript
const roleHierarchy = {
  public: 0,
  authenticated: 1,
  customer: 2,
  vip_customer: 2,
  employee: 3,
  delivery_driver: 3,
  kitchen_staff: 4,
  cashier: 4,
  chat_operator: 4,
  support_agent: 4,
  analyst: 5,
  accountant: 5,
  delivery_manager: 5,
  manager: 6,
  admin: 7,
  developer: 8,
  super_admin: 9,
  supreme_master: 10
};

const hasPermission = (userRole: string, requiredRole: string) => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
```

### **Políticas de Segurança**

1. **Princípio do Menor Privilégio**: Usuários recebem apenas as permissões mínimas necessárias
2. **Segregação de Responsabilidades**: Funções críticas exigem múltiplas aprovações
3. **Auditoria Completa**: Todas as ações são logadas com timestamp e usuário
4. **Rotação de Permissões**: Revisão periódica de acessos
5. **Rate Limiting**: Controle de taxa de requisições por função

### **Logs de Auditoria**
- Todas as operações CRUD são logadas
- Include: usuário, ação, resource, timestamp, IP
- Retenção: 2 anos para dados críticos, 6 meses para operacionais

---

## 🔄 **Manutenção e Evolução**

### **Versionamento de Permissões**
- Todas as mudanças de permissão são versionadas
- Rollback disponível para versões anteriores
- Testes automatizados para validação

### **Monitoramento**
- Alertas para tentativas de acesso negado
- Relatórios de uso por função
- Análise de padrões suspeitos

### **Revisão Periódica**
- **Mensal**: Revisão de acessos por equipe
- **Trimestral**: Análise de logs e padrões
- **Anual**: Revisão completa da estrutura RBAC

---

**Documento criado em:** Dezembro 2024  
**Versão:** 1.0  
**Última atualização:** Dezembro 2024  
**Responsável:** Equipe de Desenvolvimento Sellvex Eats
