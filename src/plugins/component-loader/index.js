'use strict';

/**
 * Component Loader plugin for Strapi
 * This plugin ensures that all components are loaded correctly
 */

module.exports = (/* { strapi } */) => {
  return {
    /**
     * Initialize the plugin
     */
    async bootstrap() {
      console.log('Initializing Component Loader plugin...');
      
      try {
        // Force load components
        const { components } = require('@strapi/strapi/lib/services/component');
        await components.loadComponents();
        
        console.log('Components loaded successfully:', Object.keys(components.components).join(', '));
      } catch (error) {
        console.error('Error loading components:', error);
      }
    },
  };
};
