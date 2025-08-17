#!/usr/bin/env bun

import { Command } from 'commander';
import axios, { AxiosResponse } from 'axios';

// Configurações
const API_BASE_URL = 'http://localhost:4010/api';
const program = new Command();

// ==================== INTERFACES E TIPOS ====================

interface PopulateOptions {
  clear?: boolean;
  users?: number;
  categories?: number;
  products?: number;
  orders?: number;
  reviews?: number;
  payments?: number;
  notifications?: number;
  ingredients?: number;
  zones?: number;
  drivers?: number;
  settings?: boolean;
}

interface StrapiResponse<T = any> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiErrorResponse {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, any>;
  };
}

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface CategoryData {
  name: string;
  description: string;
  isActive?: boolean;
  order?: number;
  publishedAt?: string;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  preparationTime?: number;
  isAvailable?: boolean;
  category?: number;
  publishedAt?: string;
}

interface IngredientData {
  name: string;
  description: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
  unitOfMeasure?: string;
  price?: number;
  hasAllergens?: boolean;
  allergens?: string;
  publishedAt?: string;
}

interface Address {
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
}

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmed?: boolean;
  blocked?: boolean;
}

interface CustomerData {
  name: string;
  phone: string;
  birthDate?: string;
  preferences?: string[];
  user?: number;
  addresses?: Address[];
  publishedAt?: string;
}

interface DeliveryDriverData {
  name: string;
  phone: string;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  vehiclePlate?: string;
  isAvailable?: boolean;
  user?: number;
  publishedAt?: string;
}

interface OrderItemData {
  product: number;
  quantity: number;
  price: number;
  notes?: string;
}

interface OrderItemExtended extends OrderItemData {
  name?: string;
  subtotal?: number;
}

interface OrderData {
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  deliveryFee: number;
  paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'cash';
  items: OrderItemData[];
  customer?: number;
  deliveryDriver?: number;
  deliveryAddress?: Address;
  estimatedDeliveryTime?: number;
  publishedAt?: string;
}

interface ReviewData {
  rating: number;
  comment?: string;
  customer?: number;
  product?: number;
  publishedAt?: string;
}

interface PaymentData {
  amount: number;
  method: 'credit_card' | 'debit_card' | 'pix' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  customer?: number;
  publishedAt?: string;
}

interface NotificationData {
  title: string;
  message: string;
  type: 'order_update' | 'promotion' | 'system' | 'delivery';
  isRead?: boolean;
  customer?: number;
  deliveryDriver?: number;
  publishedAt?: string;
}

interface DeliveryZoneData {
  name: string;
  description?: string;
  neighborhoods: string[];
  deliveryFee: number;
  freeThreshold?: number;
  isActive?: boolean;
  publishedAt?: string;
}

interface FoodCategory {
  name: string;
  description: string;
}

interface FoodProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  preparationTime: number;
}

interface Ingredient {
  name: string;
  description: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  calories: number;
  unitOfMeasure: string;
  price: number;
  hasAllergens?: boolean;
  allergens?: string;
}

interface DeliveryZone {
  name: string;
  neighborhoods: string[];
  deliveryFee: number;
  freeThreshold: number;
}

interface BrazilianNames {
  first: string[];
  last: string[];
}

// ==================== DADOS MOCK ====================

const FOOD_CATEGORIES: FoodCategory[] = [
  { name: 'Hambúrgueres', description: 'Deliciosos hambúrgueres artesanais com ingredientes frescos e selecionados' },
  { name: 'Pizzas', description: 'Pizzas tradicionais e especiais assadas em forno à lenha' },
  { name: 'Comida Amazônica', description: 'Pratos típicos da região amazônica com peixes frescos e ingredientes locais' },
  { name: 'Peixes Regionais', description: 'Tambaqui, pirarucu, surubim e outros peixes amazônicos frescos' },
  { name: 'Açaí & Guaraná', description: 'Açaí puro amazônico e guaraná natural da região' },
  { name: 'Sobremesas', description: 'Doces regionais e sobremesas com frutas amazônicas' },
  { name: 'Bebidas', description: 'Sucos de frutas regionais, guaraná natural e bebidas geladas' },
  { name: 'Lanches', description: 'Lanches rápidos e saborosos para qualquer hora' },
  { name: 'Comida Brasileira', description: 'Pratos típicos da culinária brasileira com tempero caseiro' },
  { name: 'Vegetariana', description: 'Opções deliciosas com ingredientes regionais para vegetarianos' },
];

