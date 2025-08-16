'use strict';

const fs = require('fs');
const path = require('path');

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */
module.exports = async ({ strapi }) => {
  console.log('Inicializando configuração do Strapi...');
  
  // Função para listar arquivos recursivamente
  const listFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        listFiles(filePath, fileList);
      } else if (file.endsWith('schema.json')) {
        fileList.push(filePath);
      }
    });
    return fileList;
  };

  // Log de componentes encontrados
  try {
    const componentsDir = path.join(process.cwd(), 'src/components');
    console.log(`Procurando componentes em: ${componentsDir}`);
    
    if (fs.existsSync(componentsDir)) {
      const componentFiles = listFiles(componentsDir);
      console.log(`Encontrados ${componentFiles.length} arquivos de componentes:`);
      componentFiles.forEach(file => {
        console.log(`- ${file}`);
      });
    } else {
      console.error(`Diretório de componentes não encontrado: ${componentsDir}`);
    }
  } catch (error) {
    console.error('Erro ao listar componentes:', error);
  }

  // Log de componentes registrados
  if (strapi.components) {
    console.log('Componentes registrados no Strapi:');
    Object.entries(strapi.components).forEach(([key, component]) => {
      console.log(`- ${key}:`, {
        uid: component.uid,
        modelType: component.modelType,
        modelName: component.modelName,
        collectionName: component.collectionName,
        globalId: component.globalId,
        attributes: Object.keys(component.attributes || {})
      });
    });
  } else {
    console.error('Nenhum componente registrado no Strapi');
  }
};
