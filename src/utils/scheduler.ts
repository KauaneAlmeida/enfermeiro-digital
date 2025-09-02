// Utility functions for scheduling medication reminders

export interface ScheduledReminder {
  id: string;
  idosoId: string;
  medicamentoId: string;
  scheduledTime: Date;
  status: 'pending' | 'sent' | 'completed' | 'missed';
}

export const generateReminderSchedule = (
  medicamento: any,
  idoso: any,
  startDate: Date = new Date(),
  days: number = 30
): ScheduledReminder[] => {
  const reminders: ScheduledReminder[] = [];
  const currentDate = new Date(startDate);
  
  for (let day = 0; day < days; day++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + day);
    
    // Check if this day is in the medication schedule
    if (medicamento.diasDaSemana.includes(date.getDay())) {
      // Create reminders for each scheduled time
      medicamento.horarios.forEach((horario: string) => {
        const [hours, minutes] = horario.split(':').map(Number);
        const reminderTime = new Date(date);
        reminderTime.setHours(hours, minutes, 0, 0);
        
        // Only schedule future reminders
        if (reminderTime > new Date()) {
          reminders.push({
            id: `${medicamento.id}_${reminderTime.getTime()}`,
            idosoId: idoso.id,
            medicamentoId: medicamento.id,
            scheduledTime: reminderTime,
            status: 'pending'
          });
        }
      });
    }
  }
  
  return reminders.sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime());
};

export const isTimeToSendReminder = (reminder: ScheduledReminder): boolean => {
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - reminder.scheduledTime.getTime());
  
  // Consider it time to send if within 1 minute of scheduled time
  return timeDiff <= 60000 && reminder.status === 'pending';
};

export const calculateDelayedTime = (originalTime: Date, delayMinutes: number = 10): Date => {
  const delayedTime = new Date(originalTime);
  delayedTime.setMinutes(delayedTime.getMinutes() + delayMinutes);
  return delayedTime;
};

export const shouldSendEmergencyAlert = (reminder: ScheduledReminder): boolean => {
  const now = new Date();
  const timeSinceSent = now.getTime() - reminder.scheduledTime.getTime();
  
  // Send emergency alert if 20 minutes have passed since the reminder was sent
  return timeSinceSent >= 20 * 60 * 1000 && reminder.status === 'sent';
};

export const formatTimeForDisplay = (date: Date): string => {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateForDisplay = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};