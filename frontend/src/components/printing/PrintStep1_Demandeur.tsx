import React from 'react';
import StepScreen from '../ui/StepScreen';
import BottomActions from '../ui/BottomActions';

interface Props {
  demandeur: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PrintStep1_Demandeur({ demandeur, onChange, onNext, onBack }: Props) {
  return (
    <StepScreen title="Qui fait la demande ?">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={demandeur}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Votre prénom ou nom"
          className="w-full px-4 py-4 text-xl border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          autoFocus
        />
        <p className="text-sm text-gray-400 text-center">
          Permet d'identifier la demande dans le journal d'impression.
        </p>
      </div>
      <BottomActions
        onBack={onBack}
        onNext={onNext}
        nextDisabled={demandeur.trim().length === 0}
      />
    </StepScreen>
  );
}
