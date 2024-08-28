


# Projeto Full-Stack com React e NestJS

Este projeto é uma aplicação full-stack utilizando React no frontend, NestJS no backend e PostgreSQL como banco de dados. Toda a infraestrutura está configurada para ser executada via Docker.

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Variáveis de Ambiente

### Frontend

Configure as variáveis de ambiente no arquivo `.env` na pasta `frontend`:

```env
VITE_REACT_API_URL="http://127.0.0.1:3000"
```

### Backend

Configure as variáveis de ambiente no arquivo `.env` na pasta `backend`:

```env
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=usuario
POSTGRES_PASSWORD=senha
POSTGRES_DATABASE=banco
JWT_SECRET=fojnapoivnanNOCNEPONV0s089704
NODE_ENV="development"
```

## Instruções de Execução

### Backend e Banco de Dados

1. Execute o seguinte comando para iniciar o backend e o banco de dados PostgreSQL:
   ```bash
   docker-compose up
   ```

Isso irá configurar e iniciar o servidor backend do NestJS junto com o banco de dados PostgreSQL.

### Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   npm run dev
   ```

O frontend estará disponível em `http://localhost:3001` por padrão.

## Acessando a Aplicação

- **Frontend:** Acesse `http://localhost:5173` no seu navegador.
- **Backend:** O backend estará rodando em `http://localhost:3000`.



## Tecnologias Utilizadas

- **Frontend:** React, Vite
- **Backend:** NestJS
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker, Docker Compose


