import React from 'react';
import { QuickActionConfig } from '../../types/app.types';
import BigButton from '../ui/BigButton';
import StepScreen from '../ui/StepScreen';

interface Props {
  config: QuickActionConfig;
  onSelect: (id: string, label: string) => void;
  onBack: () => void;
}

export default function Step1_SelectType({ config, onSelect, onBack }: Props) {
  return (
    <StepScreen title="Type d'action">
      {config.types.map((type) => (
        <BigButton key={type.id} onClick={() => onSelect(type.id, type.label)}>
          {type.label}
        </BigButton>
      ))}
      <div className="mt-auto pt-4">
        <button
          onClick={onBack}
          className="w-full py-4 text-lg font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          Accueil
        </button>
      </div>
    </StepScreen>
  );
}
