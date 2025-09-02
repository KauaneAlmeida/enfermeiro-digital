import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Básico',
      price: 'R$ 29',
      period: '/mês',
      description: 'Perfeito para famílias iniciantes',
      features: [
        'Até 1 idoso',
        'Lembretes via WhatsApp',
        'Até 5 medicamentos',
        'Relatórios semanais',
        'Suporte por email'
      ],
      buttonText: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Família',
      price: 'R$ 49',
      period: '/mês',
      description: 'Ideal para famílias com múltiplos idosos',
      features: [
        'Até 3 idosos',
        'Lembretes via WhatsApp',
        'Medicamentos ilimitados',
        'Relatórios diários',
        'Contatos de emergência',
        'Suporte prioritário',
        'Painel administrativo'
      ],
      buttonText: 'Escolher Plano',
      popular: true
    },
    {
      name: 'Premium',
      price: 'R$ 89',
      period: '/mês',
      description: 'Para cuidadores profissionais',
      features: [
        'Idosos ilimitados',
        'Lembretes via WhatsApp',
        'Medicamentos ilimitados',
        'Relatórios personalizados',
        'API completa',
        'Suporte 24/7',
        'Treinamento incluído'
      ],
      buttonText: 'Falar com Vendas',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Planos para toda família
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para cuidar de quem você ama. Todos os planos incluem teste gratuito de 7 dias.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-2xl p-8 ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border border-gray-200 shadow-lg'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Mais Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                plan.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            🔒 Todos os planos incluem criptografia de ponta a ponta e conformidade com LGPD
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;