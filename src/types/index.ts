export interface Responsavel {
  id?: string;
  nome: string;
  whatsapp: string;
  email?: string;
  createdAt?: Date;
}

export interface Idoso {
  id?: string;
  nome: string;
  whatsapp: string;
  fusoHorario: string;
  responsavelId: string;
  createdAt?: Date;
}

export interface ContatoEmergencia {
  id?: string;
  nome: string;
  whatsapp: string;
  idosoId: string;
}

export interface Medicamento {
  id?: string;
  nome: string;
  dosagem: string;
  horarios: string[]; // HH:mm format
  diasDaSemana: number[]; // 0-6, where 0 is Sunday
  idosoId: string;
  ativo: boolean;
}

export interface LembreteStatus {
  id?: string;
  medicamentoId: string;
  idosoId: string;
  dataHora: Date;
  status: 'enviado' | 'tomou' | 'nao_tomou' | 'adiado' | 'sem_resposta';
  tentativas: number;
  ultimaResposta?: Date;
}

export interface ConsentimentoLGPD {
  responsavelId: string;
  aceito: boolean;
  dataAceite: Date;
  versao: string;
}

export interface FormStepProps {
  onNext: () => void;
  onPrevious?: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}