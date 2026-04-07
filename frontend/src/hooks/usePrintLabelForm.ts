import { useState, useEffect } from 'react';
import { PrintLabelFormData, PrintingConfig } from '../types/app.types';
import api from '../services/apiClient';

const initialForm: PrintLabelFormData = {
  demandeur: '',
  labelType: '',
  labelTypeLabel: '',
  reference: '',
  quantity: null,
  zone: '',
  zoneLabel: '',
  comment: '',
};

export type PrintLabelStep =
  | 'selectType'
  | 'reference'
  | 'quantity'
  | 'zone'
  | 'comment'
  | 'summary'
  | 'result';

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function usePrintLabelForm() {
  const [step, setStep] = useState<PrintLabelStep>('selectType');
  const [form, setForm] = useState<PrintLabelFormData>(initialForm);
  const [config, setConfig] = useState<PrintingConfig | null>(null);
  const [configError, setConfigError] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [resultMessage, setResultMessage] = useState('');
  const [jobId, setJobId] = useState('');

  useEffect(() => {
    api
      .get<PrintingConfig>('/config/printing')
      .then((res) => setConfig(res.data))
      .catch(() => setConfigError(true));
  }, []);

  const update = (fields: Partial<PrintLabelFormData>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const next = () => {
    const order: PrintLabelStep[] = [
      'selectType', 'reference', 'quantity', 'zone', 'comment', 'summary', 'result',
    ];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  };

  const back = () => {
    const order: PrintLabelStep[] = [
      'selectType', 'reference', 'quantity', 'zone', 'comment', 'summary', 'result',
    ];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  };

  const goTo = (s: PrintLabelStep) => setStep(s);

  const submit = async () => {
    setStatus('loading');
    setStep('result');
    try {
      const res = await api.post<{ success: boolean; message: string; jobId?: string }>(
        '/print/label',
        {
          demandeur: form.demandeur,
          labelType: form.labelType,
          labelTypeLabel: form.labelTypeLabel,
          reference: form.reference || undefined,
          quantity: form.quantity,
          zone: form.zone || undefined,
          zoneLabel: form.zoneLabel || undefined,
          comment: form.comment || undefined,
        }
      );
      if (res.data.success) {
        setStatus('success');
        setResultMessage(res.data.message);
        setJobId(res.data.jobId || '');
      } else {
        setStatus('error');
        setResultMessage(res.data.message || 'Une erreur est survenue.');
      }
    } catch {
      setStatus('error');
      setResultMessage('Une erreur est survenue. Réessayez ou contactez votre responsable IT.');
    }
  };

  const reset = () => {
    setForm(initialForm);
    setStep('selectType');
    setStatus('idle');
    setResultMessage('');
    setJobId('');
  };

  return { step, form, config, configError, status, resultMessage, jobId, update, next, back, goTo, submit, reset };
}
