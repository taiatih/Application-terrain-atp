import React from 'react';
import { useConsumableForm } from '../hooks/useConsumableForm';
import Step0_Demandeur from '../components/consumable/Step0_Demandeur';
import Step1_SelectItem from '../components/consumable/Step1_SelectItem';
import Step2_SelectQuantity from '../components/consumable/Step2_SelectQuantity';
import Step3_SelectZone from '../components/consumable/Step3_SelectZone';
import Step4_AddComment from '../components/consumable/Step4_AddComment';
import Step5_Summary from '../components/consumable/Step5_Summary';
import Step5_Result from '../components/quick-action/Step5_Result';

interface ConsumableProps {
  onBackToHome: () => void;
}

export default function Consumable({ onBackToHome }: ConsumableProps) {
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

  // Flow : 1=demandeur, 2=item, 3=quantité, 4=zone, 5=commentaire, 6=récap, 7=résultat
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step0_Demandeur
            defaultValue={formData.demandeur}
            onNext={(demandeur) => {
              setFormData((prev) => ({ ...prev, demandeur }));
              nextStep();
            }}
            onBack={onBackToHome}
          />
        );
      case 2:
        return (
          <Step1_SelectItem
            config={config}
            onSelect={(id, label, unit) => {
              setFormData((prev) => ({ ...prev, item: id, itemLabel: label, unit }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step2_SelectQuantity
            config={config}
            itemLabel={formData.itemLabel}
            unit={formData.unit}
            defaultQuantity={formData.quantity}
            onNext={(quantity) => {
              setFormData((prev) => ({ ...prev, quantity }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step3_SelectZone
            config={config}
            defaultValue={formData.zone}
            onNext={(zone) => {
              setFormData((prev) => ({ ...prev, zone }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <Step4_AddComment
            defaultValue={formData.comment}
            onNext={(comment) => {
              setFormData((prev) => ({ ...prev, comment }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <Step5_Summary
            formData={formData}
            config={config}
            onSubmit={submit}
            onBack={prevStep}
          />
        );
      case 7:
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
