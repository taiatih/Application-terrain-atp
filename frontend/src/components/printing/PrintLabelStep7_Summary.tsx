import React from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';
import { PrintLabelFormData } from '../../types/app.types';

interface Props {
  form: PrintLabelFormData;
  onConfirm: () => void;
  onBack: () => void;
}

export default function PrintLabelStep7_Summary({ form, onConfirm, onBack }: Props) {
  const rows: { label: string; value: string; highlight?: boolean }[] = [
    { label: 'Demandeur', value: form.demandeur },
    { label: 'Type d\'étiquette', value: form.labelTypeLabel, highlight: true },
    { label: 'Quantité', value: `${form.quantity} étiquette${(form.quantity ?? 0) > 1 ? 's' : ''}`, highlight: true },
    ...(form.reference ? [{ label: 'Référence', value: form.reference }] : []),
    ...(form.zoneLabel ? [{ label: 'Zone', value: form.zoneLabel }] : []),
    ...(form.comment ? [{ label: 'Commentaire', value: form.comment }] : []),
  ];

  return (
    <StepScreen title="Récapitulatif">
      <div className="flex flex-col gap-3">
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`flex justify-between items-start px-4 py-3 ${i < rows.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <span className="text-gray-500 text-base">{row.label}</span>
              <span className={`text-base font-semibold text-right max-w-[55%] ${row.highlight ? 'text-blue-600' : 'text-gray-800'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 text-center">
          Vérifiez les informations avant d'envoyer.
        </p>
      </div>
      <BottomActions
        onBack={onBack}
        onNext={onConfirm}
        nextLabel="Envoyer"
      />
    </StepScreen>
  );
}
