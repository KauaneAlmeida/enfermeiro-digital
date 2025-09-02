// WhatsApp message templates for the Cuidador Digital system

export const createReminderMessage = (nomeIdoso: string, medicacao: string, dosagem: string): string => {
  return `Olá, ${nomeIdoso} 👋 — Hora do remédio ${medicacao} (${dosagem}). Responda: 1) ✅ Tomei 2) ❌ Não tomei 3) ⏳ Adiar 10 min.`;
};

export const createConfirmationMessage = (nomeIdoso: string, medicacao: string, response: '1' | '2' | '3'): string => {
  const messages = {
    '1': `Perfeito, ${nomeIdoso}! ✔️ Registramos que você tomou ${medicacao}. Obrigado!`,
    '2': `Entendido. Foi registrado que ${medicacao} não foi tomado. Se precisar de ajuda, fale com seu responsável.`,
    '3': `Ok, vamos lembrar de novo em 10 minutos — responda 1 quando tomar :)`
  };
  
  return messages[response] || 'Resposta não reconhecida. Responda: 1, 2 ou 3.';
};

export const createEmergencyAlert = (nomeIdoso: string, medicacao: string, hora: string): string => {
  return `⚠️ Alerta: ${nomeIdoso} não confirmou o remédio ${medicacao} das ${hora}.`;
};

export const createDailyReport = (
  nomeIdoso: string, 
  tomados: number, 
  total: number, 
  naoTomados: number, 
  adiados: number
): string => {
  return `📊 Relatório de hoje — ${nomeIdoso}\n\n✅ Tomados: ${tomados}/${total}\n❌ Não tomados: ${naoTomados}\n⏳ Adiados: ${adiados}`;
};

export const createWelcomeMessage = (nomeIdoso: string): string => {
  return `Olá, ${nomeIdoso}! 👋\n\nSou o Cuidador Digital e vou te ajudar a lembrar dos seus medicamentos.\n\nQuando receber um lembrete, responda:\n1️⃣ para "Tomei"\n2️⃣ para "Não tomei"\n3️⃣ para "Adiar 10 min"\n\nPara parar os lembretes, envie "SAIR".\n\nVamos cuidar da sua saúde juntos! 💙`;
};

export const createOptOutConfirmation = (nomeIdoso: string): string => {
  return `${nomeIdoso}, os lembretes foram interrompidos conforme solicitado.\n\nPara reativar, entre em contato com seu responsável.\n\nCuide-se! 💙`;
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Brazilian phone numbers should have 10 or 11 digits
  return digits.length === 10 || digits.length === 11;
};

export const formatPhoneForWhatsApp = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  
  return digits;
};