const FOOD_PRODUCTS: FoodProduct[] = [
  // Hambúrgueres
  { name: 'Big Burger Clássico', description: 'Hambúrguer de 180g, queijo, alface, tomate, cebola e molho especial', price: 18.90, category: 'Hambúrgueres', preparationTime: 15 },
  { name: 'Burger Tucumã', description: 'Hambúrguer especial com tucumã, queijo coalho e molho de pimenta baniwa', price: 24.50, category: 'Hambúrgueres', preparationTime: 18 },
  { name: 'Veggie Burger Amazônico', description: 'Hambúrguer vegetariano com quinoa, castanha-do-pará e vegetais regionais', price: 19.90, category: 'Hambúrgueres', preparationTime: 12 },
  
  // Pizzas
  { name: 'Pizza Margherita', description: 'Molho de tomate, mussarela, manjericão fresco e azeite extravirgem', price: 35.90, category: 'Pizzas', preparationTime: 25 },
  { name: 'Pizza Tambaqui', description: 'Tambaqui defumado, cebola roxa, tomate cereja e molho de tucumã', price: 48.90, category: 'Pizzas', preparationTime: 30 },
  { name: 'Pizza Cupuaçu com Queijo', description: 'Molho de cupuaçu, mussarela, queijo coalho e castanha-do-pará', price: 42.90, category: 'Pizzas', preparationTime: 25 },
  
  // Comida Amazônica
  { name: 'Tambaqui na Brasa', description: 'Tambaqui grelhado com molho de tucumã, farofa de banana e salada verde', price: 52.90, category: 'Comida Amazônica', preparationTime: 35 },
  { name: 'Tacacá Tradicional', description: 'Sopa típica com tucumã, camarão seco, jambu e caldo de mandioca', price: 15.90, category: 'Comida Amazônica', preparationTime: 10 },
  { name: 'Paca no Tucumã', description: 'Carne de paca refogada com tucumã, acompanha arroz e pirão', price: 45.90, category: 'Comida Amazônica', preparationTime: 40 },
  
  // Peixes Regionais
  { name: 'Pirarucu Grelhado', description: 'Pirarucu fresco grelhado com legumes da região e molho de maracujá', price: 48.90, category: 'Peixes Regionais', preparationTime: 30 },
  { name: 'Surubim Assado', description: 'Surubim assado com crosta de castanha e acompanhamentos regionais', price: 42.90, category: 'Peixes Regionais', preparationTime: 35 },
  
  // Açaí & Guaraná
  { name: 'Açaí Tradicional 500ml', description: 'Açaí puro amazônico com granola, banana e mel da região', price: 12.90, category: 'Açaí & Guaraná', preparationTime: 5 },
  { name: 'Açaí Especial 700ml', description: 'Açaí com frutas regionais, castanha-do-pará e tapioca crocante', price: 18.90, category: 'Açaí & Guaraná', preparationTime: 8 },
  { name: 'Guaraná Natural 300ml', description: 'Guaraná natural da Amazônia, sem conservantes nem açúcar', price: 8.90, category: 'Açaí & Guaraná', preparationTime: 2 },
  
  // Sobremesas
  { name: 'Sorvete de Cupuaçu', description: 'Sorvete artesanal de cupuaçu com pedaços da fruta amazônica', price: 15.90, category: 'Sobremesas', preparationTime: 3 },
  { name: 'Beijinho de Coco Babaçu', description: 'Doce tradicional feito com coco babaçu da região Norte', price: 12.90, category: 'Sobremesas', preparationTime: 2 },
  { name: 'Pudim de Tapioca', description: 'Pudim cremoso de tapioca com calda de açaí', price: 14.90, category: 'Sobremesas', preparationTime: 5 },
  
  // Bebidas
  { name: 'Suco de Caju Amazônico', description: 'Suco natural de caju da região, refrescante e nutritivo (500ml)', price: 9.90, category: 'Bebidas', preparationTime: 3 },
  { name: 'Suco de Cupuaçu', description: 'Suco da fruta típica amazônica, rico em vitaminas (400ml)', price: 11.90, category: 'Bebidas', preparationTime: 4 },
  { name: 'Refrigerante Guaraná', description: 'Guaraná Antarctica ou Kuat regional (350ml)', price: 4.50, category: 'Bebidas', preparationTime: 1 },
  
  // Comida Brasileira
  { name: 'Feijoada Amazônica', description: 'Feijoada com ingredientes regionais, arroz, farofa de mandioca e couve', price: 38.90, category: 'Comida Brasileira', preparationTime: 45 },
  { name: 'Caldeirada de Tambaqui', description: 'Ensopado de tambaqui com legumes, leite de coco e cheiro verde', price: 35.90, category: 'Comida Brasileira', preparationTime: 30 },
];

