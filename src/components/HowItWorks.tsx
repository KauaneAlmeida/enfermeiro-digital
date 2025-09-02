import React from 'react';
import { UserPlus, Pill, MessageCircle, BarChart3 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Cadastro Simples',
      description: 'Registre os dados do responsável, idoso e medicamentos em poucos minutos.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      step: '01'
    },
    {
      icon: Pill,
      title: 'Configure Medicações',
      description: 'Adicione horários, dosagens e dias da semana para cada medicamento.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      step: '02'
    },
    {
      icon: MessageCircle,
      title: 'Lembretes Automáticos',
      description: 'Sistema envia mensagens no WhatsApp nos horários configurados.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      step: '03'
    },
    {
      icon: BarChart3,
      title: 'Acompanhamento',
      description: 'Relatórios diários e alertas mantêm a família sempre informada.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      step: '04'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Em 4 passos simples, você garante que seus entes queridos estejam sempre cuidados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200"></div>
                )}
                
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-10 h-10 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">20min</div>
              <p className="text-gray-600">Tempo máximo para alerta de emergência</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-gray-600">Monitoramento contínuo e automático</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <p className="text-gray-600">Seguro e em conformidade com LGPD</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;