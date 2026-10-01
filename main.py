from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database import engine, Base, get_db
import models  
import schemas

from datetime import datetime, timedelta, timezone
import jwt
from jwt.exceptions import PyJWTError

from fastapi import WebSocket, WebSocketDisconnect
from typing import List


SECRET_KEY = "Teste@123"  # vai para o .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def criar_token_acesso(dados: dict) -> str:
    dados_para_codificar = dados.copy()
    
    # Define o horário de expiração do token (Tempo atual + 30 minutos)
    expiracao = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    dados_para_codificar.update({"exp": expiracao})
    
    # Gera e assina o JWT
    token_jwt = jwt.encode(dados_para_codificar, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def home():
    return{'message': 'API funcionando'}

# Config de hash para senha 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def gerar_hash_senha(senha: str) -> str:
    senha_bytes = senha.encode('utf-8')[:72]
    return pwd_context.hash(senha_bytes.decode('utf-8', errors='ignore'))

# Rota para cadastrar um novo usuário 
@app.post("/usuarios/", response_model=schemas.UsuarioResposta, status_code=status.HTTP_201_CREATED)
def criar_usuario(usuario: schemas.UsuarioCriar, db: Session = Depends(get_db)):
    # Verifica se já existe um usuário com esse username
    usuario_existente = db.query(models.UsuarioModel).filter(models.UsuarioModel.username == usuario.username).first()
    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nome de usuário já está em uso."
        )
    # Criptografa a senha do usuário
    senha_criptografada = gerar_hash_senha(usuario.senha)

    # Cria a instância do modelo do banco de dados
    novo_usuario = models.UsuarioModel(
        username=usuario.username,
        senha_hash=senha_criptografada
    )

    # Salva no banco de dados 
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario


# Rota de Login 
@app.post("/login")
def login(usuario: schemas.UsuarioCriar, db: Session = Depends(get_db)):
    # Busca o usuário no banco pelo username
    usuario_db = db.query(models.UsuarioModel).filter(models.UsuarioModel.username == usuario.username).first()
    
    # Se o usuário não existir, lança um erro 400
    if not usuario_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Credenciais inválidas"
        )
    
    # Compara a senha informada com o hash salvo no banco
    senha_valida = pwd_context.verify(usuario.senha, usuario_db.senha_hash)
    if not senha_valida:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Credenciais inválidas"
        )
    
    # Se deu tudo certo, confirma a autenticação!
    token = criar_token_acesso(dados={"sub": usuario_db.username})
    
    return {
        "access_token": token,
        "token_type": "bearer"
    }


# Classe para gerenciar as conexões ativas do chat
class ConnectionManager:
    def __init__(self):
        # Lista de conexões ativas
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        # Envia a mensagem para TODOS os clientes conectados
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# Rota do WebSocket para o Chat 
@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket, token: str):
    # 1. Tenta validar e decodificar o token enviado na URL 
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            await websocket.close(code=1008)
            return
    except PyJWTError:
        # Se o token for inválido ou expirado, rejeita a conexão 
        await websocket.close(code=1008)
        return

    # 2. Se o token for válido, aceita a conexão
    await manager.connect(websocket)
    await manager.broadcast(f"📢 {username} entrou no chat!")
    
    try:
        while True:
            data = await websocket.receive_text()
            # 3. Formata a mensagem com o nome real do usuário 
            await manager.broadcast(f"{username}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"📢 {username} saiu do chat.")