import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';
import { QuickActionConfig, QuickActionFormData, ApiResult } from '../types/app.types';

const INITIAL_FORM: QuickActionFormData = {
  type: '',
  typeLabel: '',
  urgency: '',
  comment: '',
};

export function useQuickActionForm() {
  // Étape courante : 1 à 5
  const [step, setStep] = useState<number>(1);

  // Données du formulaire
  const [formData, setFormData] = useState<QuickActionFormData>(INITIAL_FORM);

  // Configuration chargée depuis le backend
  const [config, setConfig] = useState<QuickActionConfig | null>(null);
  const [configLoading, setConfigLoading] = useState<boolean>(true);
  const [configError, setConfigError] = useState<string | null>(null);

  // État de l'envoi
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  // Chargement de la config au montage
  useEffect(() => {
    apiClient
      .get<QuickActionConfig>('/config/quick-actions')
      .then((res) => {
        setConfig(res.data);
        setConfigError(null);
      })
      .catch(() => {
        setConfigError('Impossible de charger la configuration. Vérifiez que le serveur est démarré.');
      })
      .finally(() => setConfigLoading(false));
  }, []);

  const nextStep = useCallback(() => setStep((s) => s + 1), []);
  const prevStep = useCallback(() => setStep((s) => Math.max(1, s - 1)), []);

  const reset = useCallback(() => {
    setStep(1);
    setFormData(INITIAL_FORM);
    setResult(null);
    setSubmitting(false);
  }, []);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setResult(null);
    // On passe à l'étape résultat immédiatement pour afficher le loader
    setStep(5);

    try {
      const res = await apiClient.post<ApiResult>('/quick-action', {
        type: formData.type,
        typeLabel: formData.typeLabel,
        urgency: formData.urgency,
        comment: formData.comment || undefined,
      });
      setResult(res.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message =
        error?.response?.data?.message ?? "Échec de l'envoi. Vérifiez votre connexion et réessayez.";
      setResult({ success: false, message });
    } finally {
      setSubmitting(false);
    }
  }, [formData]);

  return {
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
  };
}