const INGREDIENTS: Ingredient[] = [
  { name: 'Tucumã', description: 'Fruto amazônico rico em vitaminas e fibras', isVegan: true, isVegetarian: true, isGlutenFree: true, calories: 165, unitOfMeasure: '100g', price: 8.00 },
  { name: 'Tambaqui', description: 'Peixe amazônico fresco, rico em proteínas', isGlutenFree: true, calories: 140, unitOfMeasure: '100g', price: 25.00 },
  { name: 'Castanha-do-Pará', description: 'Castanha amazônica rica em selênio', isVegan: true, isVegetarian: true, isGlutenFree: true, calories: 656, unitOfMeasure: '100g', price: 15.00 },
  { name: 'Açaí', description: 'Polpa de açaí pura da Amazônia', isVegan: true, isVegetarian: true, isGlutenFree: true, calories: 58, unitOfMeasure: '100g', price: 12.00 },
  { name: 'Pirarucu', description: 'Peixe gigante amazônico, baixo em gordura', isGlutenFree: true, calories: 105, unitOfMeasure: '100g', price: 35.00 },
  { name: 'Cupuaçu', description: 'Fruta amazônica prima do cacau', isVegan: true, isVegetarian: true, isGlutenFree: true, calories: 49, unitOfMeasure: '100g', price: 10.00 },
  { name: 'Guaraná', description: 'Fruto energético nativo da Amazônia', isVegan: true, isVegetarian: true, isGlutenFree: true, calories: 26, unitOfMeasure: '100g', price: 20.00 },
  { name: 'Jambu', description: 'Erva típica amazônica com propriedades anestésicas', isVegan: true, isVegetarian: true, isGlutenFree: true, calories: 15, unitOfMeasure: '100g', price: 12.00 },
  { name: 'Queijo Coalho', description: 'Queijo regional do Norte, ideal para grelhados', isVegetarian: true, isGlutenFree: true, calories: 330, unitOfMeasure: '100g', price: 18.00 },
  { name: 'Mandioca', description: 'Raiz amazônica, base da alimentação regional', isVegan: true, isVegetarian: true, isGlutenFree: true, calories: 160, unitOfMeasure: '100g', price: 3.50 },
];

const BRAZILIAN_NAMES: BrazilianNames = {
  first: ['Ana', 'Carlos', 'Maria', 'José', 'Pedro', 'Fernanda', 'Rafael', 'Juliana', 'André', 'Camila', 'Lucas', 'Beatriz', 'Bruno', 'Amanda', 'Felipe', 'Larissa', 'Gustavo', 'Priscila', 'Rodrigo', 'Tatiana'],
  last: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Rodrigues', 'Almeida', 'Nascimento', 'Lima', 'Araújo', 'Fernandes', 'Carvalho', 'Gomes', 'Martins', 'Rocha', 'Ribeiro', 'Alves', 'Monteiro', 'Mendes']
};

const MANAUS_NEIGHBORHOODS: string[] = [
  'Centro', 'Adrianópolis', 'Nossa Senhora das Graças', 'Chapada', 'Vieiralves', 'Flores', 'Parque 10 de Novembro', 'Aleixo', 'Petrópolis', 'Dom Pedro',
  'Cidade Nova', 'Novo Israel', 'Compensa', 'Santo Antônio', 'São Raimundo', 'Educandos', 'Santa Luzia', 'Morro da Liberdade', 'Betânia', 'Coroado'
];

