import React from 'react';
import { useEffect, useState } from 'react';
import { CheckCircle, MessageCircle, BarChart3, Settings, AlertCircle, RefreshCw } from 'lucide-react';
import { apiService } from '../../services/api';

interface SuccessFormProps {
  formData: any;
  onRestart: () => void;
}

const SuccessForm: React.FC<SuccessFormProps> = ({ formData, onRestart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionData, setSubmissionData] = useState<any>(null);

  useEffect(() => {
    const submitRegistration = async () => {
      if (submitStatus !== 'idle') return;
      
      setIsSubmitting(true);
      setErrorMessage('');
      
      try {
        console.log('🚀 Starting registration submission...');
        console.log('📦 Form data to submit:', JSON.stringify(formData, null, 2));
        
        // First, test backend connection
        console.log('🔍 Testing backend connection...');
        await apiService.checkHealth();
        console.log('✅ Backend connection successful');
        
        // Submit registration
        console.log('📝 Submitting registration...');
        const result = await apiService.saveRegistration(formData);
        console.log('✅ Registration successful:', result);
        
        setSubmissionData(result.data);
        setSubmitStatus('success');
        
      } catch (error) {
        console.error('❌ Registration failed:', error);
        setSubmitStatus('error');
        
        // Provide specific error messages
        if (error.message.includes('Cannot connect to backend server')) {
          setErrorMessage('Não foi possível conectar às Firebase Functions. Verifique se o emulador está rodando ou se as funções estão deployadas.');
        } else if (error.message.includes('Failed to fetch')) {
          setErrorMessage('Erro de conexão com Firebase Functions. Verifique sua conexão de internet.');
        } else {
          setErrorMessage(error.message || 'Erro desconhecido durante o cadastro');
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    submitRegistration();
  }, [formData, submitStatus]);

  const retrySubmission = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
    setSubmissionData(null);
  };

  if (isSubmitting) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Finalizando Cadastro...
        </h2>
        <div className="space-y-2 text-gray-600">
          <p>🔍 Conectando ao servidor...</p>
          <p>✅ Salvando dados no Firebase...</p>
          <p>📱 Enviando mensagem de boas-vindas via WhatsApp...</p>
          <p>⚙️ Configurando lembretes automáticos...</p>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          Isso pode levar alguns segundos...
        </div>
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Erro no Cadastro
        </h2>
        <p className="text-gray-600 mb-6">
          {errorMessage}
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="text-sm text-red-800 space-y-2">
            <p><strong>💡 Soluções possíveis:</strong></p>
            <ul className="text-left space-y-1 ml-4">
              <li>• Verifique se o emulador Firebase está rodando: <code className="bg-red-100 px-1 rounded">firebase emulators:start</code></li>
              <li>• Confirme que as funções estão em <code className="bg-red-100 px-1 rounded">{import.meta.env.VITE_API_URL}</code></li>
              <li>• Verifique sua conexão de internet</li>
              <li>• Tente novamente em alguns segundos</li>
            </ul>
          </div>
        </div>
        
        <div className="flex space-x-4 justify-center">
          <button
            onClick={retrySubmission}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
          <button
            onClick={onRestart}
            className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Recomeçar Cadastro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Cadastro Concluído!
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Parabéns! O <strong>{formData.idoso?.nome}</strong> agora está protegido pelo Cuidador Digital.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">O que acontece agora:</h3>
        
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Mensagem de Boas-vindas Enviada</p>
              <p className="text-sm text-gray-600">
                {submissionData?.twilioSent 
                  ? `✅ Enviada para ${formData.idoso?.whatsapp}` 
                  : '⚠️ Será enviada quando o Twilio for configurado'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Lembretes Configurados</p>
              <p className="text-sm text-gray-600">Os lembretes começarão automaticamente nos horários definidos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Dados Salvos com Segurança</p>
              <p className="text-sm text-gray-600">Todas as informações foram armazenadas de forma criptografada</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Medicamentos</h4>
          <p className="text-2xl font-bold text-blue-600">
            {formData.medicamentos?.length || 0}
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Contatos de Emergência</h4>
          <p className="text-2xl font-bold text-green-600">
            {submissionData?.contatosCount || formData.contatos?.length || 0}
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Status</h4>
          <p className="text-sm font-bold text-purple-600">
            {submissionData?.twilioSent ? '✅ Ativo' : '⚠️ Configurando'}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRestart}
          className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
        >
          Cadastrar Outro Idoso
        </button>
        
        <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Acessar Painel
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            📱 Em caso de dúvidas, nossa equipe está disponível no WhatsApp: 
            <span className="font-medium text-blue-600"> (11) 99999-9999</span>
          </p>
          {submissionData && (
            <div className="text-xs text-gray-500 space-y-1">
              <p>ID do cadastro: {submissionData.idosoId}</p>
              {submissionData.twilioSid && (
                <p>ID da mensagem: {submissionData.twilioSid}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessForm;