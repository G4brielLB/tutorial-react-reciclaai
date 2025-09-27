# ReciclaAI API Mock

Uma API simulada para gerenciamento de agendamentos e coletas de resíduos do aplicativo ReciclaAI.

## 🚀 Como executar

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2. Executar o servidor
```bash
uvicorn main:app --reload
```

A API estará disponível em: `http://localhost:8000`

### 3. Acessar documentação
- Documentação interativa: `http://localhost:8000/docs`
- Documentação alternativa: `http://localhost:8000/redoc`

## 📋 Endpoints disponíveis

### Agendamentos

#### `GET /agendamentos`
Retorna todos os agendamentos cadastrados.

**Resposta:**
```json
[
  {
    "id": "agend_001",
    "dataHora": "2025-09-20T14:30:00",
    "status": "pendente",
    "produtorId": "user_123",
    "residuoId": "residuo_papel"
  }
]
```

#### `POST /agendamentos`
Cria um novo agendamento.

**Payload de exemplo:**
```json
{
  "produtorId": "user_123",
  "residuoId": "residuo_456",
  "dataHora": "2025-09-20T14:30:00"
}
```

**Resposta:**
```json
{
  "id": "generated_id",
  "dataHora": "2025-09-20T14:30:00",
  "status": "pendente",
  "produtorId": "user_123",
  "residuoId": "residuo_456"
}
```

### Coletas

#### `GET /coletas`
Retorna todas as coletas cadastradas.

**Resposta:**
```json
[
  {
    "id": "coleta_001",
    "dataHora": "2025-09-19T08:00:00",
    "local": "Rua das Palmeiras, 456 - Jardim Verde",
    "status": "concluida",
    "coletorId": "coletor_001",
    "receiverId": "receiver_001",
    "residuoId": "residuo_papel"
  }
]
```

#### `POST /coletas`
Cria uma nova coleta.

**Payload de exemplo:**
```json
{
  "coletorId": "coletor_789",
  "receiverId": "receiver_101",
  "residuoId": "residuo_456",
  "local": "Rua das Flores, 123 - Centro",
  "dataHora": "2025-09-21T09:00:00"
}
```

**Resposta:**
```json
{
  "id": "generated_id",
  "dataHora": "2025-09-21T09:00:00",
  "local": "Rua das Flores, 123 - Centro",
  "status": "pendente",
  "coletorId": "coletor_789",
  "receiverId": "receiver_101",
  "residuoId": "residuo_456"
}
```

## 📊 Status possíveis

### Agendamentos
- `pendente`: Aguardando processamento
- `concluido`: Agendamento realizado com sucesso
- `cancelado`: Agendamento cancelado

### Coletas
- `pendente`: Coleta agendada, aguardando início
- `em_andamento`: Coleta sendo realizada
- `concluida`: Coleta finalizada com sucesso

## 🔔 Funcionalidades

- **Persistência em memória**: Os dados são armazenados em listas Python (resetam ao reiniciar o servidor)
- **Dados pré-carregados**: A API já inicia com alguns agendamentos e coletas de exemplo
- **Notificações simuladas**: Quando uma nova coleta é criada, uma mensagem é exibida no console
- **Validação automática**: Usa Pydantic para validar os dados de entrada
- **Documentação interativa**: Disponível através do Swagger UI em `/docs`

## 🛠️ Tecnologias

- **FastAPI**: Framework web moderno e rápido
- **Pydantic**: Validação de dados usando anotações de tipo Python
- **Uvicorn**: Servidor ASGI para execução da aplicação