const DELIVERY_ZONES: DeliveryZone[] = [
  { name: 'Centro e Adjacências', neighborhoods: ['Centro', 'Educandos', 'Santa Luzia', 'Morro da Liberdade'], deliveryFee: 4.00, freeThreshold: 40.00 },
  { name: 'Zona Sul Premium', neighborhoods: ['Adrianópolis', 'Nossa Senhora das Graças', 'Chapada', 'Vieiralves'], deliveryFee: 6.00, freeThreshold: 55.00 },
  { name: 'Zona Centro-Sul', neighborhoods: ['Flores', 'Parque 10 de Novembro', 'Aleixo', 'Petrópolis'], deliveryFee: 5.50, freeThreshold: 45.00 },
  { name: 'Zona Norte', neighborhoods: ['Cidade Nova', 'Novo Israel', 'Santo Antônio', 'São Raimundo'], deliveryFee: 8.00, freeThreshold: 35.00 },
  { name: 'Zona Oeste', neighborhoods: ['Compensa', 'Dom Pedro', 'Betânia', 'Coroado'], deliveryFee: 7.50, freeThreshold: 40.00 },
];

// ==================== FUNÇÕES UTILITÁRIAS ====================
const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
const getRandomFloat = (min: number, max: number): number => Math.round((Math.random() * (max - min) + min) * 100) / 100;
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomBool = (probability: number = 0.5): boolean => Math.random() < probability;

const generateRandomName = (): string => {
  const first = getRandomItem(BRAZILIAN_NAMES.first);
  const last = getRandomItem(BRAZILIAN_NAMES.last);
  return `${first} ${last}`;
};

const generateRandomEmail = (name: string): string => {
  const cleanName = name.toLowerCase()
    .replace(/\s+/g, '.')
    .replace(/[áàâãä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9.]/g, '');
  const domains: string[] = ['gmail.com', 'hotmail.com', 'yahoo.com.br', 'outlook.com', 'uol.com.br'];
  return `${cleanName}${getRandomInt(1, 999)}@${getRandomItem(domains)}`;
};

const generateRandomPhone = (): string => {
  return `(92) 9${getRandomInt(1000, 9999)}-${getRandomInt(1000, 9999)}`;
};

const generateRandomAddress = (): Address => {
  const streets: string[] = ['Rua Eduardo Ribeiro', 'Av. Djalma Batista', 'Av. Constantino Nery', 'Rua José Paranaguá', 'Av. Torquato Tapajós', 'Av. Rodrigo Otávio', 'Av. André Araújo'];
  return {
    street: getRandomItem(streets),
    number: getRandomInt(1, 9999).toString(),
    complement: getRandomBool(0.3) ? `Apt ${getRandomInt(1, 200)}` : null,
    neighborhood: getRandomItem(MANAUS_NEIGHBORHOODS),
    city: 'Manaus',
    state: 'AM',
    zipCode: `69${getRandomInt(100, 999)}-${getRandomInt(100, 999)}`,
    country: 'Brasil',
    coordinates: {
      lat: getRandomFloat(-3.2, -2.9),
      lng: getRandomFloat(-60.2, -59.8)
    },
    isDefault: true
  };
};

