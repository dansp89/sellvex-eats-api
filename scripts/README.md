# 🍕 Script de Populate - Sellvex Eats (Manaus)

Script completo para popular o banco de dados do Sellvex Eats com dados de teste realistas focados em **Manaus** e na culinária amazônica.

## 📋 Pré-requisitos

1. **Servidor Strapi rodando** na porta 4010
2. **Permissões configuradas** no Strapi Admin
3. **Dependências instaladas**: `bun install`

## 🔧 Configuração de Permissões

Antes de executar o script, configure as permissões no Strapi Admin:

1. Acesse: `http://localhost:4010/admin`
2. Vá em **Settings > Users & Permissions Plugin > Roles**
3. Edite a role **Public**:
   - ✅ **Category**: `create`, `find`, `findOne`
   - ✅ **Product**: `create`, `find`, `findOne`
   - ✅ **Ingredient**: `create`, `find`, `findOne`
   - ✅ **Delivery-zone**: `create`, `find`, `findOne`
   - ✅ **Review**: `create`, `find`, `findOne`
   - ✅ **Payment**: `create`, `find`, `findOne`

4. Edite a role **Authenticated**:
   - ✅ **Customer**: `create`, `find`, `findOne`, `update`
   - ✅ **Delivery-driver**: `create`, `find`, `findOne`, `update`
   - ✅ **Order**: `create`, `find`, `findOne`, `update`
   - ✅ **Notification**: `create`, `find`, `findOne`, `update`
   - ✅ **Users-permissions > User**: `create`

## 🚀 Como Usar

### Opções Disponíveis

```bash
bun populate --help
```

### Execução Básica (Recomendada)

```bash
# Criar dados padrão
bun populate

# Limpar dados existentes e criar novos
bun populate --clear

# Personalizar quantidades
bun populate -u 30 -o 100 -r 50 -p 60 -n 40
```

### Opções Detalhadas

| Opção | Descrição | Padrão |
|-------|-----------|--------|
| `-c, --clear` | Limpar todos os dados antes de popular | - |
| `-u, --users <number>` | Número de usuários para criar | 20 |
| `-o, --orders <number>` | Número de pedidos para criar | 50 |
| `-r, --reviews <number>` | Número de avaliações para criar | 30 |
| `-p, --payments <number>` | Número de pagamentos para criar | 40 |
| `-n, --notifications <number>` | Número de notificações para criar | 25 |

## 📊 Dados Criados

O script cria uma base completa e realista:

### 🏪 **Dados Base** (sempre criados)
- **10 Categorias**: Hambúrgueres, Pizzas, Comida Amazônica, Peixes Regionais, Açaí & Guaraná, etc.
- **22 Produtos**: Pratos realistas amazônicos com preços e descrições
- **10 Ingredientes**: Alimentos regionais (tucumã, tambaqui, açaí, castanha-do-pará)
- **5 Zonas de Entrega**: Regiões de Manaus com taxas

### 👥 **Usuários e Perfis** (customizável)
- **Usuários**: Com emails e senhas válidos
- **Clientes** (80% dos usuários): Com histórico e preferências
- **Entregadores** (10% dos usuários): Com veículos e status

### 📦 **Transações** (customizável)
- **Pedidos**: Com produtos, valores e status realistas
- **Avaliações**: Comentários e notas de 3-5 estrelas
- **Pagamentos**: Métodos variados (PIX, cartão, dinheiro)
- **Notificações**: Para clientes e entregadores

## 🎯 Exemplos de Uso

### Desenvolvimento Local
```bash
# Setup inicial com poucos dados
bun populate -u 10 -o 20 -r 15 -p 15 -n 10
```

### Testes de Performance
```bash
# Muitos dados para testar performance
bun populate -u 100 -o 500 -r 200 -p 300 -n 150
```

### Reset Completo
```bash
# Limpar tudo e recriar
bun populate --clear -u 50 -o 100
```

## 📝 Dados Gerados

### 🐟 **Produtos Amazônicos Realistas**
- Tambaqui na Brasa (R$ 52,90)
- Pizza Tambaqui (R$ 48,90)
- Tacacá Tradicional (R$ 15,90)
- Açaí Especial 700ml (R$ 18,90)
- Burger Tucumã (R$ 24,50)

### 👤 **Perfis Brasileiros (Manaus)**
- Nomes: Ana Silva, Carlos Santos, Maria Oliveira
- Emails: ana.silva123@gmail.com
- Telefones: (92) 9xxxx-xxxx
- Endereços: Bairros de Manaus

### 📍 **Zonas Realistas de Manaus**
- Centro e Adjacências (Taxa: R$ 4,00)
- Zona Sul Premium (Taxa: R$ 6,00)
- Zona Norte (Taxa: R$ 8,00)

## 🔍 Testando os Dados

Após executar o populate, teste as APIs:

```bash
# Listar categorias
curl "http://localhost:4010/api/categories/public"

# Listar produtos
curl "http://localhost:4010/api/products/public?page=1&pageSize=5"

# Rastrear pedido (use um orderNumber real)
curl "http://localhost:4010/api/orders/public/tracking/ORD-1234567890-1"
```

## 🐛 Resolução de Problemas

### Erro de Conexão
```
❌ Unable to connect. Is the computer able to access the url?
```
**Solução**: Verifique se o Strapi está rodando em `http://localhost:4010`

### Erro 403 Forbidden
```
❌ ForbiddenError: Forbidden
```
**Solução**: Configure as permissões no Strapi Admin (ver seção "Configuração de Permissões")

### Erro de Autenticação
```
⚠️ Não foi possível autenticar. Continuando sem token...
```
**Solução**: Isso é normal para dados públicos. Para dados privados, crie um usuário admin primeiro.

### Arrays Vazios
```
⚠️ Categoria não encontrada: Hambúrgueres
```
**Solução**: Execute com `--clear` para garantir ordem correta de criação.

## 💡 Dicas

1. **Execute sempre com `--clear`** na primeira vez
2. **Configure as permissões** antes de executar
3. **Use números menores** durante desenvolvimento
4. **Monitore os logs** para identificar problemas
5. **Teste as APIs** após cada execução

## 🎊 Resultado Final

Com o populate completo, você terá:
- ✅ Sistema funcional de delivery
- ✅ Dados realistas e consistentes
- ✅ APIs prontas para testar
- ✅ Frontend com dados para exibir
- ✅ Fluxo completo cliente → entregador
