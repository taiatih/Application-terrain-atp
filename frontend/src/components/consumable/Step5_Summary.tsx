import React from 'react';
import { ConsumableFormData, ConsumableConfig } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  formData: ConsumableFormData;
  config: ConsumableConfig;
  onSubmit: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function Step5_Summary({ formData, config, onSubmit, onBack, step, totalSteps }: Props) {
  const zoneLabel = formData.zone
    ? config.zones.find((z) => z.id === formData.zone)?.label ?? formData.zone
    : null;

  const rows: { label: string; value: string; accent?: boolean }[] = [
    { label: 'Demandeur', value: formData.demandeur },
    { label: 'Consommable', value: formData.itemLabel },
    {
      label: 'Quantité',
      value: `${formData.quantity} ${formData.unit}`,
      accent: true,
    },
    ...(zoneLabel ? [{ label: 'Zone', value: zoneLabel }] : []),
    {
      label: 'Commentaire',
      value: formData.comment?.trim() || 'Aucun commentaire',
    },
  ];

  return (
    <StepScreen title="Récapitulatif" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3 flex-grow">
        {rows.map((row) => (
          <div
            key={row.label}
            className="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              {row.label}
            </p>
            <p
              className={[
                'text-lg font-semibold',
                row.accent ? 'text-blue-700' : 'text-gray-900',
                !formData.comment?.trim() && row.label === 'Commentaire'
                  ? 'italic text-gray-400 font-normal'
                  : '',
              ].join(' ')}
            >
              {row.value}
            </p>
          </div>
        ))}
      </div>

      <BottomActions onBack={onBack} onNext={onSubmit} nextLabel="Envoyer" />
    </StepScreen>
  );
}
