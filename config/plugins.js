module.exports = ({ env }) => ({
  // Configuração personalizada para carregar componentes
  'component-loader': {
    enabled: false, // Desativado para teste
    resolve: './src/plugins/component-loader',
  },
  // Outras configurações de plugins...
});
