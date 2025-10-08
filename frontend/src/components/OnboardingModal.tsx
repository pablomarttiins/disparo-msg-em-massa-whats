import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { OnboardingCategoryForm } from './OnboardingCategoryForm';
import { OnboardingContactForm } from './OnboardingContactForm';
import { OnboardingWhatsApp } from './OnboardingWhatsApp';

const OnboardingModal: React.FC = () => {
  const { setShowOnboardingModal } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isStep1Completed, setIsStep1Completed] = useState(false);
  const [isStep2Completed, setIsStep2Completed] = useState(false);
  const [isStep3Completed, setIsStep3Completed] = useState(false); // WhatsApp
  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSuccess = (step: number) => {
    if (step === 1) setIsStep1Completed(true);
    if (step === 2) setIsStep2Completed(true);
    if (step === 3) setIsStep3Completed(true);
  };

  const handleFinish = async () => {
    try {
      await apiService.completeOnboarding();
    } catch (error) {
      console.error('Failed to complete onboarding', error);
    } finally {
      setShowOnboardingModal(false);
      navigate('/campanhas');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Crie uma Categoria</h3>
            <p className="text-gray-600 mb-4">As categorias ajudam a organizar seus contatos e campanhas.</p>
            <OnboardingCategoryForm onSuccess={() => handleSuccess(1)} />
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">2. Cadastre um Contato</h3>
            <p className="text-gray-600 mb-4">Cadastre seu primeiro contato e associe-o a uma categoria.</p>
            <OnboardingContactForm onSuccess={() => handleSuccess(2)} />
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">3. Conecte seu WhatsApp</h3>
            <p className="text-gray-600 mb-4">Esta é a etapa mais importante. Conecte sua conta do WhatsApp para automatizar o envio das mensagens.</p>
            <OnboardingWhatsApp onSuccess={() => handleSuccess(3)} />
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !isStep1Completed) return true;
    if (currentStep === 2 && !isStep2Completed) return true;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Configuração Inicial</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Passo {currentStep} de {totalSteps}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        <div className="step-content my-6">{renderStepContent()}</div>

        <div className="flex justify-between">
          <button onClick={prevStep} disabled={currentStep === 1} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50">Anterior</button>
          {currentStep < totalSteps ? (
            <button onClick={nextStep} disabled={isNextDisabled()} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">Próximo</button>
          ) : (
            <button onClick={handleFinish} disabled={!isStep3Completed} className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50">Concluir e criar campanha</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;