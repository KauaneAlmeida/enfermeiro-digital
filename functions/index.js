// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Debug para verificar se carregou as variáveis
console.log("✅ Twilio SID carregado:", process.env.TWILIO_ACCOUNT_SID);

// Dependências Firebase e Twilio
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');
const cors = require('cors')({ origin: true });

// Inicializa Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Inicializa Twilio Client usando env
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Exemplo de Cloud Function para enviar mensagem WhatsApp
exports.sendWhatsAppMessage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const message = await twilioClient.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.TEST_PHONE_NUMBER,
        body: '🚀 Teste de mensagem pelo Firebase Functions + Twilio!'
      });

      console.log("Mensagem enviada:", message.sid);
      return res.status(200).json({ success: true, sid: message.sid });

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });
});

/**
 * 🔧 Helper para buscar configs do Twilio
 * - Local → usa .env.local
 * - Produção → usa functions:config:set
 */
const getTwilioConfig = () => {
  if (process.env.FUNCTION_TARGET) {
    // Ambiente Firebase (produção)
    const config = functions.config();
    return {
      sid: config.twilio?.account_sid,
      token: config.twilio?.auth_token,
      phone: config.twilio?.phone_number,
    };
  }

  // Ambiente Local (.env.local)
  return {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    phone: process.env.TWILIO_PHONE_NUMBER,
  };
};

// Inicializa cliente Twilio
const getTwilioClient = () => {
  const cfg = getTwilioConfig();
  if (!cfg.sid || !cfg.token) {
    console.error('❌ Twilio configuration missing.');
    return null;
  }
  return twilio(cfg.sid, cfg.token);
};

// 📱 Formata telefone para WhatsApp
const formatPhoneForWhatsApp = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 || digits.length === 11) {
    return `whatsapp:+55${digits}`;
  }
  return `whatsapp:+${digits}`;
};

// 📩 Envia mensagem no WhatsApp
const sendWhatsAppMessage = async (to, message) => {
  const twilioClient = getTwilioClient();
  const cfg = getTwilioConfig();

  if (!twilioClient || !cfg.phone) {
    console.error('❌ Twilio client not available');
    return { success: false, error: 'Twilio not configured' };
  }

  try {
    console.log(`📱 Sending WhatsApp to ${to}: ${message}`);

    const result = await twilioClient.messages.create({
      from: cfg.phone, // vem do .env.local ou do Firebase
      to: formatPhoneForWhatsApp(to),
      body: message,
    });

    console.log('✅ Message sent successfully:', result.sid);
    return { success: true, sid: result.sid, status: result.status };
  } catch (error) {
    console.error('❌ Twilio error:', error);
    return { success: false, error: error.message };
  }
};

// 🔔 Cria mensagem de lembrete
const createReminderMessage = (nomeIdoso, medicacao, dosagem) => {
  return `Olá, ${nomeIdoso} 👋 — Hora do remédio ${medicacao} (${dosagem}). Responda: 1) ✅ Tomei 2) ❌ Não tomei 3) ⏳ Adiar 10 min.`;
};

// ⏰ Hora atual no fuso de São Paulo
const getCurrentBrazilTime = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 📅 Dia atual da semana (0 = domingo)
const getCurrentDayOfWeek = () => {
  return new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'numeric',
  });
};

/* ============================================================
   ⚡️ FUNCTIONS DO SISTEMA
   ============================================================ */

