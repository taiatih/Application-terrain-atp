import React from 'react';
import { useQuickActionForm } from '../hooks/useQuickActionForm';
import Step1_SelectType from '../components/quick-action/Step1_SelectType';
import Step2_SelectUrgency from '../components/quick-action/Step2_SelectUrgency';
import Step3_AddComment from '../components/quick-action/Step3_AddComment';
import Step4_Summary from '../components/quick-action/Step4_Summary';
import Step5_Result from '../components/quick-action/Step5_Result';

interface QuickActionProps {
  onBackToHome: () => void;
}

// Étapes actives avec barre de progression : 1=type, 2=urgence, 3=commentaire, 4=récap
const TOTAL_STEPS = 4;

export default function QuickAction({ onBackToHome }: QuickActionProps) {
  const {
    step,
    formData,
    setFormData,
    config,
    configLoading,
    configError,
    submitting,
    result,
    nextStep,
    prevStep,
    submit,
    reset,
  } = useQuickActionForm();

  if (configLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (configError || !config) {
    return (
      <div className="flex flex-col justify-center items-center h-full p-6 text-center gap-4">
        <p className="text-red-600 font-semibold text-lg">{configError}</p>
        <button
          onClick={onBackToHome}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const handleFinish = () => {
    reset();
    onBackToHome();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1_SelectType
            config={config}
            step={1}
            totalSteps={TOTAL_STEPS}
            onSelect={(id, label) => {
              setFormData((prev) => ({ ...prev, type: id, typeLabel: label }));
              nextStep();
            }}
            onBack={onBackToHome}
          />
        );
      case 2:
        return (
          <Step2_SelectUrgency
            config={config}
            step={2}
            totalSteps={TOTAL_STEPS}
            onSelect={(urgency) => {
              setFormData((prev) => ({ ...prev, urgency }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step3_AddComment
            defaultValue={formData.comment}
            step={3}
            totalSteps={TOTAL_STEPS}
            onNext={(comment) => {
              setFormData((prev) => ({ ...prev, comment }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4_Summary
            formData={formData}
            step={4}
            totalSteps={TOTAL_STEPS}
            onSubmit={submit}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step5_Result
            result={result}
            submitting={submitting}
            onFinish={handleFinish}
          />
        );
      default:
        return null;
    }
  };

  return <div className="h-full">{renderStep()}</div>;
}
