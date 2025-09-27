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