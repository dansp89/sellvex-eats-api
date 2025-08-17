# 🚀 PROMPT PARA SELLVEX EATS - NUXT.JS + MONGODB

## 📋 BRIEFING DO PROJETO

Crie um **sistema completo de delivery de comida** chamado **Sellvex Eats** usando **Nuxt.js 3** como frontend/fullstack e **MongoDB** como banco de dados. O sistema deve ser 100% funcional e profissional.

## 🎯 FUNCIONALIDADES PRINCIPAIS

### 🛒 **Core Delivery**
- Sistema completo de pedidos online
- Carrinho de compras dinâmico
- Sistema de pagamentos integrado
- Rastreamento de pedidos em tempo real
- Gestão de delivery e entregadores
- Sistema de cupons e promoções

### 👥 **Gestão de Usuários**
- **Clientes**: Cadastro, perfil, endereços, histórico
- **Entregadores**: Perfil, documentos, zonas de entrega
- **Funcionários**: Diferentes níveis de acesso
- **Administradores**: Controle total do sistema

### 🍕 **Gestão de Produtos**
- Catálogo de produtos com categorias
- Sistema de ingredientes e customizações
- Combos e produtos relacionados
- Controle de estoque e fornecedores
- Lista de desejos e favoritos

### 📊 **Business Intelligence**
- Dashboard de analytics completo
- Relatórios de vendas e performance
- Gestão financeira e impostos
- Controle de funcionários e turnos
- Sistema de fidelidade e pontos

### 💬 **Comunicação**
- Chat em tempo real (cliente-suporte)
- Sistema de notificações
- Newsletter e marketing
- FAQ e tickets de suporte

## 🗂️ ESTRUTURA DE DADOS (MONGODB COLLECTIONS)

### 🏪 **Core Business**
```javascript
// Categories
{
  name: String,
  description: String,
  image: String,
  isActive: Boolean,
  sortOrder: Number,
  taxConfigurations: [ObjectId] // ref: TaxConfiguration
}

// Products
{
  name: String,
  description: String,
  images: [String],
  price: Number,
  category: ObjectId, // ref: Category
  ingredients: [ObjectId], // ref: Ingredient
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    sodium: Number
  },
  isActive: Boolean,
  preparationTime: Number,
  customizations: [String],
  addons: [String],
  sizes: [String],
  cost: Number,
  profitMargin: Number,
  lastRestocked: Date
}

// Orders
{
  customer: ObjectId, // ref: Customer
  items: [{
    product: ObjectId, // ref: Product
    quantity: Number,
    price: Number,
    customizations: [String],
    addons: [String],
    notes: String
  }],
  status: String, // enum: pending, confirmed, preparing, ready, delivering, delivered, cancelled
  totalAmount: Number,
  deliveryFee: Number,
  discount: Number,
  finalAmount: Number,
  deliveryAddress: {
    street: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: [Number] // [lng, lat]
  },
  billingAddress: { /* same as deliveryAddress */ },
  deliveryDriver: ObjectId, // ref: DeliveryDriver
  branch: ObjectId, // ref: StoreBranch
  payment: ObjectId, // ref: Payment
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  kitchenNotes: String,
  pointsEarned: Number,
  pointsRedeemed: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 👤 **User Management**
```javascript
// Customers
{
  name: String,
  email: String,
  phone: String,
  cpf: String,
  birthDate: Date,
  addresses: [{
    name: String, // casa, trabalho, etc
    street: String,
    number: String,
    complement: String,
    neighborhood: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: [Number],
    isDefault: Boolean
  }],
  loyaltyPoints: Number,
  totalOrders: Number,
  totalSpent: Number,
  lastOrderDate: Date,
  communicationPreferences: {
    email: Boolean,
    sms: Boolean,
    push: Boolean
  },
  deliveryPreferences: {
    defaultTip: Number,
    specialInstructions: String
  },
  isActive: Boolean
}

// DeliveryDrivers
{
  name: String,
  email: String,
  phone: String,
  cpf: String,
  cnh: String,
  vehicle: {
    type: String, // bike, motorcycle, car
    model: String,
    plate: String,
    color: String
  },
  workingZones: [ObjectId], // ref: DeliveryZone
  status: String, // available, busy, offline
  currentLocation: [Number], // [lng, lat]
  rating: Number,
  totalDeliveries: Number,
  documentsVerified: Boolean,
  backgroundCheckDate: Date,
  contractStartDate: Date,
  contractEndDate: Date,
  isActive: Boolean
}

// Employees
{
  name: String,
  email: String,
  cpf: String,
  position: String, // chef, cashier, manager, etc
  department: String,
  salary: Number,
  hireDate: Date,
  permissions: [String],
  branch: ObjectId, // ref: StoreBranch
  isActive: Boolean
}
```

### 📦 **Inventory & Business**
```javascript
// Inventory
{
  ingredient: ObjectId, // ref: Ingredient
  currentStock: Number,
  minimumStock: Number,
  unit: String,
  cost: Number,
  supplier: ObjectId, // ref: Supplier
  expirationDate: Date,
  lastUpdated: Date
}

// Suppliers
{
  name: String,
  contact: {
    email: String,
    phone: String,
    address: { /* address object */ }
  },
  products: [String],
  paymentTerms: String, // days_15, days_30, etc
  rating: Number,
  isActive: Boolean
}

// StoreBranches
{
  name: String,
  address: { /* address object */ },
  phone: String,
  businessHours: [{
    dayOfWeek: Number, // 0-6
    openTime: String,
    closeTime: String,
    isOpen: Boolean
  }],
  manager: ObjectId, // ref: Employee
  isActive: Boolean
}
```

### 💰 **Financial & Marketing**
```javascript
// Payments
{
  order: ObjectId, // ref: Order
  method: String, // credit_card, debit_card, pix, cash
  amount: Number,
  status: String, // pending, completed, failed, refunded
  transactionId: String,
  processedAt: Date
}

