"""
API Mock do ReciclaAI
====================
Uma API simulada para gerenciamento de agendamentos de resíduos.
Esta API simula a entidade principal: Agendamento.

Executar com: uvicorn main:app --reload
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Literal
from datetime import datetime
from uuid import uuid4, UUID
import json

# Inicialização da aplicação FastAPI
app = FastAPI(
    title="ReciclaAI API Mock",
    description="API simulada para gerenciamento de agendamentos de resíduos",
    version="1.0.0"
)

# Configuração do CORS para permitir acesso do frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ========================
# MODELOS PYDANTIC
# ========================

class AgendamentoCreate(BaseModel):
    """
    Modelo para criação de um novo agendamento.
    
    Exemplo de payload JSON para POST /agendamentos:
    {
        "produtorId": "user_123",
        "residuos": ["residuo_456", "residuo_789"],
        "dataHora": "2025-09-20T14:30:00"
    }
    """
    produtorId: str = Field(..., description="ID do usuário que criou o agendamento")
    residuos: List[str] = Field(..., description="Lista de IDs dos resíduos a serem coletados")
    dataHora: datetime = Field(..., description="Data e hora do agendamento")


class Agendamento(BaseModel):
    """
    Modelo completo de um agendamento.
    Usado para retornar agendamentos nas rotas GET e POST.
    """
    id: str = Field(..., description="ID único do agendamento")
    dataHora: datetime = Field(..., description="Data e hora do agendamento")
    status: Literal["pendente", "concluido", "cancelado"] = Field(..., description="Status do agendamento")
    produtorId: str = Field(..., description="ID do usuário que criou")
    residuos: List[str] = Field(..., description="Lista de IDs dos resíduos relacionados")


# ========================
# ARMAZENAMENTO EM MEMÓRIA
# ========================

# Lista de agendamentos pré-cadastrados
agendamentos_db: List[Agendamento] = [
    Agendamento(
        id="agend_001",
        dataHora=datetime(2025, 9, 20, 14, 30),
        status="concluido",
        produtorId="user_123",
        residuos=["residuo_papel"]
    ),
    Agendamento(
        id="agend_002",
        dataHora=datetime(2025, 9, 18, 10, 0),
        status="concluido",
        produtorId="user_123",
        residuos=["residuo_plastico"]
    ),
    Agendamento(
        id="agend_003",
        dataHora=datetime(2025, 9, 23, 16, 45),
        status="pendente",
        produtorId="user_123",
        residuos=["residuo_vidro"]
    )
]


# ========================
# FUNÇÕES AUXILIARES
# ========================

def gerar_id() -> str:
    """Gera um ID único usando UUID4."""
    return str(uuid4())


def simular_notificacao(tipo: str, dados: dict):
    """
    Simula o envio de uma notificação.
    Na aplicação real, isso enviaria notificações push, email, etc.
    """
    print(f"🔔 NOTIFICAÇÃO [{tipo.upper()}]:")
    print(f"   Dados: {json.dumps(dados, indent=2, default=str)}")
    print("-" * 50)


# ========================
# ROTAS DE AGENDAMENTOS
# ========================

@app.get("/agendamentos", response_model=List[Agendamento])
async def listar_agendamentos():
    """
    Retorna todos os agendamentos cadastrados.
    
    Resposta:
    - Lista com todos os agendamentos
    - Cada agendamento contém: id, dataHora, status, produtorId, residuos
    """
    return agendamentos_db


@app.post("/agendamentos", response_model=Agendamento, status_code=201)
async def criar_agendamento(agendamento_data: AgendamentoCreate):
    """
    Cria um novo agendamento.
    
    Entrada:
    - produtorId: ID do usuário que está criando
    - residuos: Lista de IDs dos resíduos para coleta
    - dataHora: Data e hora desejada (formato ISO)
    
    Retorna:
    - O agendamento criado com ID gerado e status "pendente"
    """
    # Cria novo agendamento com ID gerado automaticamente
    novo_agendamento = Agendamento(
        id=gerar_id(),
        dataHora=agendamento_data.dataHora,
        status="pendente",  # Todo agendamento inicia como pendente
        produtorId=agendamento_data.produtorId,
        residuos=agendamento_data.residuos
    )
    
    # Adiciona à lista em memória
    agendamentos_db.append(novo_agendamento)
    
    # Simula notificação de novo agendamento
    simular_notificacao("NOVO_AGENDAMENTO", {
        "agendamentoId": novo_agendamento.id,
        "produtorId": novo_agendamento.produtorId,
        "dataHora": novo_agendamento.dataHora.isoformat(),
        "residuos": novo_agendamento.residuos
    })
    
    return novo_agendamento


# ========================
# ROTA DE SAÚDE DA API
# ========================

@app.get("/")
async def root():
    """
    Rota raiz da API - informações básicas.
    Útil para verificar se o servidor está funcionando.
    """
    return {
        "message": "ReciclaAI API Mock está funcionando! 🌱♻️",
        "version": "1.0.0",
        "endpoints": {
            "agendamentos": {
                "GET /agendamentos": "Lista todos os agendamentos",
                "POST /agendamentos": "Cria um novo agendamento"
            }
        },
        "docs": "/docs",
        "total_agendamentos": len(agendamentos_db)
    }


# ========================
# CONFIGURAÇÃO DE STARTUP
# ========================

@app.on_event("startup")
async def startup_event():
    """
    Evento executado quando a aplicação inicia.
    Mostra informações úteis no console.
    """
    print("🚀 ReciclaAI API Mock iniciada!")
    print(f"📊 Agendamentos pré-carregados: {len(agendamentos_db)}")
    print("📖 Documentação disponível em: http://localhost:8000/docs")
    print("🔍 API funcionando em: http://localhost:8000/")
    print("-" * 50)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)