import React, { useState } from 'react';
import { FormStepProps } from '../../types';
import { Pill, Clock, Calendar, ArrowRight, ArrowLeft, X, Plus } from 'lucide-react';

const MedicamentosForm: React.FC<FormStepProps> = ({ onNext, onPrevious, formData, updateFormData }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const medicamentos = formData.medicamentos || [];
  
  const diasSemana = [
    { value: 0, label: 'Dom' },
    { value: 1, label: 'Seg' },
    { value: 2, label: 'Ter' },
    { value: 3, label: 'Qua' },
    { value: 4, label: 'Qui' },
    { value: 5, label: 'Sex' },
    { value: 6, label: 'Sáb' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (medicamentos.length === 0) {
      newErrors.medicamentos = 'Adicione pelo menos um medicamento';
    }

    medicamentos.forEach((med: any, index: number) => {
      if (!med.nome?.trim()) {
        newErrors[`nome_${index}`] = 'Nome é obrigatório';
      }
      if (!med.dosagem?.trim()) {
        newErrors[`dosagem_${index}`] = 'Dosagem é obrigatória';
      }
      if (!med.horarios || med.horarios.length === 0) {
        newErrors[`horarios_${index}`] = 'Adicione pelo menos um horário';
      }
      if (!med.diasDaSemana || med.diasDaSemana.length === 0) {
        newErrors[`dias_${index}`] = 'Selecione pelo menos um dia';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const addMedicamento = () => {
    updateFormData({
      medicamentos: [...medicamentos, {
        nome: '',
        dosagem: '',
        horarios: [],
        diasDaSemana: []
      }]
    });
  };

  const removeMedicamento = (index: number) => {
    const newMedicamentos = medicamentos.filter((_: any, i: number) => i !== index);
    updateFormData({ medicamentos: newMedicamentos });
  };

  const updateMedicamento = (index: number, field: string, value: any) => {
    const newMedicamentos = [...medicamentos];
    newMedicamentos[index] = { ...newMedicamentos[index], [field]: value };
    updateFormData({ medicamentos: newMedicamentos });
    
    const errorKey = `${field}_${index}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addHorario = (medIndex: number) => {
    const medicamento = medicamentos[medIndex];
    const horarios = [...(medicamento.horarios || []), ''];
    updateMedicamento(medIndex, 'horarios', horarios);
  };

  const updateHorario = (medIndex: number, horarioIndex: number, value: string) => {
    const medicamento = medicamentos[medIndex];
    const horarios = [...medicamento.horarios];
    horarios[horarioIndex] = value;
    updateMedicamento(medIndex, 'horarios', horarios);
  };

  const removeHorario = (medIndex: number, horarioIndex: number) => {
    const medicamento = medicamentos[medIndex];
    const horarios = medicamento.horarios.filter((_: string, i: number) => i !== horarioIndex);
    updateMedicamento(medIndex, 'horarios', horarios);
  };

  const toggleDia = (medIndex: number, dia: number) => {
    const medicamento = medicamentos[medIndex];
    const dias = medicamento.diasDaSemana || [];
    const newDias = dias.includes(dia) 
      ? dias.filter((d: number) => d !== dia)
      : [...dias, dia];
    updateMedicamento(medIndex, 'diasDaSemana', newDias);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medicamentos</h2>
        <p className="text-gray-600">Configure os medicamentos e horários para os lembretes automáticos</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {medicamentos.map((medicamento: any, medIndex: number) => (
          <div key={medIndex} className="bg-gray-50 p-6 rounded-xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-blue-600" />
                Medicamento {medIndex + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeMedicamento(medIndex)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Medicamento *
                </label>
                <input
                  type="text"
                  value={medicamento.nome}
                  onChange={(e) => updateMedicamento(medIndex, 'nome', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                    errors[`nome_${medIndex}`] ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Ex: Losartana"
                />
                {errors[`nome_${medIndex}`] && <p className="text-red-600 text-sm mt-1">{errors[`nome_${medIndex}`]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosagem *
                </label>
                <input
                  type="text"
                  value={medicamento.dosagem}
                  onChange={(e) => updateMedicamento(medIndex, 'dosagem', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                    errors[`dosagem_${medIndex}`] ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Ex: 50mg"
                />
                {errors[`dosagem_${medIndex}`] && <p className="text-red-600 text-sm mt-1">{errors[`dosagem_${medIndex}`]}</p>}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Horários *
                </label>
                <button
                  type="button"
                  onClick={() => addHorario(medIndex)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Horário</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(medicamento.horarios || []).map((horario: string, horarioIndex: number) => (
                  <div key={horarioIndex} className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={horario}
                      onChange={(e) => updateHorario(medIndex, horarioIndex, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeHorario(medIndex, horarioIndex)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {errors[`horarios_${medIndex}`] && <p className="text-red-600 text-sm mt-1">{errors[`horarios_${medIndex}`]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Dias da Semana *
              </label>
              <div className="flex flex-wrap gap-2">
                {diasSemana.map((dia) => {
                  const isSelected = (medicamento.diasDaSemana || []).includes(dia.value);
                  return (
                    <button
                      key={dia.value}
                      type="button"
                      onClick={() => toggleDia(medIndex, dia.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {dia.label}
                    </button>
                  );
                })}
              </div>
              {errors[`dias_${medIndex}`] && <p className="text-red-600 text-sm mt-1">{errors[`dias_${medIndex}`]}</p>}
            </div>
          </div>
        ))}

        {medicamentos.length === 0 ? (
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Nenhum medicamento adicionado ainda</p>
            <button
              type="button"
              onClick={addMedicamento}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar Primeiro Medicamento</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={addMedicamento}
            className="w-full border-2 border-dashed border-green-300 text-green-600 py-4 px-6 rounded-lg font-semibold hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Outro Medicamento</span>
          </button>
        )}

        {errors.medicamentos && <p className="text-red-600 text-sm">{errors.medicamentos}</p>}

        {medicamentos.length > 0 && (
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
        )}
      </form>
    </div>
  );
};

export default MedicamentosForm;