// Coupons
{
  code: String,
  type: String, // percentage, fixed
  value: Number,
  minimumOrder: Number,
  maxUses: Number,
  usedCount: Number,
  validFrom: Date,
  validUntil: Date,
  isActive: Boolean
}

// LoyaltyPrograms
{
  name: String,
  pointsPerReal: Number,
  redemptionRate: Number, // pontos por real de desconto
  isActive: Boolean
}
```

## 🔧 STACK TECNOLÓGICO

### 🎨 **Frontend/Fullstack**
- **Nuxt.js 3** (Vue.js 3, TypeScript)
- **Tailwind CSS** + **HeadlessUI**
- **Pinia** (State Management)
- **VueUse** (Composition utilities)

### 🗄️ **Backend/Database**
- **MongoDB** com **Mongoose**
- **Nuxt Server API** (Nitro)
- **JWT** para autenticação
- **Multer** para upload de arquivos

### 🚀 **Features Avançadas**
- **Socket.io** para real-time (chat, tracking)
- **PWA** (Progressive Web App)
- **Push Notifications**
- **Google Maps API** (geolocalização)
- **Payment Gateway** (Stripe/Mercado Pago)

## 📱 INTERFACES NECESSÁRIAS

### 🛒 **App Cliente (Web/Mobile)**
1. **Home** - Banner, categorias, produtos em destaque
2. **Produtos** - Listagem, filtros, busca
3. **Produto** - Detalhes, customizações, reviews
4. **Carrinho** - Itens, cupons, endereço
5. **Checkout** - Pagamento, confirmação
6. **Pedidos** - Histórico, tracking em tempo real
7. **Perfil** - Dados, endereços, favoritos
8. **Chat** - Suporte em tempo real

### 🚚 **App Entregador**
1. **Dashboard** - Pedidos disponíveis, status
2. **Pedido** - Detalhes, navegação GPS
3. **Perfil** - Dados, documentos, estatísticas
4. **Histórico** - Entregas realizadas, ganhos

### 🏪 **Admin Dashboard**
1. **Overview** - Métricas principais, gráficos
2. **Pedidos** - Gestão em tempo real
3. **Produtos** - CRUD completo, estoque
4. **Clientes** - Perfis, histórico, suporte
5. **Entregadores** - Gestão, documentos, zonas
6. **Financeiro** - Relatórios, pagamentos
7. **Marketing** - Cupons, campanhas, analytics
8. **Configurações** - Sistema, usuários, integrações

## 🎯 ROLES E PERMISSÕES

### 🔐 **Sistema de Roles**
```javascript
const roles = [
  // Administrativas
  'super_admin',    // Acesso total
  'admin',          // Admin da loja
  'manager',        // Gerente operacional
  
  // Operacionais
  'employee',       // Funcionário
  'kitchen_staff',  // Cozinha
  'cashier',        // Caixa
  
  // Logística
  'delivery_driver', // Entregador
  'delivery_manager', // Coordenador
  
  // Atendimento
  'support_agent',   // Suporte
  'chat_operator',   // Chat
  
  // Clientes
  'customer',        // Cliente
  'vip_customer',    // VIP
  
  // Analytics
  'analyst',         // Analista
  'accountant',      // Financeiro
  
  // Técnicas
  'developer',       // Dev
  'api_user'        // API externa
];
```

## 🚀 IMPLEMENTAÇÃO

### 📋 **Ordem de Desenvolvimento**
1. **Setup** - Nuxt 3 + MongoDB + Mongoose
2. **Auth** - Sistema de autenticação JWT
3. **Models** - Schemas do MongoDB
4. **API** - Endpoints RESTful
5. **Admin** - Dashboard administrativo
6. **Store** - Loja online para clientes
7. **Delivery** - App para entregadores
8. **Real-time** - Socket.io (chat, tracking)
9. **Payments** - Integração pagamentos
10. **PWA** - Service workers, offline
11. **Deploy** - Docker + Cloud

### 🎨 **Design System**
- **Cores**: Primária (laranja/vermelho), Secundária (verde), Neutras
- **Tipografia**: Inter ou similar
- **Componentes**: Reutilizáveis e acessíveis
- **Responsivo**: Mobile-first
- **Dark Mode**: Suporte completo

## ✅ REQUISITOS TÉCNICOS

### 🔒 **Segurança**
- Hash de senhas (bcrypt)
- Rate limiting
- CORS configurado
- Validação de inputs
- Sanitização de dados
- Headers de segurança

### 📈 **Performance**
- Lazy loading
- Image optimization
- Cache strategies
- Database indexing
- Code splitting
- Bundle optimization

### 🧪 **Qualidade**
- TypeScript strict
- ESLint + Prettier
- Testes unitários (Vitest)
- Testes E2E (Playwright)
- Documentação API
- Git hooks (Husky)

---

## 🎯 **PROMPT FINAL**

**"Crie um sistema completo de delivery chamado Sellvex Eats usando Nuxt.js 3 e MongoDB. Implemente todas as funcionalidades listadas acima com código limpo, typescript, tailwind CSS, e arquitetura escalável. O sistema deve ter app cliente, app entregador, e dashboard admin, todos responsivos e funcionais. Inclua autenticação JWT, real-time com socket.io, integração com pagamentos, e sistema completo de roles. Documente tudo e faça deploy-ready."**

---

🚀 **Use este prompt em qualquer IA para recriar o projeto completo!**
