import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { User, Phone, Mail, ArrowRight } from 'lucide-react';

const ResponsavelForm: React.FC<FormStepProps> = ({ onNext, formData, updateFormData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.responsavel?.nome?.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.responsavel?.whatsapp?.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.responsavel.whatsapp)) {
      newErrors.whatsapp = 'Formato: (11) 99999-9999';
    }

    if (formData.responsavel?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.responsavel.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    updateFormData({
      responsavel: {
        ...formData.responsavel,
        [field]: value
      }
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dados do Responsável</h2>
        <p className="text-gray-600">Vamos começar com suas informações básicas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Nome Completo *
          </label>
          <input
            type="text"
            value={formData.responsavel?.nome || ''}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
              errors.nome ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Digite seu nome completo"
          />
          {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            WhatsApp *
          </label>
          <input
            type="tel"
            value={formData.responsavel?.whatsapp || ''}
            onChange={(e) => handleInputChange('whatsapp', formatWhatsApp(e.target.value))}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
              errors.whatsapp ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="(11) 99999-9999"
          />
          {errors.whatsapp && <p className="text-red-600 text-sm mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email (opcional)
          </label>
          <input
            type="email"
            value={formData.responsavel?.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
              errors.email ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="seu@email.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>Próximo Passo</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ResponsavelForm;