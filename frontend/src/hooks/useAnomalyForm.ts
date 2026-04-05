import { useState, useEffect } from 'react';
import { AnomalyConfig, AnomalyFormData, ApiResult } from '../types/app.types';
import apiClient from '../services/apiClient';

const INITIAL_FORM: AnomalyFormData = {
  demandeur: '',
  type: '',
  typeLabel: '',
  reference: '',
  zone: '',
  zoneLabel: '',
  photoBase64: '',
  comment: '',
};

export function useAnomalyForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AnomalyFormData>(INITIAL_FORM);
  const [config, setConfig] = useState<AnomalyConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  useEffect(() => {
    apiClient
      .get<AnomalyConfig>('/config/anomaly')
      .then((res) => setConfig(res.data))
      .catch(() => setConfigError(true))
      .finally(() => setConfigLoading(false));
  }, []);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setSubmitting(true);
    setStep(8); // écran résultat
    try {
      const response = await apiClient.post<ApiResult>('/anomaly', formData);
      const data = response.data;
      setResult(data);
    } catch {
      setResult({
        success: false,
        message: 'Une erreur est survenue. Réessayez ou contactez votre responsable IT.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setFormData(INITIAL_FORM);
    setResult(null);
    setSubmitting(false);
  };

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
