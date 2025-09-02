import { useState } from 'react';

// Twilio configuration
const twilioConfig = {
  accountSid: process.env.VITE_TWILIO_ACCOUNT_SID,
  authToken: process.env.VITE_TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.VITE_TWILIO_PHONE_NUMBER
};

export const useTwilio = () => {
  const [isSending, setIsSending] = useState(false);

  const sendWhatsAppMessage = async (to: string, message: string) => {
    setIsSending(true);
    
    try {
      // In a real implementation, this would make an API call to your backend
      // that then uses Twilio to send the message
      console.log(`Sending WhatsApp to ${to}: ${message}`);
      
      // Mock API call
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          message,
          accountSid: twilioConfig.accountSid,
          authToken: twilioConfig.authToken,
          from: twilioConfig.phoneNumber
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  const sendMedicationReminder = async (idoso: any, medicamento: any) => {
    const message = `Olá, ${idoso.nome} 👋 — Hora do remédio ${medicamento.nome} (${medicamento.dosagem}). Responda: 1) ✅ Tomei 2) ❌ Não tomei 3) ⏳ Adiar 10 min.`;
    return await sendWhatsAppMessage(idoso.whatsapp, message);
  };

  const sendConfirmationMessage = async (idoso: any, medicamento: any, response: string) => {
    let message = '';
    
    switch (response) {
      case '1':
        message = `Perfeito, ${idoso.nome}! ✔️ Registramos que você tomou ${medicamento.nome}. Obrigado!`;
        break;
      case '2':
        message = `Entendido. Foi registrado que ${medicamento.nome} não foi tomado. Se precisar de ajuda, fale com seu responsável.`;
        break;
      case '3':
        message = `Ok, vamos lembrar de novo em 10 minutos — responda 1 quando tomar :)`;
        break;
    }
    
    return await sendWhatsAppMessage(idoso.whatsapp, message);
  };

  const sendEmergencyAlert = async (contatos: any[], idoso: any, medicamento: any, horario: string) => {
    const message = `⚠️ Alerta: ${idoso.nome} não confirmou o remédio ${medicamento.nome} das ${horario}.`;
    
    const promises = contatos.map(contato => 
      sendWhatsAppMessage(contato.whatsapp, message)
    );
    
    return await Promise.all(promises);
  };

  const sendDailyReport = async (responsavel: any, idoso: any, relatorio: any) => {
    const message = `Relatório de hoje — ${idoso.nome}\n\n✅ Tomados: ${relatorio.tomados}/${relatorio.total}\n❌ Não tomados: ${relatorio.naoTomados}\n⏳ Adiados: ${relatorio.adiados}`;
    
    return await sendWhatsAppMessage(responsavel.whatsapp, message);
  };

  return {
    isSending,
    sendMedicationReminder,
    sendConfirmationMessage,
    sendEmergencyAlert,
    sendDailyReport
  };
};