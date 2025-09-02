import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { Shield, ArrowRight, ArrowLeft, FileText, Lock, Eye } from 'lucide-react';

const LGPDForm: React.FC<FormStepProps> = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.lgpdConsent) {
      newErrors.consent = 'É necessário aceitar os termos para continuar';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleConsentChange = (accepted: boolean) => {
    updateFormData({
      lgpdConsent: accepted,
      lgpdConsentDate: accepted ? new Date() : null
    });
    
    if (errors.consent) {
      setErrors(prev => ({ ...prev, consent: '' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Proteção de Dados</h2>
            <p className="text-gray-600">Conforme a Lei Geral de Proteção de Dados (LGPD)</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Lock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Seus dados estão seguros</h3>
              <p className="text-blue-800 text-sm leading-relaxed mb-4">
                O Cuidador Digital coleta e processa apenas os dados necessários para fornecer o serviço de lembretes de medicação. 
                Todos os dados são criptografados e armazenados de forma segura.
              </p>
              
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>{showDetails ? 'Ocultar' : 'Ver'} detalhes</span>
              </button>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Dados Coletados
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Responsável:</h5>
                <ul className="text-gray-600 space-y-1">
                  <li>• Nome completo</li>
                  <li>• Número do WhatsApp</li>
                  <li>• Email (opcional)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Idoso:</h5>
                <ul className="text-gray-600 space-y-1">
                  <li>• Nome completo</li>
                  <li>• Número do WhatsApp</li>
                  <li>• Fuso horário</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Medicamentos:</h5>
                <ul className="text-gray-600 space-y-1">
                  <li>• Nome e dosagem</li>
                  <li>• Horários de administração</li>
                  <li>• Dias da semana</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Contatos:</h5>
                <ul className="text-gray-600 space-y-1">
                  <li>• Nome dos contatos</li>
                  <li>• Números do WhatsApp</li>
                  <li>• Histórico de mensagens</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h5 className="font-medium text-gray-700 mb-2">Finalidade do Tratamento:</h5>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Envio de lembretes de medicação via WhatsApp</li>
                <li>• Geração de relatórios para familiares</li>
                <li>• Envio de alertas de segurança</li>
                <li>• Melhoria contínua do serviço</li>
              </ul>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.lgpdConsent || false}
              onChange={(e) => handleConsentChange(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="text-sm">
              <span className="text-gray-700">
                Eu autorizo o tratamento dos meus dados pessoais e dos dados do idoso sob minha responsabilidade 
                para as finalidades descritas acima, conforme a 
              </span>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Política de Privacidade
              </a>
              <span className="text-gray-700"> e os </span>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Termos de Uso
              </a>
              <span className="text-gray-700">.</span>
            </div>
          </label>
          
          {errors.consent && <p className="text-red-600 text-sm ml-8">{errors.consent}</p>}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">Seus direitos LGPD:</p>
              <p>Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados a qualquer momento através do nosso suporte.</p>
            </div>
          </div>
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
            disabled={!formData.lgpdConsent}
            className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>Finalizar Cadastro</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LGPDForm;