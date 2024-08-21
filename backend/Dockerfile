# Etapa 1: Compilar a aplicação
FROM node:18-alpine AS build

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY backend/package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos da aplicação para o diretório de trabalho
COPY backend/. .

# Compile a aplicação
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos compilados da etapa anterior
COPY --from=build /app/dist ./dist

# Copie as dependências para o container final
COPY --from=build /app/node_modules ./node_modules

# Defina a variável de ambiente para a porta que o NestJS utilizará
ENV PORT=3000

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
