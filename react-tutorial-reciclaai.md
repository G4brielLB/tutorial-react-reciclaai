# 📖 Tutorial de React — ReciclaAI

## 📌 Contexto
O **React** será responsável pelo **frontend do ReciclaAI**, fornecendo a interface responsiva que conecta produtores, coletores e receptores de resíduos recicláveis.  

### Por que React?
- 🔄 **Reutilização de componentes** → facilita criar telas padronizadas (listas, formulários, cards).  
- ⚡ **Performance** → usa Virtual DOM para renderizar apenas o que mudou.  
- 🌍 **Ecossistema maduro** → bibliotecas prontas para rotas, mapas, gráficos, autenticação etc.  
- 📱 **Portabilidade futura** → facilita a migração para **React Native**, caso o ReciclaAI evolua para app mobile nativo.  
- ✅ **Integração fácil** → comunica-se naturalmente com a API FastAPI via HTTP/JSON.  

---

## 🛠️ Preparação do Ambiente

### 1. Instalar Node.js
O **Node.js** é necessário para rodar o ambiente de desenvolvimento do React e o gerenciador de pacotes **npm** (ou yarn).  
Recomendamos instalar a versão **LTS (Long Term Support)**.  

🔗 [Download oficial do Node.js](https://nodejs.org/)  

Após a instalação, verifique se tudo está correto:  

```bash
node -v
npm -v
```


### 2. Criar o projeto React com TypeScript
Você pode criar o projeto React de duas formas principais:

#### Opção 1: Create React App (CRA)
Porta padrão: **3000**
```bash
npx create-react-app reciclaai-frontend --template typescript
cd reciclaai-frontend
npm start
```
Abra o navegador em [http://localhost:3000](http://localhost:3000) para ver o app rodando.

#### Opção 2: Vite (moderno e rápido)
Porta padrão: **5173**
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```
Abra o navegador em [http://localhost:5173](http://localhost:5173) para ver o app rodando.

> **Observação:** O restante do tutorial usa exemplos com Vite, mas todos os passos funcionam também para projetos criados com Create React App. Só fique atento à porta do servidor de desenvolvimento (3000 para CRA, 5173 para Vite).

---


## 🚀 Primeiro Passo no React — ReciclaAI

Agora que já temos o projeto React criado e rodando (`npm start` ou `npm run dev`), vamos começar a construir nossa aplicação.

Neste guia você vai aprender:
- Criar o primeiro Hello World no React.
- Criar um componente Navbar.
- Configurar o React Router para navegar entre páginas.

### 🎥 Tutorial em Vídeo

Se preferir aprender assistindo, confira o tutorial completo em vídeo:  
[https://youtu.be/s2u0AsXAIVA](https://youtu.be/s2u0AsXAIVA)

> **Observação:** A sintaxe dos códigos React no vídeo pode estar um pouco diferente dos exemplos da wiki, pois este tutorial está mais atualizado. No entanto, os códigos do vídeo também funcionam.

### 📝 1. Hello World no React

O arquivo `src/App.tsx` é o **componente principal** da nossa aplicação.  
Ele funciona como a página inicial do projeto — é a partir dele que outros componentes serão renderizados.

Por padrão, quando criamos o projeto, o `App.tsx` já vem com algum conteúdo inicial (um logo do React e estilos).  
Vamos simplificar isso para escrever nosso primeiro **Hello World**.

Edite o arquivo `src/App.tsx` e substitua o conteúdo por:


```tsx
// src/App.tsx
import './App.css';

const App = () => (
  <div>
    <h1>Bem-vindo ao ReciclaAI ♻️</h1>
    <p>Nosso primeiro Hello World com React + TypeScript!</p>
  </div>
);

export default App;
```

Para ajustar a estilização do nosso principal componente (App.tsx) podemos editar o 'src/App.css'. No nosso exemplo, seguiremos com:

```css

body {
  background: linear-gradient(120deg, #e8f5e9 0%, #e3f2fd 100%);
  min-height: 100vh;
  font-family: 'Inter', Arial, sans-serif;
  color: #222;
  margin: 0;
}

#root {
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 #b0bec5;
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #388e3c;
  margin-bottom: 0.5em;
}

h2 {
  color: #1976d2;
  margin-bottom: 0.5em;
}

nav {
  background: #388e3c;
  padding: 0.7em 0;
  border-radius: 12px;
  margin-bottom: 2em;
}

nav a {
  color: #fff;
  text-decoration: none;
  margin: 0 1.2em;
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover {
  color: #c8e6c9;
}

p {
  color: #607d8b;
}
```

2. Salve os arquivos.
3. No navegador, acesse a porta do seu projeto:
  - CRA: [http://localhost:3000](http://localhost:3000)
  - Vite: [http://localhost:5173](http://localhost:5173)
  A tela deve atualizar automaticamente e mostrar a mensagem acima.


### 🌐 2. Configurando o React Router

O React Router é a biblioteca oficial para criar rotas em aplicações React.

#### 2.1. Instalar a biblioteca

No terminal do projeto, rode:

```bash
npm install react-router-dom
```

#### 2.2. Configurar as rotas

Edite o arquivo `src/App.tsx` para usar o Router:


```tsx
// src/App.tsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Bem-vindo ao ReciclaAI ♻️</h1>
    <p>Nosso primeiro Hello World com React + TypeScript!</p>
  </div>
);

const AgendamentosPage = () => <h2>Página de Agendamentos</h2>;
const HistoricoPage = () => <h2>Histórico de Agendamentos</h2>;

const App = () => (
  <BrowserRouter>
    <div style={{ padding: '1rem' }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/agendamentos' element={<AgendamentosPage />} />
        <Route path='/historico' element={<HistoricoPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
```

#### 2.3. Testar a navegação

Para testar as rotas, acesse manualmente os endereços no navegador:

- `http://localhost:3000` ou `http://localhost:5173` → mostra a Página Inicial.
- `http://localhost:3000/agendamentos` ou `http://localhost:5173/agendamentos` → mostra a Página de Agendamentos.
- `http://localhost:3000/historico` ou `http://localhost:5173/historico` → mostra o Histórico de Agendamentos.

Em breve, criaremos a Navbar para facilitar a navegação entre as páginas.

### 🧩 3. Criando a Navbar

Agora vamos criar nosso primeiro componente: uma barra de navegação.

Crie um arquivo chamado `src/components/Navbar.tsx` com o seguinte código:


```tsx
// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem' }}>
    <Link to='/' style={{ marginRight: '1rem' }}>🏠 Início</Link>
    <Link to='/agendamentos' style={{ marginRight: '1rem' }}>📅 Agendamentos</Link>
    <Link to='/historico'>📜 Histórico</Link>
  </nav>
);

export default Navbar;
```

Esse componente cria uma barra simples com três botões:

* Home
* Agendamentos
* Histórico

Para utilizar o componente Navbar em sua aplicação, siga estes passos:

1. Faça o import do Navbar no início do arquivo `App.tsx`:

```tsx
import Navbar from './components/Navbar';
```

2. Em seguida, inclua o componente `<Navbar />` dentro do `<BrowserRouter>`, antes da área principal de rotas. Assim, a barra de navegação estará presente em todas as páginas:

```tsx
const App = () => (
  <BrowserRouter>
    <Navbar />
    <div style={{ padding: '1rem' }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/agendamentos' element={<AgendamentosPage />} />
        <Route path='/historico' element={<HistoricoPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);
```

Dessa forma, a Navbar ficará visível e funcional em todas as rotas da aplicação.

### ✅ Recapitulando

Até agora você aprendeu a:

* Criar o primeiro Hello World no React.
* Configurar o React Router para navegação entre páginas.
* Criar um componente reutilizável (Navbar).

---

## 🔌 Conectando o Frontend à API (axios)

Vamos agora integrar o React à API FastAPI (mock) já disponível em http://localhost:8000.

### 🎥 Tutorial em Vídeo

Se preferir aprender assistindo, confira o tutorial completo em vídeo:  
[https://youtu.be/Kn5jlE_ttos](https://youtu.be/Kn5jlE_ttos)

### 1) Instalar o axios
```bash
npm install axios
```

### 2) Criar serviço HTTP
O arquivo api.ts configura uma instância do Axios para facilitar requisições HTTP à API do backend, centralizando o endereço base e os headers usados nas chamadas. Isso simplifica e padroniza o acesso aos dados do servidor no projeto React.

`src/services/api.ts`:
```tsx
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});
```

### 3) Definir tipos
O arquivo agendamento.ts define os tipos TypeScript usados para representar e validar os dados de agendamentos no frontend, garantindo tipagem e segurança nas operações com a API.

`src/types/agendamento.ts`:
```tsx
export type StatusAgendamento = "pendente" | "concluido" | "cancelado";

export interface Agendamento {
  id: string;
  dataHora: string;
  status: StatusAgendamento;
  produtorId: string;
  residuos: string[];
}

export interface AgendamentoCreate {
  produtorId: string;
  residuos: string[];
  dataHora: string;
}
```

---

## 📄 Páginas: Histórico e Novo Agendamento

### 1) Histórico (GET /agendamentos)

`src/pages/Historico.tsx`:

```tsx
// src/pages/Historico.tsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Agendamento } from '../types/agendamento';
import '../styles/Historico.css';

const Historico = () => {
  const [dados, setDados] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get<Agendamento[]>('/agendamentos')
      .then((res) => setDados(res.data))
      .catch((e) => setErro(e?.message ?? 'Erro ao carregar'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Carregando…</div>;
  if (erro) return <div className="error">❌ {erro}</div>;
  if (!dados.length) return <div className="empty">📋 Sem agendamentos ainda.</div>;

  return (
    <div className="historico-container">
      <h2>Histórico de Agendamentos</h2>
      <ul className="agendamentos-lista">
        {dados.map((a) => (
          <li key={a.id} className="agendamento-item">
            <div className="agendamento-produtor">👤 {a.produtorId}</div>
            <div className="agendamento-data">📅 {new Date(a.dataHora).toLocaleString()}</div>
            <span className={`agendamento-status status-${a.status}`}>
              {a.status}
            </span>
            {a.residuos && a.residuos.length > 0 && (
              <ul className="residuos-lista">
                {a.residuos.map((tipoResiduo, idx) => (
                  <li key={idx} className="residuo-item">♻️ {tipoResiduo}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Historico;
```

```css
/*src/styles/Historico.css*/
.historico-container {
  max-width: 100%;
  margin: 0 auto;
}

.historico-container h2 {
  color: #1976d2;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.agendamentos-lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.agendamento-item {
  background: #f8f9fa;
  border-left: 4px solid #388e3c;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.agendamento-item:hover {
  transform: translateX(4px);
}

.agendamento-produtor {
  color: #1976d2;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.agendamento-data {
  color: #607d8b;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.agendamento-status {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.status-pendente {
  background: #fff3cd;
  color: #856404;
}

.status-concluido {
  background: #d4edda;
  color: #155724;
}

.status-cancelado {
  background: #f8d7da;
  color: #721c24;
}

.residuos-lista {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}

.residuo-item {
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.2rem 0.5rem;
  margin: 0.2rem 0.2rem 0 0;
  border-radius: 6px;
  font-size: 0.8rem;
}

.loading, .error, .empty {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  border-radius: 8px;
  margin: 1rem 0;
}
```

### 2) Novo Agendamento (POST /agendamentos)

`src/pages/NovoAgendamento.tsx`:

```tsx
// src/pages/NovoAgendamento.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { AgendamentoCreate } from '../types/agendamento';
import '../styles/NovoAgendamento.css';

const NovoAgendamento = () => {
  const [produtorId, setProdutorId] = useState('');
  const [residuosTexto, setResiduosTexto] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [tipoMensagem, setTipoMensagem] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensagem(null);
    try {
      const payload: AgendamentoCreate = {
        produtorId: produtorId.trim(),
        residuos: residuosTexto.split(',').map((s) => s.trim()).filter(Boolean),
        dataHora: new Date(dataHora).toISOString(),
      };
      await api.post('/agendamentos', payload);
      setMensagem('✅ Agendamento criado com sucesso!');
      setTipoMensagem('success');
      setTimeout(() => navigate('/agendamentos/historico'), 1500);
    } catch {
      setMensagem('❌ Erro ao salvar agendamento');
      setTipoMensagem('error');
    }
  };

  return (
    <div className="novo-agendamento-container">
      <h2>🗓️ Novo Agendamento</h2>
      <form onSubmit={onSubmit} className="agendamento-form">
        <div className="form-group">
          <input
            className="form-input"
            type='text'
            placeholder='👤 ID do Produtor (ex: user_123)'
            value={produtorId}
            onChange={(e) => setProdutorId(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            className="form-input"
            type='text'
            placeholder='♻️ Tipos de resíduos (ex: papel, plástico, vidro)'
            value={residuosTexto}
            onChange={(e) => setResiduosTexto(e.target.value)}
            required
          />
          <div className="form-hint">Separe os tipos de resíduo por vírgula</div>
        </div>
        
        <div className="form-group">
          <input
            className="form-input"
            type='datetime-local'
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
        </div>
        
        <button type='submit' className="submit-button">
          ➕ Criar Agendamento
        </button>
      </form>
      
      {mensagem && (
        <div className={`message ${tipoMensagem}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default NovoAgendamento;
```

```css
/*src/styles/NovoAgendamento.css*/
.novo-agendamento-container {
  max-width: 100%;
  margin: 0 auto;
}

.novo-agendamento-container h2 {
  color: #1976d2;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.agendamento-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #388e3c;
  box-shadow: 0 0 0 3px rgba(56, 142, 60, 0.1);
}

.form-input::placeholder {
  color: #9e9e9e;
}

.submit-button {
  width: 100%;
  background: linear-gradient(135deg, #388e3c 0%, #4caf50 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(56, 142, 60, 0.3);
}

.submit-button:active {
  transform: translateY(0);
}

.message {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-hint {
  font-size: 0.85rem;
  color: #607d8b;
  margin-top: 0.3rem;
}
```

### 3) Atualizar Router e Navbar

```tsx
// src/App.tsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Historico from './pages/Historico';
import NovoAgendamento from './pages/NovoAgendamento';

const HomePage = () => (
  <div>
    <h1>Bem-vindo ao ReciclaAI ♻️</h1>
    <p>Nosso primeiro Hello World com React + TypeScript!</p>
  </div>
);

const App = () => (
  <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
          <Route path="/agendamentos/historico" element={<Historico />} />
        </Routes>
      </div>
    </BrowserRouter>
);

export default App;
```

```tsx
// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem' }}>
    <Link to='/' style={{ marginRight: '1rem' }}>🏠 Início</Link>
    <Link to='/agendamentos/novo' style={{ marginRight: '1rem' }}>📅 Novo Agendamento</Link>
    <Link to='/agendamentos/historico'>📜 Histórico</Link>
  </nav>
);

export default Navbar;
```

---

## 🗺️ Página de Mapa (Leaflet)

### 1) Instalar dependências
```bash
npm install leaflet react-leaflet
```

### 2) Criar página

`src/pages/Mapa.tsx`:

```tsx
// src/pages/Mapa.tsx
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/Mapa.css';

// Solução para corrigir os ícones do Leaflet no Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const mockPontos = [
    { id: 'p1', lat: -5.0561750518919, lng: -42.78985923139746, titulo: 'Depto. Computação UFPI' }, // Departamento de Computação
    { id: 'p2', lat: -5.056682307320944, lng: -42.79735257825805, titulo: 'CCHL UFPI' }, // CCHL
];

const Mapa = () => {
  const [pontos] = useState(mockPontos);
const center: [number, number] = [
    (pontos[0].lat + pontos[1].lat) / 2,
    (pontos[0].lng + pontos[1].lng) / 2,
];

  return (
    <div className="mapa-container">
      <h2>📍 Mapa de Pontos de Coleta</h2>
      <div className="mapa-wrapper">
        <MapContainer center={center} zoom={13} className="leaflet-container">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {pontos.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <strong>♻️ {p.titulo}</strong>
                <br />
                Ponto de coleta disponível
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapa;
```

```css
/*src/styles/Mapa.css*/
.mapa-container {
  max-width: 100%;
  margin: 0 auto;
}

.mapa-container h2 {
  color: #1976d2;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.mapa-wrapper {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.leaflet-container {
  height: 400px !important;
  width: 100% !important;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e0e0e0;
}

.leaflet-popup-content-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.leaflet-popup-content {
  color: #222;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 500;
}

.leaflet-popup-tip {
  background: #fff;
}

/* Customização dos controles de zoom */
.leaflet-control-zoom {
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
}

.leaflet-control-zoom a {
  background: #388e3c !important;
  color: #fff !important;
  border: none !important;
  width: 30px !important;
  height: 30px !important;
  line-height: 30px !important;
  text-align: center !important;
  font-weight: bold !important;
  transition: background 0.2s !important;
}

.leaflet-control-zoom a:hover {
  background: #2e7d32 !important;
}

/* Estilização dos marcadores personalizados */
.custom-marker {
  background: #388e3c;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Responsividade */
@media (max-width: 768px) {
  .mapa-wrapper {
    padding: 0.5rem;
  }
  
  .leaflet-container {
    height: 300px !important;
  }
  
  .mapa-container h2 {
    font-size: 1.5rem;
  }
}
```

### 3) Adicionar rota
```tsx
<Route path="/mapa" element={<Mapa />} />
```

---


## 🏗️ Build de Produção

Quando terminar o desenvolvimento, gere o build otimizado do app.

### Create React App (porta padrão 3000)
```bash
npm run build
npx serve -s build
```

### Vite (porta padrão 5173)
```bash
npm run build
npm run preview
```

⚠️ Em produção, o app não roda em container de desenvolvimento. Ele será buildado e hospedado em um servidor ou serviço estático (como Vercel, Netlify ou hospedagem própria).

---

## ✅ Recapitulação

Você aprendeu a:
- Criar app React com TypeScript (via CRA ou Vite).
- Fazer um Hello World.
- Criar a Navbar.
- Usar React Router.
- Integrar com API mock (GET/POST).
- Criar Histórico e Novo Agendamento.
- Exibir pontos em um Mapa Leaflet.
- Gerar build de produção.