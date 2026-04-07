import React, { useEffect } from 'react';
import { useConsumableForm } from '../hooks/useConsumableForm';
import { useSession } from '../context/SessionContext';
import Step1_SelectItem from '../components/consumable/Step1_SelectItem';
import Step2_SelectQuantity from '../components/consumable/Step2_SelectQuantity';
import Step3_SelectZone from '../components/consumable/Step3_SelectZone';
import Step4_AddComment from '../components/consumable/Step4_AddComment';
import Step5_Summary from '../components/consumable/Step5_Summary';
import Step5_Result from '../components/quick-action/Step5_Result';

interface ConsumableProps {
  onBackToHome: () => void;
}

// Étapes actives avec barre de progression : 1=item, 2=quantité, 3=zone, 4=commentaire, 5=récap
const TOTAL_STEPS = 5;

export default function Consumable({ onBackToHome }: ConsumableProps) {
  const { operator, setFormActive } = useSession();
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
  } = useConsumableForm();

  // Injecter le nom de l'opérateur depuis la session
  useEffect(() => {
    if (operator) {
      setFormData((prev) => ({ ...prev, demandeur: operator.prenom }));
    }
  }, [operator, setFormData]);

  // Signaler au contexte qu'une saisie est en cours (étape ≥ 2)
  useEffect(() => {
    setFormActive(step >= 2);
    return () => setFormActive(false);
  }, [step, setFormActive]);

  if (configLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-4 py-20">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (configError || !config) {
    return (
      <div className="flex flex-col justify-center items-center h-full p-6 text-center gap-4">
        <p className="text-red-600 font-semibold text-lg">
          Impossible de charger le module. Vérifiez votre connexion.
        </p>
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
          <Step1_SelectItem
            config={config}
            step={1}
            totalSteps={TOTAL_STEPS}
            onSelect={(id, label, unit) => {
              setFormData((prev) => ({ ...prev, item: id, itemLabel: label, unit }));
              nextStep();
            }}
            onBack={onBackToHome}
          />
        );
      case 2:
        return (
          <Step2_SelectQuantity
            config={config}
            itemLabel={formData.itemLabel}
            unit={formData.unit}
            defaultQuantity={formData.quantity}
            step={2}
            totalSteps={TOTAL_STEPS}
            onNext={(quantity) => {
              setFormData((prev) => ({ ...prev, quantity }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step3_SelectZone
            config={config}
            defaultValue={formData.zone}
            step={3}
            totalSteps={TOTAL_STEPS}
            onNext={(zone) => {
              setFormData((prev) => ({ ...prev, zone }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4_AddComment
            defaultValue={formData.comment}
            step={4}
            totalSteps={TOTAL_STEPS}
            onNext={(comment) => {
              setFormData((prev) => ({ ...prev, comment }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step5_Summary
            formData={formData}
            config={config}
            step={5}
            totalSteps={TOTAL_STEPS}
            onSubmit={submit}
            onBack={prevStep}
          />
        );
      case 6:
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