// ✅ Verificação de lembretes de medicação
exports.checkMedicationReminders = functions.pubsub
  .schedule('every 1 minutes')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    console.log('🔍 Checking for medication reminders...');
    try {
      const currentTime = getCurrentBrazilTime();
      const currentDay = parseInt(getCurrentDayOfWeek()) % 7;

      const medicamentosSnapshot = await db
        .collection('medicamentos')
        .where('ativo', '==', true)
        .get();

      if (medicamentosSnapshot.empty) {
        console.log('📋 No active medications found');
        return null;
      }

      const batch = db.batch();
      let remindersToSend = [];

      for (const medicamentoDoc of medicamentosSnapshot.docs) {
        const medicamento = { id: medicamentoDoc.id, ...medicamentoDoc.data() };

        if (!medicamento.diasDaSemana.includes(currentDay)) continue;

        const isTimeToRemind = medicamento.horarios.some(horario => {
          const scheduledTime = horario.substring(0, 5);
          return scheduledTime === currentTime;
        });

        if (isTimeToRemind) {
          const idosoDoc = await db.collection('idosos').doc(medicamento.idosoId).get();
          if (!idosoDoc.exists) continue;
          const idoso = { id: idosoDoc.id, ...idosoDoc.data() };

          const lembreteStatusRef = db.collection('lembretes_status').doc();
          const lembreteStatus = {
            medicamentoId: medicamento.id,
            idosoId: idoso.id,
            dataHora: admin.firestore.FieldValue.serverTimestamp(),
            status: 'enviado',
            tentativas: 1,
            horarioOriginal: currentTime,
          };

          batch.set(lembreteStatusRef, lembreteStatus);
          remindersToSend.push({ idoso, medicamento, lembreteId: lembreteStatusRef.id });
        }
      }

      if (remindersToSend.length > 0) {
        await batch.commit();
      }

      for (const reminder of remindersToSend) {
        const message = createReminderMessage(
          reminder.idoso.nome,
          reminder.medicamento.nome,
          reminder.medicamento.dosagem
        );

        const result = await sendWhatsAppMessage(reminder.idoso.whatsapp, message);

        if (result.success) {
          await db.collection('lembretes_status').doc(reminder.lembreteId).update({
            twilioSid: result.sid,
            twilioStatus: result.status,
          });
        } else {
          await db.collection('lembretes_status').doc(reminder.lembreteId).update({
            status: 'erro',
            erro: result.error,
          });
        }
      }
      return null;
    } catch (error) {
      console.error('❌ Error in checkMedicationReminders:', error);
      throw error;
    }
  });

