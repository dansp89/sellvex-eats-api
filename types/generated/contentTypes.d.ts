import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiBannerBanner extends Struct.CollectionTypeSchema {
  collectionName: 'banners';
  info: {
    description: 'Banners promocionais para app e website';
    displayName: 'Banner';
    pluralName: 'banners';
    singularName: 'banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    actionType: Schema.Attribute.Enumeration<
      [
        'none',
        'product',
        'category',
        'promotion',
        'external_link',
        'internal_page',
      ]
    > &
      Schema.Attribute.DefaultTo<'none'>;
    actionValue: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    clickCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.DateTime;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    impressionCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::banner.banner'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    mobileImage: Schema.Attribute.Media<'images'>;
    position: Schema.Attribute.Enumeration<
      [
        'home_top',
        'home_middle',
        'home_bottom',
        'category_top',
        'product_page',
        'checkout',
      ]
    > &
      Schema.Attribute.DefaultTo<'home_top'>;
    priority: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    startDate: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.String;
    targetAudience: Schema.Attribute.Enumeration<
      ['all', 'new_customers', 'existing_customers', 'vip_customers']
    > &
      Schema.Attribute.DefaultTo<'all'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCartCart extends Struct.CollectionTypeSchema {
  collectionName: 'carts';
  info: {
    description: 'Carrinho de compras (incluindo abandonados)';
    displayName: 'Cart';
    pluralName: 'carts';
    singularName: 'cart';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    abandonedAt: Schema.Attribute.DateTime;
    appliedCoupon: Schema.Attribute.Relation<'manyToOne', 'api::coupon.coupon'>;
    convertedAt: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    deliveryAddress: Schema.Attribute.JSON;
    deliveryFee: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    deviceInfo: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    discountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    items: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<[]>;
    lastActivity: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::cart.cart'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    recoveryEmailSent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    recoveryEmailSentAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      ['active', 'abandoned', 'converted', 'expired']
    > &
      Schema.Attribute.DefaultTo<'active'>;
    subtotal: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    total: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Struct.CollectionTypeSchema {
  collectionName: 'categories';
  info: {
    description: 'Categorias de produtos do card\u00E1pio';
    displayName: 'Category';
    pluralName: 'categories';
    singularName: 'category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'api::category.category'>;
    color: Schema.Attribute.String;
    combos: Schema.Attribute.Relation<'manyToMany', 'api::combo.combo'>;
    coupons: Schema.Attribute.Relation<'manyToMany', 'api::coupon.coupon'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    > &
      Schema.Attribute.Private;
    menus: Schema.Attribute.Relation<'manyToMany', 'api::menu.menu'>;
    metadata: Schema.Attribute.JSON;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    parent: Schema.Attribute.Relation<'manyToOne', 'api::category.category'>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    promotions: Schema.Attribute.Relation<
      'manyToMany',
      'api::promotion.promotion'
    >;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    taxConfigurations: Schema.Attribute.Relation<
      'manyToMany',
      'api::tax-configuration.tax-configuration'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiChatConversationChatConversation
  extends Struct.CollectionTypeSchema {
  collectionName: 'chat_conversations';
  info: {
    description: 'Conversas de chat com clientes';
    displayName: 'Chat Conversation';
    pluralName: 'chat-conversations';
    singularName: 'chat-conversation';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignedAt: Schema.Attribute.DateTime;
    category: Schema.Attribute.Enumeration<
      [
        'general',
        'order_issue',
        'payment',
        'delivery',
        'product',
        'complaint',
        'suggestion',
      ]
    > &
      Schema.Attribute.DefaultTo<'general'>;
    closedAt: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    customerFeedback: Schema.Attribute.Text;
    customerSatisfactionRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    lastMessageAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::chat-conversation.chat-conversation'
    > &
      Schema.Attribute.Private;
    messages: Schema.Attribute.Relation<
      'oneToMany',
      'api::chat-message.chat-message'
    >;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'urgent']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    relatedOrder: Schema.Attribute.Relation<'manyToOne', 'api::order.order'>;
    resolvedAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['open', 'in_progress', 'waiting_customer', 'resolved', 'closed']
    > &
      Schema.Attribute.DefaultTo<'open'>;
    subject: Schema.Attribute.String & Schema.Attribute.Required;
    supportAgent: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    tags: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiChatMessageChatMessage extends Struct.CollectionTypeSchema {
  collectionName: 'chat_messages';
  info: {
    description: 'Mensagens de chat com clientes e suporte';
    displayName: 'Chat Message';
    pluralName: 'chat-messages';
    singularName: 'chat-message';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachments: Schema.Attribute.Media<'images' | 'files', true>;
    conversation: Schema.Attribute.Relation<
      'manyToOne',
      'api::chat-conversation.chat-conversation'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isRead: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::chat-message.chat-message'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    messageType: Schema.Attribute.Enumeration<
      ['text', 'image', 'file', 'location', 'order_reference']
    > &
      Schema.Attribute.DefaultTo<'text'>;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    orderReference: Schema.Attribute.Relation<'manyToOne', 'api::order.order'>;
    publishedAt: Schema.Attribute.DateTime;
    readAt: Schema.Attribute.DateTime;
    sender: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    senderType: Schema.Attribute.Enumeration<
      ['customer', 'support', 'system', 'bot']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiComboCombo extends Struct.CollectionTypeSchema {
  collectionName: 'combos';
  info: {
    description: 'Combos promocionais que agrupam produtos';
    displayName: 'Combo';
    pluralName: 'combos';
    singularName: 'combo';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currentUses: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    description: Schema.Attribute.Text;
    discount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    finalPrice: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    image: Schema.Attribute.Media<'images'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::combo.combo'> &
      Schema.Attribute.Private;
    maximumItems: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    maxUses: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    minimumItems: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<2>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    preparationTime: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<20>;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    promotions: Schema.Attribute.Relation<
      'manyToMany',
      'api::promotion.promotion'
    >;
    publishedAt: Schema.Attribute.DateTime;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    slug: Schema.Attribute.UID<'name'>;
    tags: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    validFrom: Schema.Attribute.DateTime;
    validUntil: Schema.Attribute.DateTime;
    wishlists: Schema.Attribute.Relation<
      'manyToMany',
      'api::wishlist.wishlist'
    >;
  };
}

export interface ApiCouponCoupon extends Struct.CollectionTypeSchema {
  collectionName: 'coupons';
  info: {
    description: 'Cupons de desconto e promo\u00E7\u00F5es';
    displayName: 'Coupon';
    pluralName: 'coupons';
    singularName: 'coupon';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customers: Schema.Attribute.Relation<
      'manyToMany',
      'api::customer.customer'
    >;
    customerUsageLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    description: Schema.Attribute.Text;
    discountType: Schema.Attribute.Enumeration<['percentage', 'fixed_amount']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'percentage'>;
    discountValue: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    endDate: Schema.Attribute.DateTime;
    firstTimeOnly: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::coupon.coupon'
    > &
      Schema.Attribute.Private;
    maxDiscountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    metadata: Schema.Attribute.JSON;
    minOrderAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    orders: Schema.Attribute.Relation<'oneToMany', 'api::order.order'>;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    singleUse: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    startDate: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usageCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    usageLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface ApiCustomerCustomer extends Struct.CollectionTypeSchema {
  collectionName: 'customers';
  info: {
    description: 'Clientes do sistema de delivery';
    displayName: 'Customer';
    pluralName: 'customers';
    singularName: 'customer';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    addressesText: Schema.Attribute.Text;
    allergies: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    avatar: Schema.Attribute.Media<'images'>;
    birthDate: Schema.Attribute.Date;
    carts: Schema.Attribute.Relation<'oneToMany', 'api::cart.cart'>;
    communicationPreferences: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<{
        email: true;
        push: true;
        sms: true;
        whatsapp: false;
      }>;
    coupons: Schema.Attribute.Relation<'manyToMany', 'api::coupon.coupon'>;
    cpf: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 14;
        minLength: 11;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultTip: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    deliveryPreferences: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    dietaryRestrictions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    favoriteProducts: Schema.Attribute.Relation<
      'manyToMany',
      'api::product.product'
    >;
    gender: Schema.Attribute.Enumeration<
      ['male', 'female', 'other', 'prefer_not_to_say']
    >;
    isPremium: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lastOrderAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::customer.customer'
    > &
      Schema.Attribute.Private;
    loyaltyPoints: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    loyaltyPrograms: Schema.Attribute.Relation<
      'manyToMany',
      'api::loyalty-program.loyalty-program'
    >;
    metadata: Schema.Attribute.JSON;
    notifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    >;
    orders: Schema.Attribute.Relation<'oneToMany', 'api::order.order'>;
    payments: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    pointsTransactions: Schema.Attribute.Relation<
      'oneToMany',
      'api::points-transaction.points-transaction'
    >;
    preferences: Schema.Attribute.JSON;
    preferredPaymentMethod: Schema.Attribute.Enumeration<
      ['credit_card', 'debit_card', 'pix', 'cash', 'voucher']
    > &
      Schema.Attribute.DefaultTo<'credit_card'>;
    promotions: Schema.Attribute.Relation<
      'manyToMany',
      'api::promotion.promotion'
    >;
    publishedAt: Schema.Attribute.DateTime;
    referralCode: Schema.Attribute.String & Schema.Attribute.Unique;
    referrals: Schema.Attribute.Relation<'oneToMany', 'api::customer.customer'>;
    referredBy: Schema.Attribute.Relation<'oneToOne', 'api::customer.customer'>;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    supportTickets: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-ticket.support-ticket'
    >;
    totalOrders: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalSpent: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    wishlists: Schema.Attribute.Relation<'oneToMany', 'api::wishlist.wishlist'>;
  };
}

export interface ApiDeliveryDriverDeliveryDriver
  extends Struct.CollectionTypeSchema {
  collectionName: 'delivery_drivers';
  info: {
    description: 'Entregadores do sistema de delivery';
    displayName: 'Delivery Driver';
    pluralName: 'delivery-drivers';
    singularName: 'delivery-driver';
  };
  options: {
    draftAndPublish: false;
    privateAttributes: ['user'];
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    backgroundCheckDate: Schema.Attribute.Date;
    contractEndDate: Schema.Attribute.Date;
    contractStartDate: Schema.Attribute.Date;
    cpf: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 14;
        minLength: 11;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currentLocation: Schema.Attribute.JSON;
    documentsVerified: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    email: Schema.Attribute.Email;
    emergencyContact: Schema.Attribute.JSON;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    lastOnline: Schema.Attribute.DateTime;
    licenseNumber: Schema.Attribute.String & Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::delivery-driver.delivery-driver'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 2;
      }>;
    notifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    >;
    orders: Schema.Attribute.Relation<'oneToMany', 'api::order.order'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
        minLength: 10;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    status: Schema.Attribute.Enumeration<
      ['available', 'busy', 'offline', 'on_break']
    > &
      Schema.Attribute.DefaultTo<'offline'>;
    totalDeliveries: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    vehicleModel: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 2;
      }>;
    vehiclePlate: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
        minLength: 6;
      }>;
    vehicleType: Schema.Attribute.Enumeration<
      ['motorcycle', 'bicycle', 'car', 'scooter', 'walking']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'motorcycle'>;
    vehicleYear: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2030;
          min: 1950;
        },
        number
      >;
    workingHours: Schema.Attribute.JSON;
    workingZones: Schema.Attribute.Relation<
      'manyToMany',
      'api::delivery-zone.delivery-zone'
    >;
  };
}

export interface ApiDeliveryZoneDeliveryZone
  extends Struct.CollectionTypeSchema {
  collectionName: 'delivery_zones';
  info: {
    description: 'Zonas de entrega com taxas espec\u00EDficas';
    displayName: 'Delivery Zone';
    pluralName: 'delivery-zones';
    singularName: 'delivery-zone';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    coordinates: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryFee: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    description: Schema.Attribute.Text;
    drivers: Schema.Attribute.Relation<
      'manyToMany',
      'api::delivery-driver.delivery-driver'
    >;
    estimatedDeliveryTimeMax: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<60>;
    estimatedDeliveryTimeMin: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<30>;
    freeDeliveryThreshold: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isEmergencyZone: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::delivery-zone.delivery-zone'
    > &
      Schema.Attribute.Private;
    maxDistance: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    neighborhoods: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    orders: Schema.Attribute.Relation<'oneToMany', 'api::order.order'>;
    priority: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    serviceHoursText: Schema.Attribute.Text;
    specialInstructions: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    zipCodes: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
  };
}

export interface ApiEmployeeEmployee extends Struct.CollectionTypeSchema {
  collectionName: 'employees';
  info: {
    description: 'Funcion\u00E1rios da empresa (cozinha, atendimento, etc.)';
    displayName: 'Employee';
    pluralName: 'employees';
    singularName: 'employee';
  };
  options: {
    draftAndPublish: false;
    privateAttributes: ['user', 'salary'];
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    avatar: Schema.Attribute.Media<'images'>;
    birthDate: Schema.Attribute.Date;
    branch: Schema.Attribute.Relation<
      'manyToOne',
      'api::store-branch.store-branch'
    >;
    cpf: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 14;
        minLength: 11;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    department: Schema.Attribute.Enumeration<
      [
        'kitchen',
        'service',
        'delivery',
        'management',
        'cleaning',
        'maintenance',
      ]
    > &
      Schema.Attribute.Required;
    email: Schema.Attribute.Email;
    emergencyContact: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    employeeId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    hireDate: Schema.Attribute.Date & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::employee.employee'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    notes: Schema.Attribute.Text;
    permissions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.Enumeration<
      [
        'manager',
        'chef',
        'cook',
        'kitchen_assistant',
        'cashier',
        'waiter',
        'cleaner',
        'maintenance',
      ]
    > &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    salaries: Schema.Attribute.Relation<'oneToMany', 'api::salary.salary'>;
    salary: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    salaryType: Schema.Attribute.Enumeration<
      ['monthly', 'hourly', 'commission']
    > &
      Schema.Attribute.DefaultTo<'monthly'>;
    shifts: Schema.Attribute.Relation<'oneToMany', 'api::shift.shift'>;
    terminationDate: Schema.Attribute.Date;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    workSchedule: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
  };
}

export interface ApiEquipmentEquipment extends Struct.CollectionTypeSchema {
  collectionName: 'equipment';
  info: {
    description: 'Equipamentos da cozinha e loja';
    displayName: 'Equipment';
    pluralName: 'equipments';
    singularName: 'equipment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    branch: Schema.Attribute.Relation<
      'manyToOne',
      'api::store-branch.store-branch'
    >;
    brand: Schema.Attribute.String;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    images: Schema.Attribute.Media<'images', true>;
    lastMaintenanceDate: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipment.equipment'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    maintenanceInterval: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    maintenanceRecords: Schema.Attribute.Relation<
      'oneToMany',
      'api::maintenance-record.maintenance-record'
    >;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    model: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    nextMaintenanceDate: Schema.Attribute.Date;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    purchaseDate: Schema.Attribute.Date;
    purchasePrice: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    responsibleEmployee: Schema.Attribute.Relation<
      'manyToOne',
      'api::employee.employee'
    >;
    serialNumber: Schema.Attribute.String & Schema.Attribute.Unique;
    specifications: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    status: Schema.Attribute.Enumeration<
      ['active', 'maintenance', 'repair', 'inactive', 'disposed']
    > &
      Schema.Attribute.DefaultTo<'active'>;
    supplier: Schema.Attribute.Relation<'manyToOne', 'api::supplier.supplier'>;
    type: Schema.Attribute.Enumeration<
      [
        'kitchen',
        'refrigeration',
        'heating',
        'cleaning',
        'pos',
        'delivery',
        'other',
      ]
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    warrantyExpiration: Schema.Attribute.Date;
  };
}

export interface ApiFaqFaq extends Struct.CollectionTypeSchema {
  collectionName: 'faqs';
  info: {
    description: 'Perguntas frequentes';
    displayName: 'FAQ';
    pluralName: 'faqs';
    singularName: 'faq';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    category: Schema.Attribute.Enumeration<
      ['orders', 'delivery', 'payment', 'products', 'account', 'general']
    > &
      Schema.Attribute.DefaultTo<'general'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    helpfulCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    notHelpfulCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    question: Schema.Attribute.String & Schema.Attribute.Required;
    relatedFaqs: Schema.Attribute.Relation<'manyToMany', 'api::faq.faq'>;
    tags: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    viewCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface ApiFrequentlyBoughtTogetherFrequentlyBoughtTogether
  extends Struct.CollectionTypeSchema {
  collectionName: 'frequently_bought_together';
  info: {
    description: 'Produtos frequentemente comprados juntos';
    displayName: 'Frequently Bought Together';
    pluralName: 'frequently-bought-togethers';
    singularName: 'frequently-bought-together';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    confidence: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    discountPercentage: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    frequency: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    lastCalculated: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::frequently-bought-together.frequently-bought-together'
    > &
      Schema.Attribute.Private;
    mainProduct: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    relatedProduct: Schema.Attribute.Relation<
      'manyToOne',
      'api::product.product'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiIngredientIngredient extends Struct.CollectionTypeSchema {
  collectionName: 'ingredients';
  info: {
    description: 'Ingredientes utilizados nos produtos do card\u00E1pio';
    displayName: 'Ingredient';
    pluralName: 'ingredients';
    singularName: 'ingredient';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    allergens: Schema.Attribute.Text;
    calories: Schema.Attribute.Decimal;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    hasAllergens: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    inventoryItems: Schema.Attribute.Relation<
      'oneToMany',
      'api::inventory.inventory'
    >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isGlutenFree: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isLactoseFree: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVegan: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVegetarian: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ingredient.ingredient'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    supplier: Schema.Attribute.Relation<'manyToOne', 'api::supplier.supplier'>;
    unitOfMeasure: Schema.Attribute.String & Schema.Attribute.DefaultTo<'g'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInventoryMovementInventoryMovement
  extends Struct.CollectionTypeSchema {
  collectionName: 'inventory_movements';
  info: {
    description: 'Movimenta\u00E7\u00F5es de estoque (entrada, sa\u00EDda, ajustes)';
    displayName: 'Inventory Movement';
    pluralName: 'inventory-movements';
    singularName: 'inventory-movement';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    inventory: Schema.Attribute.Relation<
      'manyToOne',
      'api::inventory.inventory'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::inventory-movement.inventory-movement'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    notes: Schema.Attribute.Text;
    performedBy: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    publishedAt: Schema.Attribute.DateTime;
    quantity: Schema.Attribute.Decimal & Schema.Attribute.Required;
    reason: Schema.Attribute.String & Schema.Attribute.Required;
    reference: Schema.Attribute.String;
    referenceType: Schema.Attribute.Enumeration<
      ['purchase_order', 'production', 'waste', 'adjustment', 'transfer']
    > &
      Schema.Attribute.DefaultTo<'adjustment'>;
    totalCost: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    type: Schema.Attribute.Enumeration<
      ['in', 'out', 'adjustment', 'waste', 'transfer']
    > &
      Schema.Attribute.Required;
    unitCost: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInventoryInventory extends Struct.CollectionTypeSchema {
  collectionName: 'inventories';
  info: {
    description: 'Controle de estoque de ingredientes e produtos';
    displayName: 'Inventory';
    pluralName: 'inventories';
    singularName: 'inventory';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    batchNumber: Schema.Attribute.String;
    costPerUnit: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currentQuantity: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    expirationDate: Schema.Attribute.Date;
    ingredient: Schema.Attribute.Relation<
      'manyToOne',
      'api::ingredient.ingredient'
    >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    lastPurchaseDate: Schema.Attribute.Date;
    lastPurchasePrice: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::inventory.inventory'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    maximumQuantity: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    minimumQuantity: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<10>;
    movements: Schema.Attribute.Relation<
      'oneToMany',
      'api::inventory-movement.inventory-movement'
    >;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    reorderPoint: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<20>;
    status: Schema.Attribute.Enumeration<
      ['in_stock', 'low_stock', 'out_of_stock', 'expired']
    > &
      Schema.Attribute.DefaultTo<'in_stock'>;
    supplier: Schema.Attribute.Relation<'manyToOne', 'api::supplier.supplier'>;
    unitOfMeasure: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'kg'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLoyaltyProgramLoyaltyProgram
  extends Struct.CollectionTypeSchema {
  collectionName: 'loyalty_programs';
  info: {
    description: 'Programas de fidelidade e pontua\u00E7\u00E3o';
    displayName: 'Loyalty Program';
    pluralName: 'loyalty-programs';
    singularName: 'loyalty-program';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    birthdayBonus: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customers: Schema.Attribute.Relation<
      'manyToMany',
      'api::customer.customer'
    >;
    description: Schema.Attribute.Text;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::loyalty-program.loyalty-program'
    > &
      Schema.Attribute.Private;
    maximumPointsPerOrder: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    minimumPointsToRedeem: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<100>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    pointsExpirationDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<365>;
    pointsPerReal: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    pointsTransactions: Schema.Attribute.Relation<
      'oneToMany',
      'api::points-transaction.points-transaction'
    >;
    publishedAt: Schema.Attribute.DateTime;
    realsPerPoint: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.01>;
    referralBonus: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    specialOffers: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    tiers: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    welcomeBonus: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface ApiMaintenanceRecordMaintenanceRecord
  extends Struct.CollectionTypeSchema {
  collectionName: 'maintenance_records';
  info: {
    description: 'Registros de manuten\u00E7\u00E3o de equipamentos';
    displayName: 'Maintenance Record';
    pluralName: 'maintenance-records';
    singularName: 'maintenance-record';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachments: Schema.Attribute.Media<'images' | 'files', true>;
    completedDate: Schema.Attribute.Date;
    cost: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    equipment: Schema.Attribute.Relation<
      'manyToOne',
      'api::equipment.equipment'
    >;
    externalTechnician: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::maintenance-record.maintenance-record'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    nextMaintenanceDate: Schema.Attribute.Date;
    notes: Schema.Attribute.Text;
    partsReplaced: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    performedBy: Schema.Attribute.Relation<
      'manyToOne',
      'api::employee.employee'
    >;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'urgent']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    scheduledDate: Schema.Attribute.Date & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      ['scheduled', 'in_progress', 'completed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'scheduled'>;
    type: Schema.Attribute.Enumeration<
      ['preventive', 'corrective', 'emergency', 'inspection']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workPerformed: Schema.Attribute.Text;
  };
}

export interface ApiMenuMenu extends Struct.CollectionTypeSchema {
  collectionName: 'menus';
  info: {
    description: 'Card\u00E1pio com se\u00E7\u00F5es organizadas de produtos';
    displayName: 'Menu';
    pluralName: 'menus';
    singularName: 'menu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    availableDays: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<
        [
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday',
        ]
      >;
    availableFrom: Schema.Attribute.Time;
    availableUntil: Schema.Attribute.Time;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::menu.menu'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    sectionsDescription: Schema.Attribute.Text;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsletterNewsletter extends Struct.CollectionTypeSchema {
  collectionName: 'newsletters';
  info: {
    description: 'Campanhas de email marketing e newsletter';
    displayName: 'Newsletter';
    pluralName: 'newsletters';
    singularName: 'newsletter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    attachments: Schema.Attribute.Media<'images' | 'files', true>;
    clickedCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    htmlContent: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::newsletter.newsletter'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    openedCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    recipientsCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    scheduledFor: Schema.Attribute.DateTime;
    sentAt: Schema.Attribute.DateTime;
    sentCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    status: Schema.Attribute.Enumeration<
      ['draft', 'scheduled', 'sent', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    subject: Schema.Attribute.String & Schema.Attribute.Required;
    targetAudience: Schema.Attribute.Enumeration<
      ['all', 'subscribers', 'customers', 'new_customers', 'inactive_customers']
    > &
      Schema.Attribute.DefaultTo<'subscribers'>;
    templateType: Schema.Attribute.Enumeration<
      ['promotional', 'newsletter', 'transactional', 'announcement']
    > &
      Schema.Attribute.DefaultTo<'newsletter'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNotificationNotification
  extends Struct.CollectionTypeSchema {
  collectionName: 'notifications';
  info: {
    description: 'Notifica\u00E7\u00F5es do sistema para usu\u00E1rios, clientes e entregadores';
    displayName: 'Notification';
    pluralName: 'notifications';
    singularName: 'notification';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actions: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    data: Schema.Attribute.JSON;
    deliveryDriver: Schema.Attribute.Relation<
      'manyToOne',
      'api::delivery-driver.delivery-driver'
    >;
    expiresAt: Schema.Attribute.DateTime;
    isRead: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    metadata: Schema.Attribute.JSON;
    order: Schema.Attribute.Relation<'manyToOne', 'api::order.order'>;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'urgent']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    readAt: Schema.Attribute.DateTime;
    relatedEntityId: Schema.Attribute.String;
    relatedEntityType: Schema.Attribute.String;
    scheduledFor: Schema.Attribute.DateTime;
    targetId: Schema.Attribute.String;
    targetType: Schema.Attribute.Enumeration<
      ['user', 'customer', 'delivery_driver', 'admin', 'all']
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['order_update', 'promotion', 'system', 'payment', 'delivery', 'account']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOrderOrder extends Struct.CollectionTypeSchema {
  collectionName: 'orders';
  info: {
    description: 'Pedidos do sistema de delivery';
    displayName: 'Order';
    pluralName: 'orders';
    singularName: 'order';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actualDeliveryTime: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    billingAddressText: Schema.Attribute.Text;
    branch: Schema.Attribute.Relation<
      'manyToOne',
      'api::store-branch.store-branch'
    >;
    cancellationReason: Schema.Attribute.Text;
    cancelledAt: Schema.Attribute.DateTime;
    coupon: Schema.Attribute.Relation<'manyToOne', 'api::coupon.coupon'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    deliveredAt: Schema.Attribute.DateTime;
    deliveryAddressText: Schema.Attribute.Text;
    deliveryDriver: Schema.Attribute.Relation<
      'manyToOne',
      'api::delivery-driver.delivery-driver'
    >;
    deliveryFee: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    deliveryInstructions: Schema.Attribute.Text;
    deliveryTrackingUrl: Schema.Attribute.String;
    deliveryZone: Schema.Attribute.Relation<
      'manyToOne',
      'api::delivery-zone.delivery-zone'
    >;
    discount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    driverLocation: Schema.Attribute.JSON;
    estimatedCompletionTime: Schema.Attribute.DateTime;
    estimatedDeliveryTime: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    items: Schema.Attribute.JSON & Schema.Attribute.Required;
    itemsDescription: Schema.Attribute.Text;
    itemsOld: Schema.Attribute.JSON;
    kitchenNotes: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::order.order'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON;
    orderNumber: Schema.Attribute.String & Schema.Attribute.Unique;
    orderType: Schema.Attribute.Enumeration<['delivery', 'pickup', 'dine_in']> &
      Schema.Attribute.DefaultTo<'delivery'>;
    payment: Schema.Attribute.Relation<'oneToOne', 'api::payment.payment'>;
    paymentId: Schema.Attribute.String;
    paymentMethod: Schema.Attribute.Enumeration<
      ['credit_card', 'debit_card', 'pix', 'cash', 'online_payment']
    > &
      Schema.Attribute.Required;
    paymentStatus: Schema.Attribute.Enumeration<
      ['pending', 'authorized', 'paid', 'refunded', 'voided', 'error']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    pickedUpAt: Schema.Attribute.DateTime;
    pointsEarned: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    pointsRedeemed: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    preparationCompleted: Schema.Attribute.DateTime;
    preparationStarted: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    review: Schema.Attribute.Text;
    scheduledFor: Schema.Attribute.DateTime;
    specialRequests: Schema.Attribute.Text;
    status: Schema.Attribute.Enumeration<
      [
        'pending',
        'confirmed',
        'preparing',
        'ready_for_delivery',
        'out_for_delivery',
        'delivered',
        'cancelled',
        'refunded',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'pending'>;
    subtotal: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    taxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    timeToKitchen: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    tips: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    total: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPaymentPayment extends Struct.CollectionTypeSchema {
  collectionName: 'payments';
  info: {
    description: 'Payments made by customers for orders';
    displayName: 'Payment';
    pluralName: 'payments';
    singularName: 'payment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    cardBrand: Schema.Attribute.String;
    cardMask: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'BRL'>;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    feeAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    gateway: Schema.Attribute.String;
    gatewayTransactionId: Schema.Attribute.String;
    installments: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::payment.payment'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON;
    notes: Schema.Attribute.Text;
    order: Schema.Attribute.Relation<'oneToOne', 'api::order.order'>;
    paymentDate: Schema.Attribute.DateTime;
    paymentMethod: Schema.Attribute.Enumeration<
      ['credit_card', 'debit_card', 'pix', 'cash', 'bank_transfer']
    > &
      Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['pending', 'authorized', 'paid', 'refunded', 'cancelled', 'failed']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'pending'>;
    transactionId: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPointsTransactionPointsTransaction
  extends Struct.CollectionTypeSchema {
  collectionName: 'points_transactions';
  info: {
    description: 'Transa\u00E7\u00F5es de pontos de fidelidade';
    displayName: 'Points Transaction';
    pluralName: 'points-transactions';
    singularName: 'points-transaction';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    expirationDate: Schema.Attribute.Date;
    isExpired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::points-transaction.points-transaction'
    > &
      Schema.Attribute.Private;
    loyaltyProgram: Schema.Attribute.Relation<
      'manyToOne',
      'api::loyalty-program.loyalty-program'
    >;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    order: Schema.Attribute.Relation<'manyToOne', 'api::order.order'>;
    points: Schema.Attribute.Integer & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    referenceValue: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    type: Schema.Attribute.Enumeration<
      ['earned', 'redeemed', 'expired', 'bonus', 'adjustment']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    description: '';
    displayName: 'Product';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    addons: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    allergens: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    availableFrom: Schema.Attribute.Time;
    availableUntil: Schema.Attribute.Time;
    averageRating: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    barcode: Schema.Attribute.String;
    calories: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    category: Schema.Attribute.Relation<'manyToOne', 'api::category.category'>;
    combos: Schema.Attribute.Relation<'manyToMany', 'api::combo.combo'>;
    cost: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    coupons: Schema.Attribute.Relation<'manyToMany', 'api::coupon.coupon'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customizations: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    description: Schema.Attribute.Text;
    discountPercentage: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    favoritedBy: Schema.Attribute.Relation<
      'manyToMany',
      'api::customer.customer'
    >;
    frequentlyBoughtWith: Schema.Attribute.Relation<
      'oneToMany',
      'api::frequently-bought-together.frequently-bought-together'
    >;
    images: Schema.Attribute.Media<'images', true>;
    ingredients: Schema.Attribute.Relation<
      'manyToMany',
      'api::ingredient.ingredient'
    >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isGlutenFree: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isLactoseFree: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isSpicy: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVegan: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVegetarian: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lastRestocked: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::product.product'
    > &
      Schema.Attribute.Private;
    maxOrderQuantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    menus: Schema.Attribute.Relation<'manyToMany', 'api::menu.menu'>;
    minOrderQuantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    nutritionalInfoOld: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    originalPrice: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    preparationTime: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<15>;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    profitMargin: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    promotions: Schema.Attribute.Relation<
      'manyToMany',
      'api::promotion.promotion'
    >;
    publishedAt: Schema.Attribute.DateTime;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    servingSize: Schema.Attribute.String;
    shortDescription: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 150;
      }>;
    sizes: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    sku: Schema.Attribute.String & Schema.Attribute.Unique;
    slug: Schema.Attribute.UID<'name'>;
    spicyLevel: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    stockQuantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    supplierCost: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    tags: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    totalReviews: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weight: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    wishlists: Schema.Attribute.Relation<
      'manyToMany',
      'api::wishlist.wishlist'
    >;
  };
}

export interface ApiPromotionPromotion extends Struct.CollectionTypeSchema {
  collectionName: 'promotions';
  info: {
    description: 'Promo\u00E7\u00F5es e ofertas especiais';
    displayName: 'Promotion';
    pluralName: 'promotions';
    singularName: 'promotion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<'images'>;
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    combos: Schema.Attribute.Relation<'manyToMany', 'api::combo.combo'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customerEligibility: Schema.Attribute.Enumeration<
      ['all', 'new_customers', 'existing_customers', 'specific_customers']
    > &
      Schema.Attribute.DefaultTo<'all'>;
    customers: Schema.Attribute.Relation<
      'manyToMany',
      'api::customer.customer'
    >;
    description: Schema.Attribute.Text;
    discountType: Schema.Attribute.Enumeration<
      ['percentage', 'fixed_amount', 'buy_x_get_y', 'free_shipping']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'percentage'>;
    discountValue: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    endDate: Schema.Attribute.DateTime & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::promotion.promotion'
    > &
      Schema.Attribute.Private;
    maxDiscountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    metadata: Schema.Attribute.JSON;
    minOrderAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    singleUsePerCustomer: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    startDate: Schema.Attribute.DateTime & Schema.Attribute.Required;
    termsAndConditions: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usageCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    usageLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface ApiPurchaseOrderPurchaseOrder
  extends Struct.CollectionTypeSchema {
  collectionName: 'purchase_orders';
  info: {
    description: 'Pedidos de compra para fornecedores';
    displayName: 'Purchase Order';
    pluralName: 'purchase-orders';
    singularName: 'purchase-order';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actualDeliveryDate: Schema.Attribute.Date;
    approvedBy: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryAddress: Schema.Attribute.Text;
    expectedDeliveryDate: Schema.Attribute.Date;
    items: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<[]>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::purchase-order.purchase-order'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    notes: Schema.Attribute.Text;
    orderDate: Schema.Attribute.Date & Schema.Attribute.Required;
    orderNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    paymentTerms: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      [
        'draft',
        'sent',
        'confirmed',
        'partially_received',
        'received',
        'cancelled',
      ]
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    subtotal: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    supplier: Schema.Attribute.Relation<'manyToOne', 'api::supplier.supplier'>;
    taxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    total: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReportReport extends Struct.CollectionTypeSchema {
  collectionName: 'analytics';
  info: {
    description: 'M\u00E9tricas e relat\u00F3rios de vendas e performance';
    displayName: 'Analytics Report';
    pluralName: 'reports';
    singularName: 'report';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    averageDeliveryTime: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    averageOrderValue: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    averagePreparationTime: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    cancellationRate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customerSatisfactionScore: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    deliveryOrdersCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    dineInOrdersCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    hourlyBreakdown: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::report.report'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    newCustomers: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    paymentMethodsBreakdown: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<{}>;
    period: Schema.Attribute.Enumeration<
      ['daily', 'weekly', 'monthly', 'yearly']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'daily'>;
    pickupOrdersCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    profit: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    refundRate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    returningCustomers: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    topCategories: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    topSellingProducts: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    totalCosts: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalOrders: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalRevenue: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReviewReview extends Struct.CollectionTypeSchema {
  collectionName: 'reviews';
  info: {
    description: 'Avalia\u00E7\u00F5es de clientes sobre produtos, combos ou o servi\u00E7o';
    displayName: 'Review';
    pluralName: 'reviews';
    singularName: 'review';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    adminResponse: Schema.Attribute.Text;
    combo: Schema.Attribute.Relation<'manyToOne', 'api::combo.combo'>;
    comment: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    deliveryDriver: Schema.Attribute.Relation<
      'manyToOne',
      'api::delivery-driver.delivery-driver'
    >;
    images: Schema.Attribute.Media<'images', true>;
    isAnonymous: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::review.review'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON;
    order: Schema.Attribute.Relation<'oneToOne', 'api::order.order'>;
    product: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    responseBy: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    responseDate: Schema.Attribute.DateTime;
    reviewType: Schema.Attribute.Enumeration<
      ['product', 'combo', 'delivery', 'overall']
    > &
      Schema.Attribute.DefaultTo<'product'>;
    status: Schema.Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Schema.Attribute.DefaultTo<'pending'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSalarySalary extends Struct.CollectionTypeSchema {
  collectionName: 'salaries';
  info: {
    description: 'Controle de sal\u00E1rios e pagamentos dos funcion\u00E1rios';
    displayName: 'Salary';
    pluralName: 'salaries';
    singularName: 'salary';
  };
  options: {
    draftAndPublish: false;
    privateAttributes: ['grossAmount', 'netAmount', 'deductions'];
  };
  attributes: {
    bonuses: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deductions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    employee: Schema.Attribute.Relation<'manyToOne', 'api::employee.employee'>;
    grossAmount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::salary.salary'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    netAmount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    notes: Schema.Attribute.Text;
    overtimeAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    overtimeHours: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    paymentDate: Schema.Attribute.Date;
    paymentMethod: Schema.Attribute.Enumeration<
      ['bank_transfer', 'cash', 'check']
    > &
      Schema.Attribute.DefaultTo<'bank_transfer'>;
    publishedAt: Schema.Attribute.DateTime;
    referenceMonth: Schema.Attribute.String & Schema.Attribute.Required;
    referenceYear: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 2100;
          min: 2020;
        },
        number
      >;
    status: Schema.Attribute.Enumeration<['pending', 'paid', 'cancelled']> &
      Schema.Attribute.DefaultTo<'pending'>;
    totalHours: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workedDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    workingDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<22>;
  };
}

export interface ApiSettingSetting extends Struct.SingleTypeSchema {
  collectionName: 'settings';
  info: {
    description: 'Configura\u00E7\u00F5es globais do sistema';
    displayName: 'Settings';
    pluralName: 'settings';
    singularName: 'setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    businessHoursText: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryFee: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    deliveryTimeMax: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<60>;
    deliveryTimeMin: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<30>;
    deliveryZones: Schema.Attribute.JSON;
    freeDeliveryThreshold: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::setting.setting'
    > &
      Schema.Attribute.Private;
    maintenanceMessage: Schema.Attribute.Text;
    maintenanceMode: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    metadata: Schema.Attribute.JSON;
    minimumOrderValue: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    paymentMethodsText: Schema.Attribute.Text;
    preparationTimeMax: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<45>;
    preparationTimeMin: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<15>;
    publishedAt: Schema.Attribute.DateTime;
    socialMediaLinks: Schema.Attribute.JSON;
    storeAddressText: Schema.Attribute.Text;
    storeDescription: Schema.Attribute.Text;
    storeEmail: Schema.Attribute.Email;
    storeFavicon: Schema.Attribute.Media<'images'>;
    storeLogo: Schema.Attribute.Media<'images'>;
    storeName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Sellvex Eats'>;
    storePhone: Schema.Attribute.String;
    taxRate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiShiftShift extends Struct.CollectionTypeSchema {
  collectionName: 'shifts';
  info: {
    description: 'Turnos de trabalho dos funcion\u00E1rios';
    displayName: 'Shift';
    pluralName: 'shifts';
    singularName: 'shift';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    actualEndTime: Schema.Attribute.Time;
    actualStartTime: Schema.Attribute.Time;
    breakEndTime: Schema.Attribute.Time;
    breakStartTime: Schema.Attribute.Time;
    clockInLocation: Schema.Attribute.JSON;
    clockOutLocation: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    employee: Schema.Attribute.Relation<'manyToOne', 'api::employee.employee'>;
    endTime: Schema.Attribute.Time & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::shift.shift'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    notes: Schema.Attribute.Text;
    overtimeHours: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    position: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    startTime: Schema.Attribute.Time & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      ['scheduled', 'in_progress', 'completed', 'absent', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'scheduled'>;
    totalHours: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiStoreBranchStoreBranch extends Struct.CollectionTypeSchema {
  collectionName: 'store_branches';
  info: {
    description: 'Filiais e unidades da loja';
    displayName: 'Store Branch';
    pluralName: 'store-branches';
    singularName: 'store-branch';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acceptsDelivery: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    acceptsDineIn: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    acceptsPickup: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    capacity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    coordinates: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryFee: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    deliveryRadius: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<10>;
    email: Schema.Attribute.Email;
    employees: Schema.Attribute.Relation<'oneToMany', 'api::employee.employee'>;
    equipment: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipment.equipment'
    >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::store-branch.store-branch'
    > &
      Schema.Attribute.Private;
    manager: Schema.Attribute.Relation<'manyToOne', 'api::employee.employee'>;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    minimumOrderValue: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    operatingHours: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    orders: Schema.Attribute.Relation<'oneToMany', 'api::order.order'>;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSupplierSupplier extends Struct.CollectionTypeSchema {
  collectionName: 'suppliers';
  info: {
    description: 'Fornecedores de ingredientes e produtos';
    displayName: 'Supplier';
    pluralName: 'suppliers';
    singularName: 'supplier';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    cnpj: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 18;
        minLength: 14;
      }>;
    contactPerson: Schema.Attribute.String;
    contactPersonEmail: Schema.Attribute.Email;
    contactPersonPhone: Schema.Attribute.String;
    contractEndDate: Schema.Attribute.Date;
    contractStartDate: Schema.Attribute.Date;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deliveryDays: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    ingredients: Schema.Attribute.Relation<
      'oneToMany',
      'api::ingredient.ingredient'
    >;
    inventoryItems: Schema.Attribute.Relation<
      'oneToMany',
      'api::inventory.inventory'
    >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::supplier.supplier'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    minimumOrderValue: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    notes: Schema.Attribute.Text;
    paymentTerms: Schema.Attribute.Enumeration<
      ['immediate', 'days_15', 'days_30', 'days_45', 'days_60']
    > &
      Schema.Attribute.DefaultTo<'days_30'>;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    purchaseOrders: Schema.Attribute.Relation<
      'oneToMany',
      'api::purchase-order.purchase-order'
    >;
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    tradeName: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    website: Schema.Attribute.String;
  };
}

export interface ApiSupportTicketSupportTicket
  extends Struct.CollectionTypeSchema {
  collectionName: 'support_tickets';
  info: {
    description: 'Tickets de suporte e atendimento';
    displayName: 'Support Ticket';
    pluralName: 'support-tickets';
    singularName: 'support-ticket';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    assignedAt: Schema.Attribute.DateTime;
    assignedTo: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    attachments: Schema.Attribute.Media<'images' | 'files', true>;
    category: Schema.Attribute.Enumeration<
      [
        'order_issue',
        'payment_problem',
        'delivery_issue',
        'product_quality',
        'refund_request',
        'complaint',
        'suggestion',
        'technical_issue',
        'other',
      ]
    > &
      Schema.Attribute.Required;
    closedAt: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    customerFeedback: Schema.Attribute.Text;
    customerSatisfactionRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    escalationReason: Schema.Attribute.Text;
    firstResponseAt: Schema.Attribute.DateTime;
    internalNotes: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::support-ticket.support-ticket'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'urgent']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    relatedOrder: Schema.Attribute.Relation<'manyToOne', 'api::order.order'>;
    resolution: Schema.Attribute.Text;
    resolvedAt: Schema.Attribute.DateTime;
    source: Schema.Attribute.Enumeration<
      ['app', 'website', 'phone', 'email', 'chat', 'social_media']
    > &
      Schema.Attribute.DefaultTo<'app'>;
    status: Schema.Attribute.Enumeration<
      [
        'open',
        'in_progress',
        'waiting_customer',
        'escalated',
        'resolved',
        'closed',
      ]
    > &
      Schema.Attribute.DefaultTo<'open'>;
    subject: Schema.Attribute.String & Schema.Attribute.Required;
    tags: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    ticketNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTaxConfigurationTaxConfiguration
  extends Struct.CollectionTypeSchema {
  collectionName: 'tax_configurations';
  info: {
    description: 'Configura\u00E7\u00F5es de impostos por regi\u00E3o e categoria';
    displayName: 'Tax Configuration';
    pluralName: 'tax-configurations';
    singularName: 'tax-configuration';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicableCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    city: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    effectiveDate: Schema.Attribute.Date & Schema.Attribute.Required;
    exemptCategories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    expirationDate: Schema.Attribute.Date;
    fixedAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isPercentage: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tax-configuration.tax-configuration'
    > &
      Schema.Attribute.Private;
    maximumTaxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    minimumTaxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    priority: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    rate: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    region: Schema.Attribute.String & Schema.Attribute.Required;
    state: Schema.Attribute.String;
    taxType: Schema.Attribute.Enumeration<
      ['sales_tax', 'service_tax', 'delivery_tax', 'environmental_tax']
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    zipCodes: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
  };
}

export interface ApiWishlistWishlist extends Struct.CollectionTypeSchema {
  collectionName: 'wishlists';
  info: {
    description: 'Lista de desejos dos clientes';
    displayName: 'Wishlist';
    pluralName: 'wishlists';
    singularName: 'wishlist';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    combos: Schema.Attribute.Relation<'manyToMany', 'api::combo.combo'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    customer: Schema.Attribute.Relation<'manyToOne', 'api::customer.customer'>;
    description: Schema.Attribute.Text;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lastActivity: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::wishlist.wishlist'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Minha Lista'>;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    publishedAt: Schema.Attribute.DateTime;
    totalItems: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::banner.banner': ApiBannerBanner;
      'api::cart.cart': ApiCartCart;
      'api::category.category': ApiCategoryCategory;
      'api::chat-conversation.chat-conversation': ApiChatConversationChatConversation;
      'api::chat-message.chat-message': ApiChatMessageChatMessage;
      'api::combo.combo': ApiComboCombo;
      'api::coupon.coupon': ApiCouponCoupon;
      'api::customer.customer': ApiCustomerCustomer;
      'api::delivery-driver.delivery-driver': ApiDeliveryDriverDeliveryDriver;
      'api::delivery-zone.delivery-zone': ApiDeliveryZoneDeliveryZone;
      'api::employee.employee': ApiEmployeeEmployee;
      'api::equipment.equipment': ApiEquipmentEquipment;
      'api::faq.faq': ApiFaqFaq;
      'api::frequently-bought-together.frequently-bought-together': ApiFrequentlyBoughtTogetherFrequentlyBoughtTogether;
      'api::ingredient.ingredient': ApiIngredientIngredient;
      'api::inventory-movement.inventory-movement': ApiInventoryMovementInventoryMovement;
      'api::inventory.inventory': ApiInventoryInventory;
      'api::loyalty-program.loyalty-program': ApiLoyaltyProgramLoyaltyProgram;
      'api::maintenance-record.maintenance-record': ApiMaintenanceRecordMaintenanceRecord;
      'api::menu.menu': ApiMenuMenu;
      'api::newsletter.newsletter': ApiNewsletterNewsletter;
      'api::notification.notification': ApiNotificationNotification;
      'api::order.order': ApiOrderOrder;
      'api::payment.payment': ApiPaymentPayment;
      'api::points-transaction.points-transaction': ApiPointsTransactionPointsTransaction;
      'api::product.product': ApiProductProduct;
      'api::promotion.promotion': ApiPromotionPromotion;
      'api::purchase-order.purchase-order': ApiPurchaseOrderPurchaseOrder;
      'api::report.report': ApiReportReport;
      'api::review.review': ApiReviewReview;
      'api::salary.salary': ApiSalarySalary;
      'api::setting.setting': ApiSettingSetting;
      'api::shift.shift': ApiShiftShift;
      'api::store-branch.store-branch': ApiStoreBranchStoreBranch;
      'api::supplier.supplier': ApiSupplierSupplier;
      'api::support-ticket.support-ticket': ApiSupportTicketSupportTicket;
      'api::tax-configuration.tax-configuration': ApiTaxConfigurationTaxConfiguration;
      'api::wishlist.wishlist': ApiWishlistWishlist;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
