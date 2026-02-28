# Desafio Flugo

## Como rodar o projeto localmente

1. **Clone o repositório:**
  ```bash
  git clone <url-do-repositorio>
  cd Desafio_Flugo
  ```

2. **Instale as dependências:**
  ```bash
  npm install
  ```

3. **Configure as variáveis de ambiente:**
  Crie um arquivo `.env` na raiz do projeto (copie o .env.example) com as variáveis do Firebase. Exemplo:
  ```env
  VITE_FIREBASE_API_KEY=...
  VITE_FIREBASE_AUTH_DOMAIN=...
  VITE_FIREBASE_PROJECT_ID=...
  VITE_FIREBASE_STORAGE_BUCKET=...
  VITE_FIREBASE_MESSAGING_SENDER_ID=...
  VITE_FIREBASE_APP_ID=...
  ```


4. **Cadastre um usuário no Firebase Authentication:**
   - Acesse o [console do Firebase](https://console.firebase.google.com/).
   - Vá em "Authentication" > "Users" e clique em "Add user".
   - Cadastre um e-mail e senha para acessar o sistema.

5. **Inicie o servidor de desenvolvimento:**
  ```bash
  npm run dev
  ```

6. **Acesse o projeto:**
  Abra o navegador e acesse [http://localhost:5173](http://localhost:5173)

---
Projeto desenvolvido com React, TypeScript, Vite, MUI, Zod e Firebase.
