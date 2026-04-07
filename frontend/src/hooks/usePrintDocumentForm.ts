import { useState, useEffect } from 'react';
import { PrintDocumentFormData, PrintingConfig } from '../types/app.types';
import api from '../services/apiClient';

const initialForm: PrintDocumentFormData = {
  demandeur: '',
  documentType: '',
  documentTypeLabel: '',
  reference: '',
  copies: 1,
  zone: '',
  zoneLabel: '',
  comment: '',
};

export type PrintDocumentStep =
  | 'selectType'
  | 'reference'
  | 'copies'
  | 'zone'
  | 'comment'
  | 'summary'
  | 'result';

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function usePrintDocumentForm() {
  const [step, setStep] = useState<PrintDocumentStep>('selectType');
  const [form, setForm] = useState<PrintDocumentFormData>(initialForm);
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

  const update = (fields: Partial<PrintDocumentFormData>) =>
    setForm((prev) => ({ ...prev, ...fields }));

  const next = () => {
    const order: PrintDocumentStep[] = [
      'selectType', 'reference', 'copies', 'zone', 'comment', 'summary', 'result',
    ];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  };

  const back = () => {
    const order: PrintDocumentStep[] = [
      'selectType', 'reference', 'copies', 'zone', 'comment', 'summary', 'result',
    ];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  };

  const goTo = (s: PrintDocumentStep) => setStep(s);

  const submit = async () => {
    setStatus('loading');
    setStep('result');
    try {
      const res = await api.post<{ success: boolean; message: string; jobId?: string }>(
        '/print/document',
        {
          demandeur: form.demandeur,
          documentType: form.documentType,
          documentTypeLabel: form.documentTypeLabel,
          reference: form.reference || undefined,
          copies: form.copies,
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
