# 🚀 Rede Social Fullstack (Python + React)

Uma aplicação web completa de rede social desenvolvida para fins de portfólio, integrando um backend moderno em **Python (FastAPI)** com uma interface reativa em **React JS**, estilizada com **Tailwind CSS** e integrada a um banco de dados em nuvem.

## 📌 Sobre O Projeto
Este projeto simula uma linha do tempo onde os usuários podem se cadastrar, fazer login, publicar conteúdos e interagir através do sistema de comentários ("cooperar") em tempo real. Foi construído com foco em boas práticas de arquitetura full stack, separação de responsabilidades e comunicação via API REST.

---

## 🛠️ Tecnologias Utilizadas

### **Backend (API)**
- **Python**
- **FastAPI** (Framework web de alta performance)
- **Uvicorn** (Servidor ASGI)
- **SQLAlchemy** (ORM para banco de dados)
- **PostgreSQL / Supabase** (Banco de dados relacional em nuvem)

### **Frontend (Interface)**
- **React JS**
- **React Router** (Gerenciamento de rotas)
- **Tailwind CSS** (Estilização minimalista e responsiva)
- **JavaScript (ES6+)**

---

## ⚙️ Como Executar o Projeto Localmente

Para rodar a aplicação na sua máquina, você precisará ter o **Python** e o **Node.js** instalados.

### 1. Clonar o repositório
```bash
git clone [https://github.com/ypiaza/nome-do-repositorio.git](https://github.com/ypiaza/nome-do-repositorio.git)
cd nome-do-repositorio

```

### 2. Configurar e Rodar o Backend (Python)

Abra um terminal na pasta do backend:

```bash
# Cria o ambiente virtual
python -m venv venv

# Ativa o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Mac/Linux:
source venv/bin/activate

# Instala as dependências
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic

# Inicia o servidor da API
uvicorn main:app --reload

```

> O backend estará rodando em: `http://127.0.0.1:8000`
> Você pode acessar a documentação automática interativa em: `http://127.0.0.1:8000/docs`

### 3. Executar o Frontend (React)

Abra um **novo terminal** na pasta do seu projeto React:

```bash
# Instala as dependências (se ainda não o fez)
npm install

# Inicia a aplicação React
npm start

```

> O frontend abrirá automaticamente em: `http://localhost:3000`

---

## 📝 Rotas da API (FastAPI)

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/users` | Retorna a lista de todos os usuários cadastrados. |
| `POST` | `/users` | Cadastra um novo usuário (`login` e `senha`). |
| `GET` | `/posts` | Retorna a lista de todas as postagens cadastradas. |
| `POST` | `/posts` | Cria uma nova postagem enviando `autor` e `conteudo`. |
| `GET` | `/posts/{post_id}/comments` | Retorna as cooperações (comentários) de um post específico. |
| `POST` | `/posts/{post_id}/comments` | Cria uma nova cooperação em um post. |

---

## 💡 Próximos Passos e Melhorias Futuras

* [x] Conectar a um banco de dados real (PostgreSQL / Supabase via SQLAlchemy).
* [x] Sistema de comentários ("cooperar") nos posts.
* [ ] Implementar autenticação de usuários com segurança avançada / JWT Tokens.
* [ ] Sistema completo de reações (concordar / discordar).

---

## 👨‍💻 Autor

Desenvolvido por [Yuri Piaza](https://github.com/ypiaza). Sinta-se à vontade para contribuir ou entrar em contato!

```

```
