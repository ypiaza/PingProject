from pydantic import BaseModel

class UsuarioCriar(BaseModel):
    username: str
    senha: str

class UsuarioResposta(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True  