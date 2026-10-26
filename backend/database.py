from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Alterado para a porta 6543 (porta correta do Pooler) e removido o espaço do início
DATABASE_URL = "postgresql+psycopg2://postgres.cfediqetzwykazmxrkct:V6VYhRRfibEIJrOs@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"

# O motor que gerencia as conexões
engine = create_engine(DATABASE_URL)

# A sessão que vai permitir fazer operações (salvar, buscar, etc.)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# A base para os nossos modelos de tabelas
Base = declarative_base()