import React from 'react';
import { 
  MessageCircle, 
  Clock, 
  Shield, 
  Users, 
  Bell, 
  BarChart3,
  Phone,
  Calendar
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Lembretes via WhatsApp',
      description: 'Mensagens automáticas no horário certo, direto no WhatsApp do idoso.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Clock,
      title: 'Horários Personalizados',
      description: 'Configure múltiplos horários para cada medicação, adaptado à rotina.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: 'Alertas de Segurança',
      description: 'Se não houver resposta em 20min, familiares são notificados automaticamente.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Users,
      title: 'Contatos de Emergência',
      description: 'Até 2 contatos podem receber alertas em caso de não conformidade.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Bell,
      title: 'Respostas Simples',
      description: 'Apenas 1, 2 ou 3 no WhatsApp. Simples e intuitivo para qualquer idade.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Diários',
      description: 'Resumo completo enviado aos familiares com estatísticas de adesão.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: Phone,
      title: 'Suporte 24/7',
      description: 'Nossa equipe está sempre disponível para ajudar você e sua família.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      icon: Calendar,
      title: 'Dias da Semana',
      description: 'Configure medicações específicas para determinados dias da semana.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tecnologia a serviço do cuidado
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nosso sistema inteligente garante que seus entes queridos nunca esqueçam de tomar os medicamentos, 
            proporcionando tranquilidade para toda a família.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;