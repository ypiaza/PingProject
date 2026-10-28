from sqlalchemy import Column, Integer, String
from database import Base

# Tabela de Usuários (substitui a lista de usuários antiga)
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    login = Column(String, unique=True, index=True)
    senha = Column(String)

# Tabela de Posts (substitui a lista de posts antiga)
class PostModel(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    autor = Column(String)
    conteudo = Column(String)

# Tabela Cooperar
class CommentModel(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    post_id = Column(Integer)  
    autor = Column(String)     
    conteudo = Column(String)  

# Tabela concordar/discordar

class InterationModel(Base):
    __tablename__ = "interations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    post_id = Column(Integer)
    concordar_action = Column(Integer)
    discordar_action = Column(Integer)