// Cliente Strapi
class StrapiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async authenticate(): Promise<void> {
    try {
      // Tentar fazer login como admin (supondo credenciais padrão)
      const response = await axios.post(`${this.baseURL}/auth/local`, {
        identifier: 'admin@sellvex.com',
        password: 'Admin123!'
      });
      this.token = response.data.jwt;
      console.log('✅ Autenticado com sucesso');
    } catch (error) {
      console.warn('⚠️ Não foi possível autenticar. Continuando sem token...');
    }
  }

  private getHeaders(): Record<string, string> {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async create<T = any>(endpoint: string, data: T): Promise<StrapiResponse<T>> {
    try {
      const response = await axios.post(`${this.baseURL}${endpoint}`, { data }, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`❌ Erro ao criar ${endpoint}:`, error.response?.data || error.message);
      }
      throw error;
    }
  }

  async findAll<T = any>(endpoint: string): Promise<T[]> {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        headers: this.getHeaders()
      });
      return response.data.data || [];
    } catch (error) {
      console.error(`❌ Erro ao buscar ${endpoint}:`, error);
      return [];
    }
  }

  async deleteAll(endpoint: string): Promise<void> {
    try {
      const items = await this.findAll(endpoint);
      console.log(`🗑️ Deletando ${items.length} itens de ${endpoint}...`);
      
      for (const item of items) {
        await axios.delete(`${this.baseURL}${endpoint}/${item.id}`, {
          headers: this.getHeaders()
        });
      }
      console.log(`✅ ${items.length} itens deletados de ${endpoint}`);
    } catch (error) {
      console.error(`❌ Erro ao deletar ${endpoint}:`, error);
    }
  }
}

// Classe para Popular dados
// ==================== SERVIÇO DE POPULATE ====================

class PopulateService {
  private client: StrapiClient;

  constructor(client: StrapiClient) {
    this.client = client;
  }

  async createUsers(count: number): Promise<StrapiResponse<UserData>[]> {
    console.log(`👥 Criando ${count} usuários...`);
    const users: StrapiResponse<UserData>[] = [];

    for (let i = 0; i < count; i++) {
      const name = generateRandomName();
      const userData = {
        username: name.toLowerCase().replace(/\s+/g, '.') + i,
        email: generateRandomEmail(name),
        password: 'User123!',
        confirmed: true,
        blocked: false
      };

      try {
        const user = await this.client.create('/auth/local/register', userData);
        users.push(user);
        console.log(`✅ Usuário criado: ${userData.email}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar usuário ${userData.email}`);
      }
    }

    return users;
  }

  async createCategories(): Promise<StrapiResponse<CategoryData>[]> {
    console.log(`📂 Criando categorias...`);
    const categories: StrapiResponse<CategoryData>[] = [];

    for (let i = 0; i < FOOD_CATEGORIES.length; i++) {
      const categoryData = {
        ...FOOD_CATEGORIES[i],
        isActive: true,
        order: i + 1,
        publishedAt: new Date().toISOString()
      };

      try {
        const category = await this.client.create('/categories', categoryData);
        categories.push(category);
        console.log(`✅ Categoria criada: ${categoryData.name}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar categoria ${categoryData.name}`);
      }
    }

    return categories;
  }

  async createIngredients(): Promise<StrapiResponse<IngredientData>[]> {
    console.log(`🥕 Criando ingredientes...`);
    const ingredients: StrapiResponse<IngredientData>[] = [];

    for (const ingredientData of INGREDIENTS) {
      const data = {
        ...ingredientData,
        isActive: true,
        publishedAt: new Date().toISOString()
      };

      try {
        const ingredient = await this.client.create('/ingredients', data);
        ingredients.push(ingredient);
        console.log(`✅ Ingrediente criado: ${data.name}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar ingrediente ${data.name}`);
      }
    }

    return ingredients;
  }

  async createProducts(categories: StrapiResponse<CategoryData>[]): Promise<StrapiResponse<ProductData>[]> {
    console.log(`🍕 Criando produtos...`);
    const products: StrapiResponse<ProductData>[] = [];

    for (const productData of FOOD_PRODUCTS) {
      const category = categories.find(c => c.data.name === productData.category);
      if (!category) {
        console.warn(`⚠️ Categoria não encontrada: ${productData.category}`);
        continue;
      }

      const data = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        preparationTime: productData.preparationTime,
        category: (category as any).id || (category.data as any).id,
        isActive: true,
        isFeatured: getRandomBool(0.3),
        publishedAt: new Date().toISOString()
      };

      try {
        const product = await this.client.create('/products', data);
        products.push(product);
        console.log(`✅ Produto criado: ${data.name}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar produto ${data.name}`);
      }
    }

