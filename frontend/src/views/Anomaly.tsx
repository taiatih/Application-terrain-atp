import React from 'react';
import { useAnomalyForm } from '../hooks/useAnomalyForm';
import AnomalyStep1_Demandeur from '../components/anomaly/AnomalyStep1_Demandeur';
import AnomalyStep2_SelectType from '../components/anomaly/AnomalyStep2_SelectType';
import AnomalyStep3_Reference from '../components/anomaly/AnomalyStep3_Reference';
import AnomalyStep4_SelectZone from '../components/anomaly/AnomalyStep4_SelectZone';
import AnomalyStep5_Photo from '../components/anomaly/AnomalyStep5_Photo';
import AnomalyStep6_Comment from '../components/anomaly/AnomalyStep6_Comment';
import AnomalyStep7_Summary from '../components/anomaly/AnomalyStep7_Summary';
import Step5_Result from '../components/quick-action/Step5_Result';

interface AnomalyProps {
  onBackToHome: () => void;
}

export default function Anomaly({ onBackToHome }: AnomalyProps) {
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
  } = useAnomalyForm();

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AnomalyStep1_Demandeur
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
          <AnomalyStep2_SelectType
            config={config}
            onSelect={(type, typeLabel) => {
              setFormData((prev) => ({ ...prev, type, typeLabel }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <AnomalyStep3_Reference
            typeLabel={formData.typeLabel}
            defaultValue={formData.reference}
            onNext={(reference) => {
              setFormData((prev) => ({ ...prev, reference }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <AnomalyStep4_SelectZone
            config={config}
            defaultValue={formData.zone}
            onNext={(zone, zoneLabel) => {
              setFormData((prev) => ({ ...prev, zone, zoneLabel }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <AnomalyStep5_Photo
            defaultValue={formData.photoBase64}
            onNext={(photoBase64) => {
              setFormData((prev) => ({ ...prev, photoBase64 }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <AnomalyStep6_Comment
            defaultValue={formData.comment}
            onNext={(comment) => {
              setFormData((prev) => ({ ...prev, comment }));
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <AnomalyStep7_Summary
            formData={formData}
            onSubmit={submit}
            onBack={prevStep}
          />
        );
      case 8:
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
