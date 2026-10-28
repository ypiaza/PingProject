from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

# cria as tabelas automaticamente se elas ainda não existirem
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "https://pingsocial-project.vercel.app/"
]

# Função auxiliar (Dependência) para abrir e fechar a conexão com o banco a cada requisição
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# usuarios

@app.get("/users")
def listar_usuarios(db: Session = Depends(get_db)):
    # Busca todos os usuários cadastrados na tabela 'users' do Supabase
    usuarios = db.query(models.UserModel).all()
    return usuarios


@app.post("/users")
def cadastrar_usuario(dados: dict, db: Session = Depends(get_db)):
    # 1. Cria a instância do novo usuário no formato da tabela
    novo_usuario = models.UserModel(
        login=dados["login"], 
        senha=dados["senha"]
    )
    
    # 2. Adiciona e salva no Supabase
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    
    return {"mensagem": "Usuário cadastrado com sucesso!", "user": novo_usuario}


# posts

@app.get("/posts")
def listar_posts(db: Session = Depends(get_db)):
    # Busca todos os posts da tabela 'posts' do Supabase
    posts = db.query(models.PostModel).all()
    return posts


@app.post("/posts")
def criar_post(dados: dict, db: Session = Depends(get_db)):
    # 1. Cria a instância do novo post
    novo_post = models.PostModel(
        autor=dados["autor"], 
        conteudo=dados["conteudo"]
    )
    
    # 2. Adiciona e salva no Supabase
    db.add(novo_post)
    db.commit()
    db.refresh(novo_post)
    
    return {"mensagem": "Post publicado com sucesso!", "post": novo_post}

@app.get("/posts/{post_id}/comments")
def listar_comentarios(post_id: int, db: Session = Depends(get_db)):
    comentarios = db.query(models.CommentModel).filter(models.CommentModel.post_id == post_id).all()
    return comentarios

@app.post("/posts/{post_id}/comments")
def criar_comentario(post_id: int, dados: dict, db: Session = Depends(get_db)):
    novo_comentario = models.CommentModel(
        post_id=post_id,
        autor=dados["autor"],
        conteudo=dados["conteudo"]
    )
    
    db.add(novo_comentario)
    db.commit()
    db.refresh(novo_comentario)
    
    return {"mensagem": "Cooperado com sucesso!", "comment": novo_comentario}

@app.post("/posts/{post_id}/interations")
def criar_interacao(post_id: int, db: Session = Depends(get_db)):
    nova_interacao = models.InterationModel(
        post_id=post_id,
        concordar_action=concordar_action(len(concordar_action)),
        discordar_action=concordar_action(len(concordar_action)),
    )

    db.add(nova_interacao)
    db.commit()
    db.refresh(nova_interacao)
    