    return products;
  }

  async createCustomers(users: any[]): Promise<any[]> {
    console.log(`👤 Criando clientes...`);
    const customers: any[] = [];

    for (const user of users.slice(0, Math.floor(users.length * 0.8))) {
      const customerData = {
        user: (user as any).id || (user as any).user?.id,
        phone: generateRandomPhone(),
        loyaltyPoints: getRandomInt(0, 500),
        totalSpent: getRandomFloat(0, 1000),
        totalOrders: getRandomInt(0, 20),
        preferences: {
          favoriteCategories: [getRandomItem(FOOD_CATEGORIES).name],
          dietaryRestrictions: getRandomBool(0.2) ? ['vegetarian'] : [],
          spicyTolerance: getRandomInt(1, 5)
        }
      };

      try {
        const customer = await this.client.create('/customers', customerData);
        customers.push(customer);
        console.log(`✅ Cliente criado para usuário: ${user.user.email}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar cliente para ${user.user.email}`);
      }
    }

    return customers;
  }

  async createDeliveryDrivers(users: any[]): Promise<any[]> {
    console.log(`🏍️ Criando entregadores...`);
    const drivers: any[] = [];
    const driverUsers = users.slice(-Math.floor(users.length * 0.1));

    for (const user of driverUsers) {
      const driverData = {
        user: (user as any).id || (user as any).user?.id,
        name: user.user.username.replace('.', ' '),
        phone: generateRandomPhone(),
        vehicleType: getRandomItem(['motorcycle', 'bicycle', 'car']),
        isActive: getRandomBool(0.8)
      };

      try {
        const driver = await this.client.create('/delivery-drivers', driverData);
        drivers.push(driver);
        console.log(`✅ Entregador criado: ${driverData.name}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar entregador ${driverData.name}`);
      }
    }

    return drivers;
  }

  async createOrders(customers: any[], products: any[], drivers: any[], count: number): Promise<any[]> {
    console.log(`📦 Criando ${count} pedidos...`);
    const orders: any[] = [];
    const statuses = ['pending', 'confirmed', 'preparing', 'ready_for_delivery', 'out_for_delivery', 'delivered', 'cancelled'];
    const paymentMethods = ['credit_card', 'debit_card', 'pix', 'cash'];
    const paymentStatuses = ['pending', 'authorized', 'paid', 'refunded'];

    for (let i = 0; i < count; i++) {
      const customer = getRandomItem(customers);
      const numItems = getRandomInt(1, 5);
      const selectedProducts: OrderItemExtended[] = [];
      let subtotal = 0;

      for (let j = 0; j < numItems; j++) {
        const product = getRandomItem(products);
        const quantity = getRandomInt(1, 3);
        const price = product.data.price;
        
        selectedProducts.push({
          product: (product as any).id || (product.data as any).id,
          quantity: quantity,
          price: price,
          name: (product.data as any).name,
          subtotal: price * quantity,
          notes: getRandomBool(0.3) ? 'Sem cebola' : undefined
        });
        
        subtotal += price * quantity;
      }

      const deliveryFee = getRandomFloat(5, 12);
      const discount = getRandomBool(0.2) ? getRandomFloat(2, 10) : 0;
      const total = subtotal + deliveryFee - discount;

      const orderData = {
        customer: customer.data.id,
        items: selectedProducts,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        discount: discount,
        total: total,
        status: getRandomItem(statuses),
        paymentMethod: getRandomItem(paymentMethods),
        paymentStatus: getRandomItem(paymentStatuses),
        deliveryDriver: getRandomBool(0.7) ? getRandomItem(drivers).data.id : null,
        metadata: {
          orderNumber: `ORD-${Date.now()}-${i}`,
          notes: getRandomBool(0.3) ? 'Entregar na portaria' : null,
          deliveryAddress: generateRandomAddress()
        }
      };

      try {
        const order = await this.client.create('/orders', orderData);
        orders.push(order);
        console.log(`✅ Pedido criado: ${orderData.metadata.orderNumber} - R$ ${total.toFixed(2)}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar pedido ${i + 1}`);
      }
    }

    return orders;
  }

  async createReviews(customers: any[], products: any[], count: number): Promise<any[]> {
    console.log(`⭐ Criando ${count} avaliações...`);
    const reviews: any[] = [];
    const comments = [
      'Excelente produto, muito saboroso!',
      'Entrega rápida e comida deliciosa.',
      'Superou minhas expectativas.',
      'Boa qualidade, recomendo!',
      'Poderia melhorar o tempero.',
      'Perfeito, pedirei novamente.',
      'Muito bom, mas chegou um pouco frio.',
      'Adorei! Melhor pizza da região.',
      'Qualidade excepcional.',
      'Preço justo pela qualidade oferecida.'
    ];

    for (let i = 0; i < count; i++) {
      const reviewData = {
        rating: getRandomInt(3, 5),
        comment: getRandomBool(0.8) ? getRandomItem(comments) : null,
        customer: getRandomItem(customers).data.id,
        product: getRandomItem(products).data.id
      };

      try {
        const review = await this.client.create('/reviews', reviewData);
        reviews.push(review);
        console.log(`✅ Avaliação criada: ${reviewData.rating} estrelas`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar avaliação ${i + 1}`);
      }
    }

    return reviews;
  }

  async createPayments(customers: any[], count: number): Promise<any[]> {
    console.log(`💳 Criando ${count} pagamentos...`);
    const payments: any[] = [];
    const methods = ['credit_card', 'debit_card', 'pix', 'cash'];
    const statuses = ['pending', 'completed', 'failed', 'refunded'];

    for (let i = 0; i < count; i++) {
      const paymentData = {
        amount: getRandomFloat(15, 150),
        method: getRandomItem(methods),
        status: getRandomItem(statuses),
        transactionId: getRandomBool(0.8) ? `TXN-${Date.now()}-${i}` : null,
        customer: getRandomItem(customers).data.id
      };

      try {
        const payment = await this.client.create('/payments', paymentData);
        payments.push(payment);
        console.log(`✅ Pagamento criado: R$ ${paymentData.amount.toFixed(2)} via ${paymentData.method}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar pagamento ${i + 1}`);
      }
    }

    return payments;
  }

  async createNotifications(customers: any[], drivers: any[], count: number): Promise<any[]> {
    console.log(`🔔 Criando ${count} notificações...`);
    const notifications: any[] = [];
    const types = ['order_update', 'system', 'delivery'];
    const messages = {
      order_update: [
        'Seu pedido foi confirmado!',
        'Seu pedido está sendo preparado.',
        'Seu pedido saiu para entrega.',
        'Seu pedido foi entregue com sucesso!'
      ],
      system: [
        'Bem-vindo ao Sellvex Eats!',
        'Nova promoção disponível!',
        'Avalie seu último pedido.',
        'Confira nosso novo cardápio!'
      ],
      delivery: [
        'Novo pedido disponível para entrega.',
        'Pedido aceito com sucesso.',
        'Entrega finalizada.',
        'Você está offline no momento.'
      ]
    };

    for (let i = 0; i < count; i++) {
      const type = getRandomItem(types);
      const isForCustomer = type !== 'delivery';
      
      const notificationData = {
        title: `Notificação ${type}`,
        message: getRandomItem(messages[type]),
        type: type,
        isRead: getRandomBool(0.6),
        customer: isForCustomer ? getRandomItem(customers).data.id : null,
        deliveryDriver: !isForCustomer ? getRandomItem(drivers).data.id : null
      };

      try {
        const notification = await this.client.create('/notifications', notificationData);
        notifications.push(notification);
        console.log(`✅ Notificação criada: ${String(notificationData.message).substring(0, 30)}...`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar notificação ${i + 1}`);
      }
    }

    return notifications;
  }

  async createDeliveryZones(): Promise<any[]> {
    console.log(`📍 Criando zonas de entrega...`);
    const zones: any[] = [];

    for (const zoneData of DELIVERY_ZONES) {
      const data = {
        name: zoneData.name,
        description: `Zona de entrega para ${zoneData.neighborhoods.join(', ')}`,
        neighborhoods: zoneData.neighborhoods,
        zipCodes: zoneData.neighborhoods.map(() => `${getRandomInt(10000, 99999)}-${getRandomInt(100, 999)}`),
        coordinates: {
          center: { lat: getRandomFloat(-23.7, -23.4), lng: getRandomFloat(-46.8, -46.3) },
          radius: getRandomFloat(2, 8)
        },
        deliveryFee: zoneData.deliveryFee,
        freeDeliveryThreshold: zoneData.freeThreshold,
        estimatedDeliveryTimeMin: getRandomInt(20, 40),
        estimatedDeliveryTimeMax: getRandomInt(50, 90),
        isActive: true,
        priority: getRandomInt(1, 5),
        maxDistance: getRandomFloat(5, 15),
        serviceHoursText: '08:00 - 23:00',
        publishedAt: new Date().toISOString()
      };

      try {
        const zone = await this.client.create('/delivery-zones', data);
        zones.push(zone);
        console.log(`✅ Zona criada: ${data.name}`);
      } catch (error) {
        console.warn(`⚠️ Erro ao criar zona ${data.name}`);
      }
    }

    return zones;
  }
}

