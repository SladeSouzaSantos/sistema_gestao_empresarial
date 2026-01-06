FROM node:22-alpine AS build
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza cache)
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Injeta a URL da API (usando o domínio da Phasscode)
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Estágio de Produção (Nginx)
FROM nginx:alpine
# ATENÇÃO: Se for Vite, mude /build para /dist abaixo
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]