// ✅ Webhook para respostas do WhatsApp
exports.handleWhatsAppWebhook = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { From, Body } = req.body;
      const phoneNumber = From?.replace('whatsapp:', '') || '';
      const message = Body?.trim() || '';

      const idososSnapshot = await db
        .collection('idosos')
        .where('whatsapp', '==', phoneNumber.replace('+55', ''))
        .get();

      if (idososSnapshot.empty) {
        res.json({ success: false, error: 'Idoso not found' });
        return;
      }

      const idoso = { id: idososSnapshot.docs[0].id, ...idososSnapshot.docs[0].data() };

      if (['1', '2', '3'].includes(message)) {
        const statusMap = { '1': 'tomou', '2': 'nao_tomou', '3': 'adiado' };
        const newStatus = statusMap[message];

        const lembreteSnapshot = await db
          .collection('lembretes_status')
          .where('idosoId', '==', idoso.id)
          .where('status', '==', 'enviado')
          .orderBy('dataHora', 'desc')
          .limit(1)
          .get();

        if (!lembreteSnapshot.empty) {
          const lembreteDoc = lembreteSnapshot.docs[0];
          await lembreteDoc.ref.update({
            status: newStatus,
            ultimaResposta: admin.firestore.FieldValue.serverTimestamp(),
            respostaRecebida: message,
          });

          if (message === '3') {
            const lembreteData = lembreteDoc.data();
            const delayedReminderRef = db.collection('lembretes_status').doc();
            await delayedReminderRef.set({
              medicamentoId: lembreteData.medicamentoId,
              idosoId: idoso.id,
              dataHora: admin.firestore.FieldValue.serverTimestamp(),
              status: 'agendado_adiado',
              tentativas: 1,
              horarioOriginal: lembreteData.horarioOriginal,
              adiadoPor: 10,
            });
          }
        }

        const confirmationMessages = {
          '1': `Perfeito, ${idoso.nome}! ✔ Registramos que você tomou o medicamento.`,
          '2': `Entendido. Foi registrado que o medicamento não foi tomado.`,
          '3': `Ok, vamos lembrar de novo em 10 minutos — responda 1 quando tomar :)`,
        };

        await sendWhatsAppMessage(phoneNumber, confirmationMessages[message]);
      } else if (message.toLowerCase() === 'sair') {
        const medicamentosSnapshot = await db
          .collection('medicamentos')
          .where('idosoId', '==', idoso.id)
          .where('ativo', '==', true)
          .get();

        const batch = db.batch();
        medicamentosSnapshot.docs.forEach(doc => {
          batch.update(doc.ref, {
            ativo: false,
            desativadoEm: admin.firestore.FieldValue.serverTimestamp(),
          });
        });
        await batch.commit();

        await sendWhatsAppMessage(
          phoneNumber,
          `${idoso.nome}, os lembretes foram interrompidos conforme solicitado.`
        );
      } else {
        await sendWhatsAppMessage(
          phoneNumber,
          'Resposta não reconhecida. Responda:\n1 - Tomei\n2 - Não tomei\n3 - Adiar\nOu envie "SAIR" para parar.'
        );
      }

      res.json({ success: true });
    } catch (error) {
      console.error('❌ Error in WhatsApp webhook:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// ✅ Registro de usuários e medicamentos
exports.saveRegistration = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { responsavel, idoso, contatos, medicamentos, lgpdConsent } = req.body;

      if (!responsavel || !idoso || !medicamentos || lgpdConsent !== true) {
        res.status(400).json({ success: false, error: "Dados obrigatórios faltando" });
        return;
      }

      const responsavelRef = await db.collection('responsaveis').add({
        ...responsavel,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const idosoRef = await db.collection('idosos').add({
        ...idoso,
        responsavelId: responsavelRef.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      const medicamentosPromises = medicamentos.map(med =>
        db.collection('medicamentos').add({
          ...med,
          idosoId: idosoRef.id,
          ativo: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        })
      );
      await Promise.all(medicamentosPromises);

      if (contatos && contatos.length > 0) {
        const contatosPromises = contatos.map(contato =>
          db.collection('contatos_emergencia').add({
            ...contato,
            idosoId: idosoRef.id,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          })
        );
        await Promise.all(contatosPromises);
      }

      await db.collection('lgpd_consents').add({
        responsavelId: responsavelRef.id,
        aceito: lgpdConsent,
        dataAceite: admin.firestore.FieldValue.serverTimestamp(),
        versao: "1.0",
      });

      const welcomeMessage = `Olá, ${idoso.nome}! 👋\n\nSou o Cuidador Digital.`;

      await sendWhatsAppMessage(idoso.whatsapp, welcomeMessage);

      res.json({ success: true, message: "Registro realizado com sucesso" });
    } catch (error) {
      console.error('❌ Error in saveRegistration:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// ✅ Relatórios
exports.generateReport = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { idosoId, date } = req.query;
      if (!idosoId || !date) {
        res.status(400).json({ success: false, error: 'idosoId and date are required' });
        return;
      }

      const targetDate = new Date(date);
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      const lembretesSnapshot = await db
        .collection('lembretes_status')
        .where('idosoId', '==', idosoId)
        .where('dataHora', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
        .where('dataHora', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
        .get();

      let tomados = 0, naoTomados = 0, adiados = 0, semResposta = 0;
      lembretesSnapshot.docs.forEach(doc => {
        const status = doc.data().status;
        switch (status) {
          case 'tomou': tomados++; break;
          case 'nao_tomou': naoTomados++; break;
          case 'adiado': adiados++; break;
          case 'enviado':
          case 'alerta_enviado': semResposta++; break;
        }
      });

      const total = tomados + naoTomados + adiados + semResposta;
      res.json({
        success: true,
        data: { date: targetDate.toISOString(), idosoId, statistics: { total, tomados, naoTomados, adiados, semResposta } }
      });
    } catch (error) {
      console.error('❌ Error in generateReport:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
});

// ✅ Health check
exports.getHealthStatus = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  try {
    const twilioClient = getTwilioClient();
    const cfg = getTwilioConfig();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        firebase: true,
        twilio: !!(twilioClient && cfg.phone),
        timezone: 'America/Sao_Paulo',
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});
