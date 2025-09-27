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