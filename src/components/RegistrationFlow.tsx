import React, { useState } from 'react';
import ResponsavelForm from './forms/ResponsavelForm';
import IdosoForm from './forms/IdosoForm';
import ContatosForm from './forms/ContatosForm';
import MedicamentosForm from './forms/MedicamentosForm';
import LGPDForm from './forms/LGPDForm';
import SuccessForm from './forms/SuccessForm';

const RegistrationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { title: 'Responsável', component: ResponsavelForm },
    { title: 'Idoso', component: IdosoForm },
    { title: 'Contatos', component: ContatosForm },
    { title: 'Medicamentos', component: MedicamentosForm },
    { title: 'Consentimento', component: LGPDForm },
    { title: 'Sucesso', component: SuccessForm }
  ];

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restartFlow = () => {
    setCurrentStep(0);
    setFormData({});
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <section id="cadastro" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cadastro Rápido
            </h2>
            <p className="text-xl text-gray-600">
              Em poucos minutos você terá um cuidador digital 24/7 para sua família
            </p>
          </div>

          {/* Progress Bar */}
          {currentStep < steps.length - 1 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.slice(0, -1).map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    {index < steps.length - 2 && (
                      <div className={`w-full h-1 mx-4 rounded transition-all duration-300 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                {steps.slice(0, -1).map((step, index) => (
                  <span key={index} className={index <= currentStep ? 'text-blue-600 font-medium' : ''}>
                    {step.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Form Component */}
          <div className="max-w-2xl mx-auto">
            {currentStep === steps.length - 1 ? (
              <SuccessForm formData={formData} onRestart={restartFlow} />
            ) : (
              <CurrentComponent
                onNext={nextStep}
                onPrevious={currentStep > 0 ? previousStep : undefined}
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationFlow;