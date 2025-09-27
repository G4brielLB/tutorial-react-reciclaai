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