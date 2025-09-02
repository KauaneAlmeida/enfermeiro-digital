import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { User, Phone, Globe, ArrowRight, ArrowLeft } from 'lucide-react';

const IdosoForm: React.FC<FormStepProps> = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const timezones = [
    { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
    { value: 'America/Manaus', label: 'Manaus (GMT-4)' },
    { value: 'America/Rio_Branco', label: 'Rio Branco (GMT-5)' },
    { value: 'America/Noronha', label: 'Fernando de Noronha (GMT-2)' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.idoso?.nome?.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.idoso?.whatsapp?.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.idoso.whatsapp)) {
      newErrors.whatsapp = 'Formato: (11) 99999-9999';
    }

    if (!formData.idoso?.fusoHorario) {
      newErrors.fusoHorario = 'Fuso horário é obrigatório';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    updateFormData({
      idoso: {
        ...formData.idoso,
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dados do Idoso</h2>
        <p className="text-gray-600">Agora vamos cadastrar as informações de quem receberá os cuidados</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Nome Completo *
          </label>
          <input
            type="text"
            value={formData.idoso?.nome || ''}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
              errors.nome ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Nome completo do idoso"
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
            value={formData.idoso?.whatsapp || ''}
            onChange={(e) => handleInputChange('whatsapp', formatWhatsApp(e.target.value))}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
              errors.whatsapp ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="(11) 99999-9999"
          />
          {errors.whatsapp && <p className="text-red-600 text-sm mt-1">{errors.whatsapp}</p>}
          <p className="text-sm text-gray-500 mt-1">
            Este será o número que receberá os lembretes de medicação
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            Fuso Horário *
          </label>
          <select
            value={formData.idoso?.fusoHorario || ''}
            onChange={(e) => handleInputChange('fusoHorario', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
              errors.fusoHorario ? 'border-red-300' : 'border-gray-200'
            }`}
          >
            <option value="">Selecione o fuso horário</option>
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          {errors.fusoHorario && <p className="text-red-600 text-sm mt-1">{errors.fusoHorario}</p>}
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Próximo Passo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdosoForm;