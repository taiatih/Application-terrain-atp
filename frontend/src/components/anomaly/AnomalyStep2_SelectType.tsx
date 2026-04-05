import React from 'react';
import { AnomalyConfig } from '../../types/app.types';
import StepScreen from '../ui/StepScreen';
import BigButton from '../ui/BigButton';

interface Props {
  config: AnomalyConfig;
  onSelect: (id: string, label: string) => void;
  onBack: () => void;
}

export default function AnomalyStep2_SelectType({ config, onSelect, onBack }: Props) {
  return (
    <StepScreen title="Type d'anomalie">
      <div className="flex flex-col gap-3 flex-grow">
        {config.types.map((t) => (
          <BigButton key={t.id} onClick={() => onSelect(t.id, t.label)}>{t.label}</BigButton>
        ))}
      </div>
      <div className="pt-2">
        <button
          onClick={onBack}
          className="w-full py-3 text-gray-500 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Retour
        </button>
      </div>
    </StepScreen>
  );
}
