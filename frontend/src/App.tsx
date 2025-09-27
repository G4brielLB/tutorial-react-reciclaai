import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Historico from './pages/Historico';
import NovoAgendamento from './pages/NovoAgendamento';
import Mapa from './pages/Mapa';

const HomePage = () => (
  <div>
    <h1>Bem-vindo ao ReciclaAI ♻️</h1>
    <p>Nosso primeiro Hello World com React + TypeScript!</p>
  </div>
);


const App = () => (
  <BrowserRouter>
    <Navbar />
    <div style={{ padding: '1rem' }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/agendamentos' element={<NovoAgendamento />} />
        <Route path='/historico' element={<Historico />} />
        <Route path='/mapa' element={<Mapa />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;