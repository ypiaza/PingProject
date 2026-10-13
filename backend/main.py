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
    {"id": 1, "autor": "Maria", "conteudo": "Estudando muito hoje!"},
    {"id": 2, "autor": "Nath", "conteudo": "O dia está lindo!"}
]

class PostCreate(BaseModel):
    autor: str
    conteudo: str


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