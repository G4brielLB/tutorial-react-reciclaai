import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem' }}>
    <Link to='/' style={{ marginRight: '1rem' }}>🏠 Início</Link>
    <Link to='/agendamentos' style={{ marginRight: '1rem' }}>📅 Agendamentos</Link>
    <Link to='/historico'>📜 Histórico</Link>
    <Link to='/mapa' style={{ marginLeft: '1rem' }}>🗺️ Mapa</Link>
  </nav>
);

export default Navbar;
