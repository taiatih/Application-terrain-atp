import React, { useState } from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  typeLabel: string;
  defaultValue: string;
  onNext: (reference: string) => void;
  onBack: () => void;
}

export default function AnomalyStep3_Reference({ typeLabel, defaultValue, onNext, onBack }: Props) {
  const [value, setValue] = useState(defaultValue);

  return (
    <StepScreen title="Référence concernée">
      <p className="text-sm text-gray-500 text-center -mt-2">
        Anomalie : <span className="font-semibold text-gray-700">{typeLabel}</span>
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ex : REF-001, commande #4521..."
        className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
      />
      <p className="text-sm text-gray-400 text-center">
        Optionnel — laissez vide si non applicable.
      </p>
      <BottomActions
        onBack={onBack}
        onNext={() => onNext(value.trim())}
        nextLabel="Suivant"
      />
    </StepScreen>
  );
}