// CLI Configuration
program
  .name('populate')
  .description('Script para popular o banco de dados do Sellvex Eats com dados de teste realistas')
  .version('1.0.0');

program
  .option('-c, --clear', 'Limpar todos os dados antes de popular')
  .option('-u, --users <number>', 'Número de usuários para criar', '20')
  .option('-o, --orders <number>', 'Número de pedidos para criar', '50')
  .option('-r, --reviews <number>', 'Número de avaliações para criar', '30')
  .option('-p, --payments <number>', 'Número de pagamentos para criar', '40')
  .option('-n, --notifications <number>', 'Número de notificações para criar', '25')
  .action(async (options: PopulateOptions) => {
    console.log('🚀 Iniciando populate do Sellvex Eats...\n');

    const client = new StrapiClient(API_BASE_URL);
    await client.authenticate();

    const service = new PopulateService(client);

    try {
      // Limpar dados se solicitado
      if (options.clear) {
        console.log('🧹 Limpando dados existentes...');
        const endpoints = ['/notifications', '/reviews', '/payments', '/orders', '/customers', '/delivery-drivers', '/products', '/ingredients', '/categories', '/delivery-zones'];
        
        for (const endpoint of endpoints) {
          await client.deleteAll(endpoint);
        }
        console.log('✅ Dados limpos com sucesso!\n');
      }

      // Criar dados base
      const categories = await service.createCategories();
      const ingredients = await service.createIngredients();
      const products = await service.createProducts(categories);
      const zones = await service.createDeliveryZones();

      // Criar usuários e perfis
      const users = await service.createUsers(parseInt(String(options.users || 20)));
      const customers = await service.createCustomers(users);
      const drivers = await service.createDeliveryDrivers(users);

      // Criar transações
      const orders = await service.createOrders(customers, products, drivers, parseInt(String(options.orders || 50)));
      const reviews = await service.createReviews(customers, products, parseInt(String(options.reviews || 30)));
      const payments = await service.createPayments(customers, parseInt(String(options.payments || 40)));
      const notifications = await service.createNotifications(customers, drivers, parseInt(String(options.notifications || 25)));

      console.log('\n🎉 Populate concluído com sucesso!');
      console.log('📊 Resumo dos dados criados:');
      console.log(`  👥 Usuários: ${users.length}`);
      console.log(`  📂 Categorias: ${categories.length}`);
      console.log(`  🥕 Ingredientes: ${ingredients.length}`);
      console.log(`  🍕 Produtos: ${products.length}`);
      console.log(`  👤 Clientes: ${customers.length}`);
      console.log(`  🏍️ Entregadores: ${drivers.length}`);
      console.log(`  📍 Zonas de entrega: ${zones.length}`);
      console.log(`  📦 Pedidos: ${orders.length}`);
      console.log(`  ⭐ Avaliações: ${reviews.length}`);
      console.log(`  💳 Pagamentos: ${payments.length}`);
      console.log(`  🔔 Notificações: ${notifications.length}`);

      console.log('\n✨ Para testar as APIs criadas:');
      console.log('  GET /api/categories/public - Lista categorias');
      console.log('  GET /api/products/public - Lista produtos');
      console.log('  GET /api/orders/public/tracking/:orderNumber - Rastrear pedido');

    } catch (error) {
      console.error('❌ Erro durante o populate:', error);
      process.exit(1);
    }
  });

// Executar o programa
program.parse();