# Cuidador Digital - Sistema de Lembretes de Medicação

Sistema completo de lembretes automáticos de medicação via WhatsApp para idosos, com monitoramento em tempo real e alertas para familiares.

## 🎯 Funcionalidades Principais

### 📝 Cadastro e Formulário
- ✅ Formulário para responsável (nome, WhatsApp, email opcional)
- ✅ Formulário para idoso (nome, WhatsApp, fuso horário)
- ✅ Contatos de emergência (até 2 contatos)
- ✅ Cadastro de medicamentos múltiplos (nome, dosagem, horários, dias da semana)
- ✅ Consentimento LGPD obrigatório
- ✅ Integração com Firebase para armazenamento

### 📱 Integração WhatsApp (Twilio)
- 🔄 Lembretes automáticos via WhatsApp
- 🔄 Sistema de respostas (1=Tomei, 2=Não tomei, 3=Adiar 10min)
- 🔄 Atualização de status no Firebase
- 🔄 Alertas após 20min sem resposta
- 🔄 Função opt-out ("SAIR")

### 🤖 Mensagens Automáticas
- ✅ Template de lembrete personalizado
- ✅ Confirmações para cada tipo de resposta
- ✅ Alertas de escalonamento
- ✅ Relatórios diários
- ✅ Mensagem de boas-vindas

### 📊 Painel Administrativo
- 🔄 Visualização de idosos e medicamentos
- 🔄 Status das respostas em tempo real
- 🔄 Botão para lembretes manuais
- 🔄 Histórico de mensagens
- 🔄 Relatórios e estatísticas

## 🏗️ Arquitetura

### Frontend (React + TypeScript)
```
src/
├── components/           # Componentes React organizados
│   ├── forms/           # Formulários de cadastro
│   ├── Header.tsx       # Cabeçalho da aplicação
│   ├── Hero.tsx         # Seção principal
│   ├── Features.tsx     # Lista de funcionalidades
│   └── ...
├── hooks/               # Hooks customizados
│   ├── useFirebase.ts   # Integração com Firebase
│   └── useTwilio.ts     # Integração com Twilio
├── services/            # Serviços de API
├── utils/               # Utilitários e helpers
└── types/               # Definições TypeScript
```

### Backend (Recomendado: Node.js + Express)
```
api/
├── routes/
│   ├── registration.js  # Endpoints de cadastro
│   ├── whatsapp.js      # Webhooks do Twilio
│   └── reports.js       # Relatórios e analytics
├── services/
│   ├── firebase.js      # Conexão com Firebase
│   ├── twilio.js        # Cliente Twilio
│   └── scheduler.js     # Agendamento de lembretes
└── middleware/
    ├── auth.js          # Autenticação
    └── validation.js    # Validação de dados
```

## 🔧 Configuração

### Variáveis de Ambiente Necessárias

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id

# Twilio
VITE_TWILIO_ACCOUNT_SID=AC_your_account_sid
VITE_TWILIO_AUTH_TOKEN=your_auth_token
VITE_TWILIO_PHONE_NUMBER=+5511999999999
```

### Firebase Collections
```
responsaveis/
├── nome: string
├── whatsapp: string
├── email?: string
└── createdAt: timestamp

idosos/
├── nome: string
├── whatsapp: string
├── fusoHorario: string
├── responsavelId: string
└── createdAt: timestamp

medicamentos/
├── nome: string
├── dosagem: string
├── horarios: string[]
├── diasDaSemana: number[]
├── idosoId: string
└── ativo: boolean

contatos_emergencia/
├── nome: string
├── whatsapp: string
└── idosoId: string

lembretes_status/
├── medicamentoId: string
├── idosoId: string
├── dataHora: timestamp
├── status: enum
├── tentativas: number
└── ultimaResposta?: timestamp
```

## 🧪 Testes

### Checklist de Funcionalidades
- [ ] Cadastrar responsável + idoso + 1 remédio
- [ ] Enviar lembrete manual → idoso recebe no WhatsApp
- [ ] Responder "1" → status atualizado no painel
- [ ] Responder "2" → registrado como não tomado
- [ ] Responder "3" → novo lembrete em 10min
- [ ] Sem resposta → alerta após 20min
- [ ] Responder "SAIR" → interrompe mensagens
- [ ] Relatório diário enviado ao responsável

## 🚀 Próximos Passos

1. **Configurar Firebase**: Criar projeto e configurar Firestore
2. **Configurar Twilio**: Obter credenciais e configurar webhook
3. **Implementar Backend**: API para processar webhooks e agendar lembretes
4. **Integrar Pagamentos**: Sistema de assinatura (Stripe)
5. **Painel Admin**: Interface para gerenciamento completo
6. **Testes**: Implementar suite de testes automatizados

## 📱 Fluxo de Mensagens

1. **Lembrete**: Sistema envia lembrete no horário configurado
2. **Resposta**: Idoso responde 1, 2 ou 3
3. **Processamento**: Sistema processa resposta e atualiza status
4. **Confirmação**: Mensagem de confirmação é enviada
5. **Alerta**: Se sem resposta em 20min, familiares são notificados
6. **Relatório**: Relatório diário enviado aos responsáveis

## 🔒 Segurança e Compliance

- ✅ Consentimento LGPD obrigatório
- ✅ Dados criptografados no Firebase
- ✅ Comunicação segura via HTTPS
- ✅ Logs de auditoria para compliance
- ✅ Direito ao esquecimento implementado