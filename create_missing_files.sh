#!/bin/bash

# Lista de todos os novos content-types criados
CONTENT_TYPES=(
  "analytics"
  "supplier"
  "inventory"
  "inventory-movement"
  "purchase-order"
  "employee"
  "shift"
  "salary"
  "loyalty-program"
  "points-transaction"
  "banner"
  "newsletter"
  "cart"
  "wishlist"
  "frequently-bought-together"
  "chat-message"
  "chat-conversation"
  "faq"
  "support-ticket"
  "store-branch"
  "equipment"
  "maintenance-record"
  "tax-configuration"
)

# Função para criar controller
create_controller() {
  local name=$1
  local filename="src/api/$name/controllers/$name.ts"
  
  if [ ! -f "$filename" ]; then
    mkdir -p "src/api/$name/controllers"
    cat > "$filename" << EOF
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::$name.$name');
EOF
    echo "Created controller: $filename"
  fi
}

# Função para criar service
create_service() {
  local name=$1
  local filename="src/api/$name/services/$name.ts"
  
  if [ ! -f "$filename" ]; then
    mkdir -p "src/api/$name/services"
    cat > "$filename" << EOF
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::$name.$name');
EOF
    echo "Created service: $filename"
  fi
}

# Função para criar route
create_route() {
  local name=$1
  local filename="src/api/$name/routes/$name.ts"
  
  if [ ! -f "$filename" ]; then
    mkdir -p "src/api/$name/routes"
    cat > "$filename" << EOF
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::$name.$name');
EOF
    echo "Created route: $filename"
  fi
}

# Criar todos os arquivos para cada content-type
for content_type in "${CONTENT_TYPES[@]}"; do
  echo "Processing $content_type..."
  create_controller "$content_type"
  create_service "$content_type"
  create_route "$content_type"
done

echo "All missing files created successfully!"
