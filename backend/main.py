from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # Permite todos os headers
)

posts_db = [
    {
        "id": 1, 
        "autor": "Maria", 
        "conteudo": "Estudando muito hoje!",
    },
    {"id": 2, "autor": "Nath", "conteudo": "O dia está lindo!"}
]

users_db = [
    {"login": "yuri", "senha": "1234"}
]

class PostCreate(BaseModel):
    autor: str
    conteudo: str

class CoopPost(BaseModel):
    autor: str
    

class UserCreate(BaseModel):
    login: str
    senha: str


@app.get("/posts")
def listar_posts():
    return posts_db

@app.post("/posts")
def criar_post(post: PostCreate):
    novo_id = len(posts_db) + 1

    novo_post = {
        "id": novo_id,
        "autor": post.autor,
        "conteudo": post.conteudo
    }

    posts_db.append(novo_post)

    return  {"mensagem": "Post criado com sucesso!", "post": novo_post}

@app.get("/users")
def users_list():
    return users_db

@app.post("/users")
def criar_user(user: UserCreate):

    novo_user = {
        "login": user.login,
        "senha": user.senha
    }
    users_db.append(novo_user)


    return {"mensagem": "Novo usuário cadastrado!", "user": novo_user}

