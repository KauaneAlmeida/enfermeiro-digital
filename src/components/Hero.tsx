import React from 'react';
import { Shield, Clock, Heart, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToCadastro = () => {
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cuidado
                <span className="text-blue-600 block">Inteligente</span>
                para quem você ama
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Lembretes automáticos de medicação via WhatsApp, com acompanhamento em tempo real e alertas para a família.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToCadastro}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Começar Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300">
                Ver Demonstração
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">24/7 Ativo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-600">Com Amor</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maria Silva</p>
                    <p className="text-sm text-gray-600">Horário da medicação</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    "Olá, Maria 👋 — Hora do remédio Losartana (50mg). Responda: 1) ✅ Tomei 2) ❌ Não tomei 3) ⏳ Adiar 10 min."
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                    1 - Tomei ✅
                  </button>
                  <button className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm">
                    2 - Não tomei
                  </button>
                  <button className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-sm">
                    3 - Adiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;