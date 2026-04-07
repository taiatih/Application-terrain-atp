import React from 'react';
import { AnomalyFormData } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  formData: AnomalyFormData;
  onSubmit: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function AnomalyStep7_Summary({ formData, onSubmit, onBack, step, totalSteps }: Props) {
  const rows: { label: string; value: string; accent?: boolean; italic?: boolean }[] = [
    { label: 'Signalé par', value: formData.demandeur },
    { label: "Type d'anomalie", value: formData.typeLabel, accent: true },
    ...(formData.reference ? [{ label: 'Référence', value: formData.reference }] : []),
    ...(formData.zoneLabel ? [{ label: 'Zone', value: formData.zoneLabel }] : []),
    {
      label: 'Photo',
      value: formData.photoBase64 ? 'Jointe' : 'Aucune photo',
      italic: !formData.photoBase64,
    },
    {
      label: 'Commentaire',
      value: formData.comment?.trim() || 'Aucun commentaire',
      italic: !formData.comment?.trim(),
    },
  ];

  return (
    <StepScreen title="Récapitulatif" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3 flex-grow">
        {rows.map((row) => (
          <div key={row.label} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              {row.label}
            </p>
            <p
              className={[
                'text-lg font-semibold',
                row.accent ? 'text-blue-700' : 'text-gray-900',
                row.italic ? 'italic text-gray-400 font-normal' : '',
              ].join(' ')}
            >
              {row.value}
            </p>
          </div>
        ))}

        {/* Aperçu photo miniature si présente */}
        {formData.photoBase64 && (
          <img
            src={formData.photoBase64}
            alt="Photo anomalie"
            className="w-full max-h-40 object-cover rounded-xl border border-gray-200 shadow"
          />
        )}
      </div>

      <BottomActions onBack={onBack} onNext={onSubmit} nextLabel="Envoyer" />
    </StepScreen>
  );
}
