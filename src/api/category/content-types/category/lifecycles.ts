/**
 * Lifecycle hooks for the Product Content-Type
 * 
 * @see {@link https://docs.strapi.io/dev-docs/backend-customization/models#available-lifecycle-events|Strapi Lifecycle Events Documentation}
 * @example
 * // Example of a custom lifecycle hook
 * beforeCreate(event) {
 *   const { data } = event.params;
 *   // Your custom logic here
 * }
 */

export default {
  beforeCreate(event) {
    // Evento disparado antes de criar um registro
    const { 
      data,         // Dados a serem salvos
      select,       // Campos selecionados
      populate,     // Relacionamentos para popular
      state,        // Estado da requisição
      model,        // Modelo do Strapi
      params,       // Parâmetros da requisição
      request,      // Objeto de requisição HTTP
      response,     // Objeto de resposta HTTP
      isBulk,       // Se é uma operação em lote
      uid,          // UID do modelo
      action,       // Ação sendo executada
      modelName,    // Nome do modelo
      modelId,      // ID do modelo (se aplicável)
      modelIds,     // IDs dos modelos (para operações em lote)
      transaction   // Transação do banco de dados
    } = event;
  },

  beforeCreateMany(event) {
    // Evento disparado antes de criar múltiplos registros
    const { 
      data,         // Array de dados a serem salvos
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      isBulk,       // Será true para operações em lote
      uid,
      action,
      modelName,
      modelIds,
      transaction
    } = event;
  },

  afterCreate(event) {
    // Evento disparado após criar um registro
    const { 
      result,       // Resultado da operação
      params,
      model,
      state,
      uid,
      action,
      modelName,
      modelId,
      transaction
    } = event;
  },

  afterCreateMany(event) {
    // Evento disparado após criar múltiplos registros
    const { 
      result,       // Array de resultados
      params,
      model,
      state,
      uid,
      action,
      modelName,
      modelIds,
      transaction
    } = event;
  },

  beforeUpdate(event) {
    // Evento disparado antes de atualizar um registro
    const { 
      data,         // Dados a serem atualizados
      where,        // Condições de busca
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      isBulk,
      uid,
      action,
      modelName,
      modelId,
      transaction
    } = event;
  },

  beforeUpdateMany(event) {
    // Evento disparado antes de atualizar múltiplos registros
    const { 
      data,
      where,
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      isBulk,  // Será true para operações em lote
      uid,
      action,
      modelName,
      modelIds,
      transaction
    } = event;
  },

  afterUpdate(event) {
    // Evento disparado após atualizar um registro
    const { 
      result,
      params,
      model,
      state,
      uid,
      action,
      modelName,
      modelId,
      transaction
    } = event;
  },

  afterUpdateMany(event) {
    // Evento disparado após atualizar múltiplos registros
    const { 
      result,
      params,
      model,
      state,
      uid,
      action,
      modelName,
      modelIds,
      transaction
    } = event;
  },

  beforeDelete(event) {
    // Evento disparado antes de deletar um registro
    const { 
      where,
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      isBulk,
      uid,
      action,
      modelName,
      modelId,
      transaction
    } = event;
  },

  beforeDeleteMany(event) {
    // Evento disparado antes de deletar múltiplos registros
    const { 
      where,
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      isBulk,  // Será true para operações em lote
      uid,
      action,
      modelName,
      modelIds,
      transaction
    } = event;
  },

  afterDelete(event) {
    // Evento disparado após deletar um registro
    const { 
      result,
      params,
      model,
      state,
      uid,
      action,
      modelName,
      modelId,
      transaction
    } = event;
  },

  afterDeleteMany(event) {
    // Evento disparado após deletar múltiplos registros
    const { 
      result,
      params,
      model,
      state,
      uid,
      action,
      modelName,
      modelIds,
      transaction
    } = event;
  },

  beforeCount(event) {
    // Evento disparado antes de contar registros
    const { 
      where,
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      uid,
      action,
      modelName,
      transaction
    } = event;
  },

  afterCount(event) {
    // Evento disparado após contar registros
    const { 
      result,
      params,
      model,
      state,
      uid,
      action,
      modelName,
      transaction
    } = event;
  },

  beforeFindOne(event) {
    // Evento disparado antes de buscar um registro
    const { 
      where,
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      uid,
      action,
      modelName,
      transaction
    } = event;
  },

  afterFindOne(event) {
    // Evento disparado após buscar um registro
    const { 
      result,
      params,
      model,
      state,
      uid,
      action,
      modelName,
      transaction
    } = event;
  },

  beforeFindMany(event) {
    // Evento disparado antes de buscar múltiplos registros
    const { 
      where,
      select,
      populate,
      state,
      model,
      params,
      request,
      response,
      uid,
      action,
      modelName,
      transaction
    } = event;
  },

  afterFindMany(event) {
    // Evento disparado após buscar múltiplos registros
    const { 
      result,
      params,
      model,
      state,
      uid,
      action,
      modelName,
      transaction
    } = event;
  }
};
