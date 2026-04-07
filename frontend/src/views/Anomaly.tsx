import React, { useEffect } from 'react';
import { useAnomalyForm } from '../hooks/useAnomalyForm';
import { useSession } from '../context/SessionContext';
import AnomalyStep2_SelectType from '../components/anomaly/AnomalyStep2_SelectType';
import AnomalyStep3_Reference from '../components/anomaly/AnomalyStep3_Reference';
import AnomalyStep4_SelectZone from '../components/anomaly/AnomalyStep4_SelectZone';
import AnomalyStep5_Photo from '../components/anomaly/AnomalyStep5_Photo';
import AnomalyStep6_Comment from '../components/anomaly/AnomalyStep6_Comment';
import AnomalyStep7_Summary from '../components/anomaly/AnomalyStep7_Summary';
import Step5_Result from '../components/quick-action/Step5_Result';

const TOTAL_STEPS = 6; // étapes 1 à 6 (hors résultat)

interface AnomalyProps {
  onBackToHome: () => void;
}

export default function Anomaly({ onBackToHome }: AnomalyProps) {
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
  } = useAnomalyForm();

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

  // Flow : 1=type, 2=référence, 3=zone, 4=photo, 5=commentaire, 6=récap, 7=résultat
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AnomalyStep2_SelectType
            config={config}
            onSelect={(type, typeLabel) => {
              setFormData((prev) => ({ ...prev, type, typeLabel }));
              nextStep();
            }}
            onBack={onBackToHome}
            step={1}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 2:
        return (
          <AnomalyStep3_Reference
            typeLabel={formData.typeLabel}
            defaultValue={formData.reference}
            onNext={(reference) => {
              setFormData((prev) => ({ ...prev, reference }));
              nextStep();
            }}
            onBack={prevStep}
            step={2}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 3:
        return (
          <AnomalyStep4_SelectZone
            config={config}
            defaultValue={formData.zone}
            onNext={(zone, zoneLabel) => {
              setFormData((prev) => ({ ...prev, zone, zoneLabel }));
              nextStep();
            }}
            onBack={prevStep}
            step={3}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 4:
        return (
          <AnomalyStep5_Photo
            defaultValue={formData.photoBase64}
            onNext={(photoBase64) => {
              setFormData((prev) => ({ ...prev, photoBase64 }));
              nextStep();
            }}
            onBack={prevStep}
            step={4}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 5:
        return (
          <AnomalyStep6_Comment
            defaultValue={formData.comment}
            onNext={(comment) => {
              setFormData((prev) => ({ ...prev, comment }));
              nextStep();
            }}
            onBack={prevStep}
            step={5}
            totalSteps={TOTAL_STEPS}
          />
        );
      case 6:
        return (
          <AnomalyStep7_Summary
            formData={formData}
            onSubmit={submit}
            onBack={prevStep}
            step={6}
            totalSteps={TOTAL_STEPS}
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
