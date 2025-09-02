import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { UserPlus, Phone, ArrowRight, ArrowLeft, X } from 'lucide-react';

const ContatosForm: React.FC<FormStepProps> = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contatos = formData.contatos || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    contatos.forEach((contato: any, index: number) => {
      if (!contato.nome?.trim()) {
        newErrors[`nome_${index}`] = 'Nome é obrigatório';
      }
      if (!contato.whatsapp?.trim()) {
        newErrors[`whatsapp_${index}`] = 'WhatsApp é obrigatório';
      } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(contato.whatsapp)) {
        newErrors[`whatsapp_${index}`] = 'Formato: (11) 99999-9999';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const addContato = () => {
    if (contatos.length < 2) {
      updateFormData({
        contatos: [...contatos, { nome: '', whatsapp: '' }]
      });
    }
  };

  const removeContato = (index: number) => {
    const newContatos = contatos.filter((_: any, i: number) => i !== index);
    updateFormData({ contatos: newContatos });
  };

  const updateContato = (index: number, field: string, value: string) => {
    const newContatos = [...contatos];
    newContatos[index] = { ...newContatos[index], [field]: value };
    updateFormData({ contatos: newContatos });
    
    const errorKey = `${field}_${index}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contatos de Emergência</h2>
        <p className="text-gray-600">Adicione até 2 contatos que serão notificados em caso de emergência</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {contatos.map((contato: any, index: number) => (
          <div key={index} className="bg-gray-50 p-6 rounded-xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Contato de Emergência {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeContato(index)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={contato.nome}
                  onChange={(e) => updateContato(index, 'nome', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                    errors[`nome_${index}`] ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Nome do contato"
                />
                {errors[`nome_${index}`] && <p className="text-red-600 text-sm mt-1">{errors[`nome_${index}`]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  value={contato.whatsapp}
                  onChange={(e) => updateContato(index, 'whatsapp', formatWhatsApp(e.target.value))}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                    errors[`whatsapp_${index}`] ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="(11) 99999-9999"
                />
                {errors[`whatsapp_${index}`] && <p className="text-red-600 text-sm mt-1">{errors[`whatsapp_${index}`]}</p>}
              </div>
            </div>
          </div>
        ))}

        {contatos.length < 2 && (
          <button
            type="button"
            onClick={addContato}
            className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-4 px-6 rounded-lg font-semibold hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Adicionar Contato de Emergência</span>
          </button>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Os contatos de emergência receberão alertas quando o idoso não responder aos lembretes em 20 minutos.
          </p>
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

export default ContatosForm;