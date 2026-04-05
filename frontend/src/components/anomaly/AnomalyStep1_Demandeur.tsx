import React, { useState } from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  defaultValue: string;
  onNext: (demandeur: string) => void;
  onBack: () => void;
}

export default function AnomalyStep1_Demandeur({ defaultValue, onNext, onBack }: Props) {
  const [value, setValue] = useState(defaultValue);
  const isValid = value.trim().length > 0;

  return (
    <StepScreen title="Qui signale l'anomalie ?">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Votre prénom ou nom"
        autoFocus
        className="w-full p-4 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
      />
      <p className="text-sm text-gray-400 text-center">
        Ce nom sera visible dans la tâche créée.
      </p>
      <BottomActions
        onBack={onBack}
        onNext={() => isValid && onNext(value.trim())}
        nextDisabled={!isValid}
        nextLabel="Suivant"
      />
    </StepScreen>
  );
}
