import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';
import { ConsumableConfig, ConsumableFormData, ApiResult } from '../types/app.types';

const INITIAL_FORM: ConsumableFormData = {
  demandeur: '',
  item: '',
  itemLabel: '',
  unit: '',
  quantity: null,
  zone: '',
  comment: '',
};

export function useConsumableForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ConsumableFormData>(INITIAL_FORM);

  const [config, setConfig] = useState<ConsumableConfig | null>(null);
  const [configLoading, setConfigLoading] = useState<boolean>(true);
  const [configError, setConfigError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  useEffect(() => {
    apiClient
      .get<ConsumableConfig>('/config/consumables')
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

  // Le flow est : 1=demandeur, 2=item, 3=quantité, 4=zone, 5=commentaire, 6=récap, 7=résultat
  const submit = useCallback(async () => {
    setSubmitting(true);
    setResult(null);
    setStep(7);

    try {
      const res = await apiClient.post<ApiResult>('/consumable', {
        item: formData.item,
        itemLabel: formData.itemLabel,
        unit: formData.unit,
        quantity: formData.quantity,
        demandeur: formData.demandeur,
        zone: formData.zone || undefined,
        comment: formData.comment || undefined,
      });
      setResult(res.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message =
        error?.response?.data?.message ??
        "La demande n'a pas pu être envoyée. Réessayez dans quelques instants.";
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
