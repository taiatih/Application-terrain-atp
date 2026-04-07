import React from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  documentTypeLabel: string;
  reference: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  step?: number;
  totalSteps?: number;
}

export default function PrintDocStep3_Reference({ documentTypeLabel, reference, onChange, onNext, onBack, step, totalSteps }: Props) {
  return (
    <StepScreen title="Référence" step={step} totalSteps={totalSteps}>
      <div className="flex flex-col gap-3">
        <p className="text-base text-gray-500 text-center">
          Document : <span className="font-semibold text-gray-700">{documentTypeLabel}</span>
        </p>
        <input
          type="text"
          value={reference}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex : BL-456, CMD-2026-001... (optionnel)"
          className="w-full px-4 py-4 text-xl border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
        />
        <p className="text-sm text-gray-400 text-center">
          Laissez vide si pas de référence spécifique.
        </p>
      </div>
      <BottomActions onBack={onBack} onNext={onNext} nextLabel="Suivant" />
    </StepScreen>
  );
}
